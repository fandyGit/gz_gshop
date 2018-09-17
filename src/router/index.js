/*
* 管理路由器模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由组件
// import Msite from '../pages/Msite/Msite'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Search from '../pages/Search/Search'
//路由懒加载---只有点击的时候才会加载对应的路由---针对于顶级路由，多发送请求，可以减少一个文件的大小
const Msite=()=>import('../pages/Msite/Msite');
const Order=()=>import('../pages/Order/Order');
const Profile=()=>import('../pages/Profile/Profile');
const Search=()=>import('../pages/Search/Search');


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
//使用插件
Vue.use(VueRouter);
export default new VueRouter({
  //配置所有路由；
  routes:[
    {
      path:'/msite',
      component:Msite,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'',
          redirect:'/shop/goods'
        },
      ],
    },
    {
      path:'/',
     redirect:'/msite'
    },

  ]
})
