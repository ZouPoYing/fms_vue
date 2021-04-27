<template>
  <div id="login">
    <h1>登录</h1>
    <el-row type="flex" justify="center">
      <el-col>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input maxlength="10" type="text" v-model="ruleForm.username" placeholder="请输入1-10位字符或数字"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input minlength="4" maxlength="16" type="password" v-model="ruleForm.password"
                      placeholder="请输入4-16位字符或数字" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-link style="margin: 0px 20px" @click="toRegist" :underline="false">立即注册</el-link>
            <el-link style="margin: 0px 20px" @click="toForget" :underline="false">忘记密码</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"

  export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(formName);
      var self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:9090/fms/user/login',{
            userName: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(function (res) {
            if (res.data.success) {
              self.$store.commit('getUserId',res.data.userId);
              self.$message.success('登录成功，即将跳转首页');
              setTimeout(() => {
                self.$router.push('/my')
              }, 1000)
            } else {
              self.$message.error(res.data.msg);
            }
          }).catch(function(err){
            self.$message.error(err);
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toRegist() {
      this.$router.push('/regist')
    },
    toForget() {
      this.$router.push('/forget')
    }
  }
}
</script>

<style scoped>

</style>