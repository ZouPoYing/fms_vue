<template>
    <div>
        <h1>基金详情</h1>
        <el-card :body-style="{ padding: '10px' }">
            <el-row>
                <el-col>
                    <p style="font-size: 20px;margin: 5px 0 5px 0">{{fund.fundName}}</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0;width: 20%">{{fund.fundId}} {{fund.fundRiskLevel}}</p>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="16">
                    <p style="font-size: 20px;margin: 5px 0 5px 0;color: red">{{fund.allZD}}</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">成立以来涨跌幅度</p>
                </el-col>
                <el-col :span="8">
                    <p style="font-size: 20px;margin: 5px 0 5px 0;color: red">{{fund.ZD}}</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">最近日涨跌幅度</p>
                </el-col>
            </el-row>
        </el-card>
        <!-- 图表 -->
        <divider></divider>
        <span style="margin: 120px">业绩走势</span>
        <div id="myChart" :style="{width:'100%',height:'300px'}"></div>
        <el-card :body-style="{ padding: '10px' }">
            <el-row>
                <el-col>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">基金分析指标</p>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">收益能力</p>
                    <p style="font-size: 20px;margin: 5px 0 5px 0;color: red">{{fund.earning}}</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">击败基准比率</p>
                </el-col>
                <el-col :span="8">
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">坑风险波动</p>
                    <p style="font-size: 20px;margin: 5px 0 5px 0;color: red">{{fund.antiRisk}}</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">波动率</p>
                </el-col>
                <el-col :span="8">
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">投资性价比</p>
                    <p style="font-size: 20px;margin: 5px 0 5px 0;color: red">{{fund.costPerformance}}</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">夏普比率</p>
                </el-col>
            </el-row>
        </el-card>
        <el-card :body-style="{ padding: '10px' }">
            <el-row>
                <el-col>
                    <p style="font-size: 15px;margin: 5px 0 5px 0">基金档案</p>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">基金规模</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">{{fund.newFundMoney}}</p>
                </el-col>
                <el-col :span="12">
                    <p style="font-size: 10px;margin: 5px 0 5px 0;">成立时间</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">{{fund.createTime}}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <p style="font-size: 15px;margin: 5px 0 5px 0">基金经理</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">{{fund.fundManager}}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <p style="font-size: 15px;margin: 5px 0 5px 0">基金公司</p>
                    <p style="font-size: 10px;margin: 5px 0 5px 0">{{fund.fundCompany}}</p>
                </el-col>
            </el-row>
        </el-card>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-button style="margin:10px 0 10px 30px" @click="sell" type="success">卖出</el-button>
            </el-col>
            <el-col :span="12">
                <el-button style="margin:10px 0 10px 30px" @click="buy" type="success">买入</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-dialog
                        :title="title"
                        :visible.sync="dialogVisible"
                        width="80%">
                    <el-form label-width="50px" class="demo-ruleForm">
                        <el-form-item label="金额" prop="money">
                            <el-input maxlength="21" type="text" v-model="money"></el-input>
                        </el-form-item>
                        <el-form-item label="方式" prop="type">
                            <el-select v-model="type" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="success" @click="sellOrBuy">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import * as echarts from "echarts";

  import axios from "axios";
  import Divider from "@/components/common/divider/Divider";

  export default {
    name: "Detail",
    components: {Divider},
    data() {
      return {
        fundId: this.$route.query.fundId,
        fund: [],
        dataZD: [],
        dataX: [],
        dataY: [],
        dialogVisible: false,
        title: '买入',
        money: '',
        type: '银行卡',
        options: [
          {value: '银行卡',label: '银行卡'},
          {value: '支付宝',label: '支付宝'},
          {value: '微信',label: '微信'}
          ]
      }
    },
    created() {
        this.getFundByFundId();
        this.getFundLineByFundId();
    },
    methods: {
      sell() {
        this.title = '卖出'
        this.dialogVisible = true
      },
      buy() {
        this.title = '买入'
        this.dialogVisible = true
      },
      sellOrBuy() {
        var self = this
        axios.post('http://localhost:9090/fms/fund/sellOrBuy', {
          fundId: self.$route.query.fundId,
          userId: self.$store.state.user.userId,
          title: self.title,
          type: self.type,
          money: self.money
        }).then(function(res){
          if (res.data.success) {
            self.$toast('操作成功');
          } else {
            self.$toast(res.data.msg);
          }
        }).catch(function(err){
          self.$toast(err);
        })
        this.dialogVisible = false
      },
      getFundByFundId() {
        var self = this
        axios.post('http://localhost:9090/fms/fund/getFundByFundId', {
          fundId: self.$route.query.fundId,
        }).then(function(res){
          if (res.data.success) {
            self.fund = res.data
          } else {
            self.$toast(res.data.msg);
          }
        }).catch(function(err){
          self.$toast(err);
        })
      },
      getFundLineByFundId() {
        var self = this
        axios.post('http://localhost:9090/fms/fund/getFundLineByFundId', {
          fundId: self.$route.query.fundId,
        }).then(function(res){
          self.dataZD = res.data
          self.initChartDate()
        }).catch(function(err){
          self.$toast(err);
        })
      },
      initChartDate() {
        var self = this
        self.dataX = []
        self.dataY = []
        self.dataZD.forEach(function(item) {
          self.dataX.push(item.date)
          self.dataY.push(item.aZD)
        })
        self.initChart();
      },
      initChart() {
        var myChart = echarts.init(document.getElementById('myChart'));
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.dataX
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.dataY,
            type: 'line' //pie饼 line线
          }]
        })
      }
    }
  }
</script>

<style scoped>

</style>