<template>
  <div id="my">
      <div v-if="userId">
          <el-row class="user" style="padding: 50px 10px 10px 10px;"
                  type="flex" justify="center" align="middle">
              <el-col>
                  <el-avatar class="head-pic"> {{userName}} </el-avatar>
                  <span v-if="isShow" style="margin-left: 50px">总资产：￥{{money}}</span>
                  <span v-else style="margin-left: 50px">总资产：￥*****</span>
                  <i @click="changeShow" style="margin-left: 20px" class="el-icon-view"></i>
              </el-col>
          </el-row>
          <el-row>
              <el-col>
                  <el-divider></el-divider>
                  <el-row>
                      <el-col>
                          <span @click="toSetting">个人中心</span>
                      </el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row>
                      <el-col>
                          <span @click="toMemorandum">备忘录</span>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col>
                          <el-collapse style="margin-top: 20px">
                              <el-collapse-item title="我的资金" name="1">
                                  <div v-if="isShow" @click="toMyMoneyDetail('银行卡')">银行卡 ￥{{yhk}}</div>
                                  <div v-else @click="toMyMoneyDetail('银行卡')">银行卡 ￥*****</div>
                                  <div v-if="isShow" @click="toMyMoneyDetail('支付宝')">支付宝 ￥{{zfb}}</div>
                                  <div v-else @click="toMyMoneyDetail('支付宝')">支付宝 ￥*****</div>
                                  <div v-if="isShow" @click="toMyMoneyDetail('微信')">微信 ￥{{wx}}</div>
                                  <div v-else @click="toMyMoneyDetail('微信')">微信 ￥*****</div>
                                  <div v-if="isShow" @click="toMyMoneyDetail('基金')">基金 ￥{{jj}}</div>
                                  <div v-else @click="toMyMoneyDetail('基金')">基金 ￥*****</div>
                              </el-collapse-item>
                          </el-collapse>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
      </div>
      <div v-else>
          <el-row class="login" type="flex" justify="center" align="middle">
              <el-button @click="toLogin">请登录</el-button>
          </el-row>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "My",
  data () {
    return {
      userId: this.$store.state.user.userId,
      userName: '',
      isShow: true,
      money: 0,
      yhk: 0,
      zfb: 0,
      wx: 0,
      jj: 0
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      var self = this;
      if (self.$store.state.user.userId !== '') {
        axios.post('http://localhost:9090/fms/user/getUserById', {
          userId: self.userId
        }).then(function(res){
          if (res.data.success) {
            self.userName = res.data.userName;
            self.getMyMoney();
          } else {
            self.$toast(res.data.msg);
          }
        }).catch(function(err){
          self.$toast(err);
        })
      }
    },
    getMyMoney() {
      var self = this;
      if (self.$store.state.user.userId !== '') {
        axios.post('http://localhost:9090/fms/money/getMyMoney', {
          userId: self.userId
        }).then(function(res){
          if (res.data.success) {
            self.money = res.data.money;
            self.yhk = res.data.yhk;
            self.zfb = res.data.zfb;
            self.wx = res.data.wx;
            self.jj = res.data.jj;
          } else {
            self.$toast(res.data.msg);
          }
        }).catch(function(err){
          self.$toast(err);
        })
      }
    },
    toLogin() {
      this.$router.push('/login')
    },
    toSetting() {
      this.$router.push('/setting')
    },
    toMemorandum() {
      this.$router.push('/memorandum')
    },
    toMyMoneyDetail(val) {
      this.$router.push({
        path: '/myMoneyDetail',
        query: {
          moneyType: val
        }
      })
    },
    changeShow() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped>

</style>