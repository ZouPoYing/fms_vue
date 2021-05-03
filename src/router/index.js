import Vue from 'vue'
import Router from 'vue-router'
import My from "@/views/my/My";
import Login from "@/views/login/Login";
import Regist from "@/views/regist/Regist";
import Forget from "@/views/forget/Forget";
import Setting from "@/views/setting/Setting";
import Memorandum from "@/views/memorandum/Memorandum";
import Recommend from "@/views/recommend/Recommend";
import Statistics from "@/views/statistics/Statistics";
import MyMoneyDetail from "@/views/myMoneyDetail/MyMoneyDetail";
import Search from "@/views/search/Search";
import Detail from "@/views/detail/Detail";
import MyFund from "@/views/myFund/MyFund";
import StatisticsDetail from "@/views/statistics/StatisticsDetail";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      redirect: '/recommend'
    },
    {
      path: '/myFund',
      name: 'MyFund',
      component: MyFund
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
    },
    {
      path: '/myMoneyDetail',
      name: 'MyMoneyDetail',
      component: MyMoneyDetail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/statisticsDetail',
      name: 'StatisticsDetail',
      component: StatisticsDetail
    }
  ]
})
