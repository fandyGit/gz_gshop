<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <slot slot="left">
        <router-link class="header_search" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </slot>
      <slot slot="right">
        <router-link class="header_login" :to="userInfo._id?'/userInfo':'/login'">
          <span class="header_login_text" v-if="!userInfo">登录|注册</span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </router-link>
      </slot>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div v-if="categorys.length>0" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>

  </section>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  export default {
    name: "Msite",
    data(){
      return{
        baseImgUrl:'https://fuss10.elemecdn.com'
      }
    },
    components:{
      HeaderTop,
      ShopList
    },
    mounted(){//插入頁面的時候顯示
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')

    },
    computed:{
      ...mapState(['address','categorys','userInfo']),
      //将这个一维数组切割成8个的二维数组
      categorysArr(){
        const {categorys}=this;
        let arr=[];
        let minArr=[];
        categorys.forEach(c=>{
          //小数组的数量为8的时候，产生一个新数组
          if(minArr.length===8){
            minArr=[]
          }
          //将小数组与大数组关联起来
          if(minArr.length===0){
            arr.push(minArr);
          }
          //将数组放在小数组当中
          minArr.push(c);
        })
        return arr;
      }
    },
    watch:{
      categorys(value){
        this.$nextTick(()=>{//数据更新以后再更新页面 不能在获取数据之前更新页面
          var mySwiper = new Swiper ('.swiper-container', {
            /* direction: 'vertical',*/
            loop: true,

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
