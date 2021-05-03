import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import toast from "@/components/common/toast";
import ECharts from "vue-echarts/dist/index.esm";
//import ECharts from "vue-echarts/dist/index.esm";
// 手动引入 ECharts 各模块来减小打包体积
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title.js'

Vue.use(router)
Vue.use(ElementUI)
Vue.use(ECharts)
Vue.use(store)
Vue.use(toast)

// 注册组件后即可使用
// Vue.component('v-chart', ECharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  toast,
  ECharts,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
