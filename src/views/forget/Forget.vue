<template>
  <div id="forget">
    <h1>忘记密码</h1>
    <el-row type="flex" justify="center">
      <el-col>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密保问题" prop="question">
            <el-select v-model="ruleForm.question" placeholder="请选择">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密保答案" prop="answer">
            <el-input type="text" v-model="ruleForm.answer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" prop="repassword">
            <el-input type="password" v-model="ruleForm.repassword" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-link style="margin: 0px 20px" @click="toLogin" :underline="false">立即登录</el-link>
            <el-link style="margin: 0px 20px" @click="toRegist" :underline="false">注册账号</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">重置密码</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Forget",
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
        if (this.ruleForm.repassword !== '') {
          this.$refs.ruleForm.validateField('repassword');
        }
        callback()
      }
    }
    var validateRepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback()
      }
    }
    var validateQuestion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择密保问题'))
      } else {
        callback()
      }
    }
    var validateAnswer = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密保答案'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        repassword: '',
        question: '你父亲的姓名是？',
        answer: ''
      },
      options: [{
        value: '你父亲的姓名是？',
        label: '你父亲的姓名是？'
      }, {
        value: '你所在的学校是？',
        label: '你所在的学校是？'
      }, {
        value: '你的梦想是？',
        label: '你的梦想是？'
      }],
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        repassword: [
          { validator: validateRepassword, trigger: 'blur' }
        ],
        question: [
          { validator: validateQuestion, trigger: 'blur' }
        ],
        answer: [
          { validator: validateAnswer, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      var self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:9090/fms/user/forget',{
            userName: self.ruleForm.username,
            password: self.ruleForm.password,
            question: self.ruleForm.question,
            answer: self.ruleForm.answer
          }).then(function (res) {
            if (res.data.success) {
              self.$toast('重置密码成功，即将跳转登录界面');
              setTimeout(() => {
                self.$router.push('/login')
              }, 1000)
            } else {
              self.$toast(res.data.msg);
            }
          }).catch(function(err){
            self.$toast(err);
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toLogin() {
      this.$router.push('/login')
    },
    toRegist() {
      this.$router.push('/regist')
    }
  }
}
</script>

<style scoped>

</style>