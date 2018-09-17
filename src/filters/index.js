import Vue from 'vue'
// import  moment from 'moment'
import format from 'date-fns/format'
//自定义过滤器
Vue.filter('dateFormat',(val)=>{
  // return moment(val).format('YYYY-MM-DD HH:mm:ss')
   return format(val,'YYYY-MM-DD HH:mm:ss')
})
