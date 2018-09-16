<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">天河外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone:rightPhone}"
                      @click.prevent="getCode"
              >
                {{computeTime>0?`已发送${computeTime}秒`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="showPwd?'right':''"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification"
                     src="http://localhost:4000/captcha"
                     @click.stop="getCaptcha"
                     ref="captcha"
                     alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertText :alertText="alertText" @closeTip="closeTip" v-show="showAlert"></AlertText>
  </section>
</template>

<script>
  import AlertText from '../../components/AlertTip/AlertTip'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api/index'
  export default {
    name: "Login",
    components: {
      AlertText
    },
    data() {
      return {
        loginWay: false,//表示短信登录
        computeTime: 0,//初始化设置的时间
        showPwd: false,
        phone: '',//输入的手机号码
        code: '',//短信验证码
        name: '',//用户名
        pwd: '',//密码
        captcha: '',//图形验证码
        alertText: '',//提示文本
        showAlert: false//是否显示提示框
      }
    },
    computed: {
      rightPhone() {
        return /^1\d{10}$/.test(this.phone)
      },
    },
    methods: {
      //开启定时器，发送短息验证码
      async getCode() {
        if (!this.computeTime) {
          //开启定时器
          this.computeTime = 30;
          this.IntervalId = setInterval(() => {
            this.computeTime--;
            if (this.computeTime <= 0) {
              clearInterval(this.IntervalId)
            }
          }, 1000)

          //发送ajax请求获取验证码
          const result = await reqSendCode(this.phone);
          if (result.code === 1) {
            this.ShowAlert(result.msg);
            //停止倒计时
            if (this.computeTime > 0) {
              this.computeTime = 0;
              clearInterval(this.IntervalId);
              this.IntervalId = null;
            }
          }

        }
      },
      //显示提示信息
      ShowAlert(alertText) {
        this.alertText = alertText;
        this.showAlert = true;
      },
      //点击登录
      async login() {
        let result;
        if (this.loginWay) {//表示短息登录
          const {rightPhone, phone, code} = this;
          if (!this.rightPhone) {
            //输入手机号不正确
            this.ShowAlert('输入手机号不正确')
            return
          } else if (!/^\d{6}$/.test(code)) {
            //输入验证码不正确
            this.ShowAlert('输入验证码不正确')
            return
          }
          //发送手机验证码并且去验证
          result = await reqSmsLogin(phone, code);
          } else {//表示密码登录
            const {name, pwd, captcha} = this;
            if (!name) {
              //输入用户名不正确
              this.ShowAlert('输入用户名不正确')
              return
            } else if (!pwd) {
              //输入密码不正确
              this.ShowAlert('输入密码不正确')
              return
            } else if (!captcha) {
              //输入验证码不正确
              this.ShowAlert('输入验证码不正确')
              return
            }else{}
            //发送用户名密码验证码并且去验证
            result = await reqPwdLogin({name, pwd, captcha});
          }
          //停止倒计时
          if (this.computeTime > 0) {
            this.computeTime = 0;
            clearInterval(this.IntervalId);
            this.IntervalId = null;
          }
          //处理发送成功失败的数据
          if (result.code === 0) {
            //成功啦，保存数据
            const user=result.data;
            //保存到数据中
            this.$store.dispatch('recordUser',user);
            //跳转页面到profile
            this.$router.replace('/profile');
          } else {
            //失败啦，显示提示信息
            const msg=result.msg;
            this.ShowAlert(msg);
            //重新刷新验证码
            this.getCaptcha();
          }
      },
      //关闭警示框
      closeTip() {
        this.alertText = '';
        this.showAlert = false;
      },
      //获取验证码
      getCaptcha() {
        setTimeout(() => {
          this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now();
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        > form
          > div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color green
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              > a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        > .iconfont
          font-size 20px
          color #999
</style>
