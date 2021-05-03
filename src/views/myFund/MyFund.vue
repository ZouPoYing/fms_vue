<template>
  <div id="myFund">
    <h1>我的基金</h1>
      <div v-if="notHasJJ">
          <p>你还没有购买基金，赶快去去理财推荐页面选购基金吧</p>
          <el-button @click.native="toRecommend" type="success">理财推荐</el-button>
      </div>
      <el-row v-else type="flex" justify="center">
          <el-col>
              <el-row>
                  <el-col>
                      <p style="text-align: center">基金总金额</p>
                      <p style="text-align: center">￥{{CMoney}}</p>
                  </el-col>
              </el-row>
              <ul style="padding: 14px;list-style-type:none;">
                  <li v-for="(item, index) in list"  v-bind:key="index" @click="toDetail(item)">
                      <el-card :body-style="{ padding: '10px' }">
                          <el-row type="flex" justify="center">
                              <el-col style="position: relative;" :span="2">
                                  <span style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">{{index+1}}</span>
                              </el-col>
                              <el-col :span="14">
                                  <p style="font-size: 15px;margin: 5px 0 5px 0">{{item.fundName}}</p>
                                  <p style="font-size: 10px;margin: 5px 0 5px 0">基金编号：{{item.fundId}}</p>
                              </el-col>
                              <el-col :span="10">
                                  <p>￥{{item.money}}</p>
                              </el-col>
                          </el-row>
                      </el-card>
                  </li>
              </ul>
          </el-col>
      </el-row>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "MyFund",
    data() {
      return {
        list: [],
        notHasJJ: true,
        CMoney: 0
      }
    },
    created() {
      this.getMyJJ();
    },
    methods: {
      getMyJJ() {
        var self = this
        axios.post('http://localhost:9090/fms/money/getMyJJ', {
          userId: self.$store.state.user.userId
        }).then(function(res){
          if (res.data.length===0) {
            self.notHasJJ = true
          } else {
            self.notHasJJ = false
            self.list = res.data
            self.getCMoney()
          }
        }).catch(function(err){
          self.$toast(err);
        })
      },
      getCMoney() {
        var self = this
        self.CMoney = 0
        self.list.forEach(function(item) {
          self.CMoney += Number(item.money)
        })
      },
      toRecommend() {
        this.$router.push('/recommend')
      },
      toDetail(item) {
        this.$router.push({
          path: '/Detail',
          query: {
            fundId: item.fundId
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>