<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="银行卡" name="银行卡"></el-tab-pane>
            <el-tab-pane label="支付宝" name="支付宝"></el-tab-pane>
            <el-tab-pane label="微信" name="微信"></el-tab-pane>
            <el-tab-pane label="全部" name="全部"></el-tab-pane>
            <el-row type="flex" justify="center">
                <el-col>
                    {{list.date}}月收入
                    <el-row>
                        <el-col>
                            <h1>￥{{list.sr}}</h1>
                        </el-col>
                    </el-row>
                    {{list.date}}月支出
                    <el-row>
                        <el-col>
                            <h1>￥{{list.zc}}</h1>
                        </el-col>
                    </el-row>
                    预算
                    <el-row>
                        <el-col>
                            <h1>￥{{ys}}</h1>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col @click.native="chart">
                    <el-button style="margin:0 20px 0 80px" type="success" icon="el-icon-pie-chart" circle>
                    </el-button>查看图表分析
                </el-col>
            </el-row>
        </el-tabs>
        <el-row type="flex" justify="center">
            <el-col>
                <el-dialog
                        :visible.sync="dialogVisible"
                        width="80%">
                    <el-form label-width="50px" class="demo-ruleForm">
                        <el-form-item label="收支" prop="type">
                            <el-radio-group v-model="type" @change="changeSZ" size="small">
                                <el-radio label="收入" border>收入</el-radio>
                                <el-radio label="支出" border>支出</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="类型" prop="toFor">
                            <el-select v-model="toFor" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="金额" prop="money">
                            <el-input maxlength="21" type="text" v-model="money"></el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="day">
                            <el-date-picker
                                    v-model="day"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="success" @click="addMoneyDetail">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
        <el-button v-if="isNotQB" style="position: fixed;bottom: 100px;right: 50px; z-index: 100;" @click="dialogVisible = true" type="success">记账</el-button>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Statistics",
  data() {
      return {
        ys: this.$store.state.ys,
        list: [],
        activeName: '银行卡',
        isSow: false,
        dialogVisible: false,
        isNotQB: true,
        type: '收入',
        toFor: '',
        day: '',
        money: '',
        moneyId: '',
        options: [
          {value: '薪资',label: '薪资'},
          {value: '奖金',label: '奖金'},
          {value: '借入',label: '借入'},
          {value: '收账',label: '收账'},
          {value: '利息收入',label: '利息收入'},
          {value: '投资回报',label: '投资回报'},
          {value: '二手交易',label: '二手交易'},
          {value: '意外所得',label: '意外所得'},
          {value: '其他收入',label: '其他收入'}
          ]
      }
  },
  created() {
    this.getStatistics();
  },
  methods: {
    getStatistics() {
      var self = this
      axios.post('http://localhost:9090/fms/money-detail/getStatistics', {
        type: self.activeName,
        userId: self.$store.state.user.userId,
        month: ''
      }).then(function(res){
        if (res.data.success) {
          self.list = res.data
          self.moneyId = res.data.moneyId
        } else {
          self.$toast(res.data.msg);
        }
      }).catch(function(err){
        self.$toast(err);
      })
    },
    handleClick(tab) {
      if (tab.name === '全部') {
        this.isNotQB = false
      } else {
        this.isNotQB = true
      }
      this.activeName = tab.name
      this.getStatistics()
    },
    addMoneyDetail() {
      var self = this
      if (self.type==='支出' && self.ys>=self.money) {
        self.ys -= self.money
        self.$store.commit('setYs',self.ys)
      }
      if (self.type==='支出' && self.ys<self.money) {
        self.$toast('预算不足');
        return
      }
      axios.post('http://localhost:9090/fms/money-detail/addMoneyDetail', {
        moneyType: self.activeName,
        userId: self.$store.state.user.userId,
        type: self.type,
        toFor: self.toFor,
        day: self.day,
        money: self.money
      }).then(function(res){
        if (res.data.success) {
          self.$toast('记账成功');
          self.getStatistics();
        } else {
          self.$toast(res.data.msg);
        }
      }).catch(function(err){
        self.$toast(err);
      })
      self.dialogVisible = false
    },
    chart() {
      this.$router.push({
        name: 'StatisticsDetail',
        params: {
          activeName: this.activeName
        }
      })
    },
    changeSZ() {
      if (this.type === '收入') {
        this.options = [
          {value: '薪资',label: '薪资'},
          {value: '奖金',label: '奖金'},
          {value: '借入',label: '借入'},
          {value: '收账',label: '收账'},
          {value: '利息收入',label: '利息收入'},
          {value: '投资回报',label: '投资回报'},
          {value: '二手交易',label: '二手交易'},
          {value: '意外所得',label: '意外所得'},
          {value: '其他收入',label: '其他收入'}
        ]
      } else {
        this.options = [
          {value: '餐饮',label: '餐饮'},
          {value: '出行',label: '出行'},
          {value: '购物',label: '购物'},
          {value: '服饰',label: '服饰'},
          {value: '日用品',label: '日用品'},
          {value: '娱乐',label: '娱乐'},
          {value: '零食',label: '零食'},
          {value: '烟酒茶',label: '烟酒茶'},
          {value: '学习',label: '学习'},
          {value: '医疗',label: '医疗'},
          {value: '住宅',label: '住宅'},
          {value: '水电煤',label: '水电煤'},
          {value: '通讯',label: '通讯'},
          {value: '人情往来',label: '人情往来'},
          {value: '其他支出',label: '其他支出'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>