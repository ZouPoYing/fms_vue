<template>
    <div id="Setting">
        <h1>个人中心</h1>
        <el-row type="flex" justify="center">
            <el-col>
                <el-form label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input maxlength="10" :disabled="disabled" type="text" v-model="userName"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input maxlength="10" :disabled="disabled" type="text" v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input maxlength="16" minlength="4" :disabled="disabled" type="password" v-model="password"
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="telephone">
                        <el-input maxlength="11" :disabled="disabled" type="text" v-model="telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input maxlength="16" :disabled="disabled" type="text" v-model="email"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型" prop="userType">
                        <el-input :disabled="true" type="text" v-model="userType"></el-input>
                    </el-form-item>
                    <el-form-item label="密保问题" prop="question">
                        <el-input :disabled="true" type="text" v-model="question"></el-input>
                    </el-form-item>
                    <el-form-item label="密保答案" prop="answer">
                        <el-input :disabled="disabled" type="text" v-model="answer"></el-input>
                    </el-form-item>
                    <el-form-item label="注册时间" prop="creatTime">
                        <el-input :disabled="true" type="text" v-model="createTime" pattern="yyyy-MM-dd HH:mm:ss"></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间" prop="updateTime">
                        <el-input :disabled="true" type="text" v-model="updateTime"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUser">修改</el-button>
                        <el-button type="danger" @click="LogOut">退出登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios"

export default {
  name: "Setting",
  data() {
    return {
      disabled: true,
      userName: '',
      name: '',
      password: '',
      telephone: '',
      email: '',
      userType: '',
      question: '',
      answer: '',
      createTime: '',
      updateTime: ''
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      var self = this;
      axios.post('http://localhost:9090/fms/user/getUserById', {
        userId: self.$store.state.user.userId
      }).then(function(res){
        if (res.data.success) {
          self.userName = res.data.userName;
          self.name = res.data.name;
          self.password = res.data.password;
          self.telephone = res.data.telephone;
          self.email = res.data.email;
          self.userType = res.data.userType;
          self.question = res.data.question;
          self.answer = res.data.answer;
          self.createTime = res.data.createTime;
          self.updateTime = res.data.updateTime;
        } else {
          self.$message.error(res.data.msg);
        }
      }).catch(function(err){
        self.$message.error(err);
      })
    },
    updateUser() {
      this.disabled = !this.disabled;
      if (!this.disabled) {
        return
      }
      var self = this
      axios.post('http://localhost:9090/fms/user/updateUser', {
        userId: self.$store.state.user.userId,
        userName: self.userName,
        name: self.name,
        password: self.password,
        telephone: self.telephone,
        email: self.email,
        answer: self.answer,
      }).then(function(res){
        if (res.data.success) {
          self.$message.success('修改成功');
          self.userName = res.data.userName;
          self.name = res.data.name;
          self.password = res.data.password;
          self.telephone = res.data.telephone;
          self.email = res.data.email;
          self.answer = res.data.answer;
          self.getUser();
        } else {
          self.$message.error(res.data.msg);
        }
      }).catch(function(err){
        self.$message.error(err);
      })
    },
    LogOut() {
      this.$store.commit('clearUserCache');
      this.$message.success('注销成功，即将跳转登录页');
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>