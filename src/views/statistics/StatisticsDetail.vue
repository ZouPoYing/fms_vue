<template>
    <div id="statisticsDetail">
        <h1>{{activeName}}账单详情</h1>
        <h3>{{list.date}}月账单</h3>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col>
                        共{{list.srnum}}笔收入，￥{{list.sr}}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        共{{list.zcnum}}笔支出，￥{{list.zc}}
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="10">
                <div class="block">
                    <el-date-picker style="width: 150px" @blur="changeMonth"
                            v-model="selectMonth"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-tabs v-model="activeNameSZ" @tab-click="handleClick">
            <el-tab-pane label="支出" name="支出"></el-tab-pane>
            <el-tab-pane label="收入" name="收入"></el-tab-pane>
            <!-- 图表 -->
            <div id="myChart" :style="{width:'100%',height:'300px'}"></div>
            <span style="margin-left: 120px">收支柱状图</span>
            <div id="pieChart" :style="{width:'100%',height:'300px'}"></div>
            <span style="margin-left: 120px">收支饼状图</span>
            <divider></divider>
            <span style="margin-left: 120px">收支详情</span>
            <ul style="padding: 14px;list-style-type:none;">
                <li v-for="(item, index) in MDList"  v-bind:key="index">
                    <divider></divider>
                    <el-row type="flex" justify="center">
                        <el-col style="position: relative;" :span="2">
                            <span style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">{{index+1}}</span>
                        </el-col>
                        <el-col :span="16">
                            <p>{{item.toFor}}</p>
                            <p style="font-size: 5px">{{item.date}}</p>
                        </el-col>
                        <el-col :span="6">
                            <p>￥{{item.money}}</p>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-tabs>
    </div>
</template>

<script>
  import * as echarts from "echarts";

  import Divider from "@/components/common/divider/Divider";

  import axios from "axios";

  export default {
    name: "StatisticsDetail",
    components: {Divider},
    data() {
      return {
        activeName: this.$route.params.activeName,
        activeNameSZ: '支出',
        list: [],
        MDList: [],
        month: '',
        moneyId: '',
        chartZ: [],
        chartB: [],
        dataX: [],
        dataY: [],
        selectMonth: ''
      }
    },
    created() {
      this.getStatistics();
    },
    methods: {
      getStatistics() {
        var self = this
        axios.post('http://localhost:9090/fms/money-detail/getStatistics', {
          type: self.activeName,
          userId: self.$store.state.user.userId,
          month: self.selectMonth
        }).then(function(res){
          if (res.data.success) {
            self.list = res.data
            self.moneyId = res.data.moneyId
            self.month = res.data.date
            self.getStatisticsDetail();
            self.getStatisticsDetailPie();
            self.getMoneyDetail();
          } else {
            self.$toast(res.data.msg);
          }
        }).catch(function(err){
          self.$toast(err);
        })
      },
      getMoneyDetail() {
        var self = this
        axios.post('http://localhost:9090/fms/money-detail/getMoneyDetail', {
          type: self.activeNameSZ,
          isQB: self.activeName,
          userId: self.$store.state.user.userId,
          month: self.month,
          moneyId: self.moneyId
        }).then(function(res){
          self.MDList = res.data
        }).catch(function(err){
          self.$toast(err);
        })
      },
      getStatisticsDetail() {
        var self = this
        axios.post('http://localhost:9090/fms/money-detail/getStatisticsDetail', {
          type: self.activeNameSZ,
          isQB: self.activeName,
          userId: self.$store.state.user.userId,
          month: self.month,
          moneyId: self.moneyId
        }).then(function(res){
          self.chartZ = res.data
          self.initChartDate()
        }).catch(function(err){
          self.$toast(err);
        })
      },
      getStatisticsDetailPie() {
        var self = this
        axios.post('http://localhost:9090/fms/money-detail/getStatisticsDetailPie', {
          type: self.activeNameSZ,
          isQB: self.activeName,
          userId: self.$store.state.user.userId,
          month: self.month,
          moneyId: self.moneyId
        }).then(function(res){
          self.chartB = res.data
          self.initChartPie()
        }).catch(function(err){
          self.$toast(err);
        })
      },
      handleClick(tab) {
        this.activeNameSZ = tab.name
        this.getStatisticsDetail();
        this.getStatisticsDetailPie();
        this.getMoneyDetail();
      },
      initChartDate() {
        var self = this
        self.dataX = []
        self.dataY = []
        self.chartZ.forEach(function(item) {
          self.dataX.push(item.date)
          self.dataY.push(item.money)
        })
        self.initChart();
      },
      initChart() {
        var myChart = echarts.init(document.getElementById('myChart'));
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.dataX
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'收支柱图',
            data: this.dataY,
            type: 'bar' //pie饼 line线
          }]
        })
      },
      initChartPie() {
        var self = this
        var pieChart = echarts.init(document.getElementById('pieChart'));
        pieChart.setOption({
          series: [{
            name:'收支饼图',
            data: self.chartB,
            type: 'pie', //饼 line线
            radius : '55%',
            center: ['50%', '60%'],
            itemStyle: {
              normal: {
                label:{
                  show: true,
                  formatter: '{b}:{c}({d}%)'
                },
                labelLine :{show:true}
              }
            }
          }]
        })
      },
      changeMonth() {
        this.getStatistics()
        this.month = this.selectMonth
      }
    }
  }
</script>

<style scoped>

</style>