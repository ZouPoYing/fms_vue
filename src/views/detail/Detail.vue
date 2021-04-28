<template>
    <div>
        <h1>基金详情</h1>
        <el-card :body-style="{ padding: '0px' }">
            <ul style="padding: 14px;list-style-type:none;">
                <li>基金名字：{{fund.fundName}}</li>
                <li>基金公司：{{fund.fundCompany}}</li>
                <li>基金经理：{{fund.fundManager}}</li>
                <li>基金规模：{{fund.fundMoney}}</li>
                <li>风险程度：{{fund.fundRiskLevel}}</li>
                <li>收益能力：{{fund.earning}}</li>
                <li>抗风险波动：{{fund.antiRisk}}</li>
                <li>投资性价比：{{fund.costPerformance}}</li>
                <li>成立时间：{{fund.createTime}}</li>
                <div class="bottom clearfix">
                    <el-button @click="edit(fund)" type="text" class="button">买入</el-button>
                </div>
            </ul>
        </el-card>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Detail",
    data() {
      return {
        fundId: this.$route.query.fundId,
        fund: []
      }
    },
    created() {
        this.getFundByFundId();
    },
    methods: {
      getFundByFundId() {
        var self = this
        axios.post('http://localhost:9090/fms/fund/getFundByFundId', {
          fundId: self.$route.query.fundId,
        }).then(function(res){
          if (res.data.success) {
            self.fund = res.data
          } else {
            self.$toast(res.data.msg);
          }
        }).catch(function(err){
          self.$toast(err);
        })
      }
    }
  }
</script>

<style scoped>

</style>