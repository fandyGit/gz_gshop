<template>
  <div id="app">
    <section class="content">
     <router-view></router-view>
     <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </section>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components:{
    FooterGuide
  },
  mounted(){
    //this.$store.dispatch('getAddress');
    this.getAddress();//更新状态
  },
  methods:{//更新状态在方法中
    ...mapActions(['getAddress']),
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
    .content  //每个页面的内容
      >div //决定哪个页面显示
      display none
      &.on
        display block
      >section
        .header //头部公共css
          background-color #02a774
          position fixed
          z-index 100
          left 0
          top 0
          width 100%
          height 45px
          .header_search
            position absolute
            left 15px
            top 50%
            transform translateY(-50%)
            width 10%
            height 50%
            .iconfont
              font-size 22px
              color #fff
          .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 30%
            color #fff
            font-size 22px
            text-align center
</style>
