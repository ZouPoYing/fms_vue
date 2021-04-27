<template>
  <div id="app">
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <bottom-bar class="bottom-bar"></bottom-bar>
    </el-footer>
  </div>
</template>

<script>

import BottomBar from "@/components/common/bottomBar/BottomBar";

export default {
  name: 'App',
  components: {
    BottomBar
  }
}
</script>

<style>
.el-main{
  height: 590px;
}

.el-footer{
  width: 96%;
  height: 60px;
  position: fixed;
}
</style>
