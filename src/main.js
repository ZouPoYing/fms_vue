import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import toast from "@/components/common/toast";

Vue.use(router)
Vue.use(ElementUI)
Vue.use(store)
Vue.use(toast)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  toast,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
