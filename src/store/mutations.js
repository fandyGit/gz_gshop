/*
* 直接更新state数据
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "./mutationts-type";

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address;
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.address=categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.address=shops;
  },
}
