<template>
  <div id="bottom_bar">
    <el-row type="flex" justify="space-around" >
      <el-col :span="6" v-for="(item,index) in list" :key="index" @click.native="act(index,item)">
        <el-row class="text">
          <img :src="require('../../../assets/img/bottomBar/'+item.src+'.png')" alt="">
        </el-row>
        <el-row class="text">
          <span>{{item.text}}</span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  props: {
  },
  data() {
    return {
      list: [
        {src : 'user',router : 'recommend',text : '理财推荐'},
        {src : 'user',router : 'statistics',text : '收益统计'},
        {src : 'user',router : 'view3',text : '收支管理'},
        {src : 'user',router : 'my',text : '我的'}
      ]
    }
  },
  computed: {

  },
  mounted() {
    this.initList();
  },
  methods: {
    act(index,item) {
      this.reList();
      this.list[index].src = this.list[index].src + '_a';
      this.$router.push(item.router);
    },
    reList() {
      var self = this;
      for(var i = 0; i <self.list.length; i++){
        self.list[i].src = self.list[i].src.replace('_a','');
      }
    },
    initList() {
      this.list[0].src = this.list[0].src + '_a';
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
img {
  width: 30px;
}
.text {
  text-align: center;
}
</style>