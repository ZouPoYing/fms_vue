<template>
  <div id="my">
      <div v-if="userId">
          <el-row class="user" style="padding: 50px 10px 10px 10px;"
                  type="flex" justify="center" align="middle">
              <el-col>
                  <el-avatar class="head-pic"> {{userName}} </el-avatar>
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
                          <el-collapse style="margin-top: 20px" v-model="activeNames" @change="handleChange">
                              <el-collapse-item title="我的资金" name="1">
                                  <div>银行卡</div>
                                  <div>支付宝</div>
                                  <div>微信</div>
                                  <div>基金</div>
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
      userName: ''
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
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
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
    }
  }
}
</script>

<style scoped>

</style>