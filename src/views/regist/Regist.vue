<template>
  <div id="regist">
    <h1>注册</h1>
    <el-row type="flex" justify="center">
      <el-col>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
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
          <el-form-item>
            <el-link style="margin: 0px 20px" @click="toLogin" :underline="false">立即登录</el-link>
            <el-link style="margin: 0px 20px" @click="toForget" :underline="false">忘记密码</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
  name: "Regist",
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
          axios.post('http://localhost:9090/fms/user/regist',{
            userName: self.ruleForm.username,
            password: self.ruleForm.password,
            question: self.ruleForm.question,
            answer: self.ruleForm.answer
          }).then(function (res) {
            if (res.data.success) {
              self.$toast('登录成功，即将跳转登录界面');
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
    toForget() {
      this.$router.push('/forget')
    }
  }
}
</script>

<style scoped>

</style>