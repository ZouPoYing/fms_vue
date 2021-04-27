import Vue from 'vue'
import Router from 'vue-router'
import My from "@/views/my/My";
import View3 from "@/views/view3";
import Login from "@/views/login/Login";
import Regist from "@/views/regist/Regist";
import Forget from "@/views/forget/Forget";
import Setting from "@/views/setting/Setting";
import Memorandum from "@/views/memorandum/Memorandum";
import Recommend from "@/views/recommend/Recommend";
import Statistics from "@/views/statistics/Statistics";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      redirect: '/recommend'
    },
    {
      path: '/view3',
      name: 'View3',
      component: View3
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/memorandum',
      name: 'Memorandum',
      component: Memorandum
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }

  ]
})
