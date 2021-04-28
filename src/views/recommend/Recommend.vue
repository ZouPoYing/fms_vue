<template>
    <div>
        <h1>理财推荐<i @click="toSearch" style="margin-left: 140px" class="el-icon-search"></i></h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基金规模" name="基金规模">基金规模排行</el-tab-pane>
            <el-tab-pane label="收益能力" name="收益能力">收益能力排行</el-tab-pane>
            <el-tab-pane label="抗风险波动" name="抗风险波动">抗风险波动排行</el-tab-pane>
            <el-tab-pane label="投资性价比" name="投资性价比">投资性价比排行</el-tab-pane>
            <ul style="padding: 14px;list-style-type:none;">
                <li v-for="(item, index) in list"  v-bind:key="index" @click="toDetail(item)">
                    <divider></divider>
                    <el-row type="flex" justify="center">
                        <el-col style="position: relative;" :span="2">
                            <span style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">{{index+1}}</span>
                        </el-col>
                        <el-col :span="16">
                            <p>{{item.fundName}}</p>
                            <p>{{item.fundManager}}</p>
                        </el-col>
                        <el-col :span="6">
                            <p style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" v-if="activeName==='基金规模'">{{item.fundMoney}}</p>
                            <p v-else-if="activeName==='收益能力'">{{item.earning}}</p>
                            <p v-else-if="activeName==='抗风险波动'">{{item.antiRisk}}</p>
                            <p v-else>{{item.costPerformance}}</p>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-tabs>
    </div>
</template>

<script>
import axios from "axios";
import Divider from "@/components/common/divider/Divider";

export default {
    name: "Recommend",
  components: {Divider},
  data() {
      return {
        activeName: '基金规模',
        list: []
      }
  },
  created() {

  },
  methods: {
      getFundPH() {
        var self = this
        axios.post('http://localhost:9090/fms/fund/getFundPH', {
          type: self.activeName,
        }).then(function(res){
          self.list = res.data
        }).catch(function(err){
          self.$toast(err);
        })
      },
    handleClick(tab) {
      this.activeName = tab.name
      this.getFundPH()
    },
    toSearch() {
        this.$router.push('/Search')
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