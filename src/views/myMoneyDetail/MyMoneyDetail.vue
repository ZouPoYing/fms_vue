<template>
    <div id="myMoneyDetail">
        <h1>我的{{moneyType}}</h1>
        <el-row type="flex" justify="center" align="middle" style="padding: 20px">
            <el-col>
                <span v-if="isShow" style="margin-left: 50px">金额：￥{{money}}</span>
                <span v-else style="margin-left: 50px">金额：￥*****</span>
                <i @click="changeShow" style="margin-left: 20px" class="el-icon-view"></i>
            </el-col>
        </el-row>
        <el-row v-if="isNotJJ" type="flex">
            <ul style="padding: 14px;list-style-type:none;">
                <li style="padding: 18px 0 18px 0">
                    注：只能绑定一次，绑定即为签署{{moneyType}}自由转账协议
                    <divider></divider>
                    <el-button @click="addMoney('add')" type="success">绑定{{moneyType}}</el-button>
                </li>
                <li v-if="isNotYHK" style="padding: 18px 0 18px 0">
                    注：把银行卡的钱充值到{{moneyType}}
                    <divider></divider>
                    <el-button @click="addMoney('recharge')" type="success">充值</el-button>
                </li>
                <li v-if="isNotYHK" style="padding: 18px 0 15px 0">
                    注：把{{moneyType}}的钱提现到银行卡
                    <divider></divider>
                    <el-button @click="addMoney('withdraw')" type="success">提现</el-button>
                </li>
            </ul>
        </el-row>
        <el-row v-else type="flex">
            <el-col>
                <el-button @click="toRecommend" type="success">去理财推荐页面选购基金</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-dialog
                        :visible.sync="dialogVisible"
                        width="80%">
                    <el-form label-width="50px" class="demo-ruleForm">
                        <el-form-item label="金额" prop="addmoney">
                            <el-input maxlength="21" type="text" v-model="addmoney"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="success" @click="add">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import Divider from "@/components/common/divider/Divider";

export default {
    name: "MyMoneyDetail",
  components: {Divider},
  data() {
      return {
        moneyType: this.$route.query.moneyType,
        money: '0',
        moneyId: '',
        isShow: true,
        isNotJJ: true,
        isNotYHK: true,
        dialogVisible: false,
        addmoney: '',
        type: 'add'
      }
  },
  created() {
    this.getMyMoneyDetail();
    this.changeIsNotJJ();
    this.changeIsNotYHK();
  },
  methods: {
    getMyMoneyDetail() {
      var self = this;
      axios.post('http://localhost:9090/fms/money/getMyMoneyDetail', {
        userId: self.$store.state.user.userId,
        moneyType: self.moneyType
      }).then(function (res) {
        if (res.data.success) {
          self.money = res.data.money;
          self.moneyId = res.data.moneyId;
        } else {
          self.$toast(res.data.msg);
        }
      }).catch(function (err) {
        self.$toast(err);
      })
    },
    changeShow() {
      this.isShow = !this.isShow
    },
    changeIsNotJJ() {
      if (this.moneyType === '基金') {
        this.isNotJJ = false
      } else {
        this.isNotJJ = true
      }
    },
    changeIsNotYHK() {
      if (this.moneyType === '银行卡') {
        this.isNotYHK = false
      } else {
        this.isNotYHK = true
      }
    },
    addMoney(val) {
      this.dialogVisible = !this.dialogVisible
      this.type = val
    },
    add() {
      var self = this;
      axios.post('http://localhost:9090/fms/money/addMyMoneyDetail', {
        userId: self.$store.state.user.userId,
        moneyId: self.moneyId,
        moneyType: self.moneyType,
        type: self.type,
        addmoney: self.addmoney
      }).then(function (res) {
        if (res.data.success) {
          self.getMyMoneyDetail();
          self.$toast('操作成功');
          self.dialogVisible = !self.dialogVisible
        } else {
          self.$toast(res.data.msg);
          self.dialogVisible = !self.dialogVisible
        }
      }).catch(function (err) {
        self.$toast(err);
        self.dialogVisible = !self.dialogVisible
      })
    },
    toRecommend() {
      this.$router.push('/recommend')
    }
  }
}
</script>

<style scoped>

</style>