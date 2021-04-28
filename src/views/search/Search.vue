<template>
    <div>
        <h1>
            <el-input v-model="key" @blur="getFundSS" placeholder="请输入基金名称/编号/公司/经理搜索"></el-input>
        </h1>
        <ul style="padding: 14px;list-style-type:none;">
            <li v-for="(item, index) in list"  v-bind:key="index" @click="toDetail(item)">
                <divider></divider>
                <el-row type="flex" justify="center">
<!--                    <el-col style="position: relative;" :span="2">-->
<!--                        <span style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">{{index+1}}</span>-->
<!--                    </el-col>-->
                    <el-col :span="14">
                        <p>{{item.fundName}}</p>
                        <p>基金编号：{{item.fundId}}</p>
                    </el-col>
                    <el-col :span="10">
                        <p>{{item.fundCompany}}</p>
                        <p>{{item.fundManager}}</p>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>

<script>
  import axios from "axios";
  import Divider from "@/components/common/divider/Divider";

  export default {
    name: "Search",
    components: {Divider},
    data() {
      return {
        key: '',
        list: []
      }
    },
    methods: {
      getFundSS() {
        var self = this
        axios.post('http://localhost:9090/fms/fund/getFundSS', {
          key: self.key,
        }).then(function(res){
          self.list = res.data
        }).catch(function(err){
          self.$toast(err);
        })
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