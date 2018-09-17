/*
* 直接更新state数据
* */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREAMENT_FOOD_COUNT,
  DECREAMENT_FOOD_COUNT,
} from "./mutationts-type";

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address;
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops;
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo;
  },
  [RESET_USER_INFO](state){
    state.userInfo={};
  },

  //mock数据

  [RECEIVE_GOODS](state,{goods}){
    state.goods=goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings=ratings;
  },
  [RECEIVE_INFO](state,{info}){
    state.info=info;
  },


  [INCREAMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      // food.count=1;这样的话只会让数据变化，并不能实现页面更新
      //向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
      Vue.set(food,'count',1)
      //第一次添加的时候就往cartFoods数组添加数据
      state.cartFoods.push(food);
    }else{
      food.count++;//引用变量，变化的时候cartFoods也可见
      // Vue.set(food,'count',count++)已经添加了就不用再添加啦
    }
  },
  [DECREAMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--;
      // Vue.set(food,'count',count--)已经添加了就不用再添加啦
      if(food.count===0){
        //从数组当中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1);
      }
    }
  },
}
