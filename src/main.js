// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button } from 'mint-ui';
import router from './router/index'
import store from './store/index'
import './mock/mockServer' //加载mock数据即可


Vue.component(Button.name, Button);

/*Vue.config.productionTip = false*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})
