/*
* 间接更新  通过mutation更新数据
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from "./mutationts-type";
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
} from "../api";


export default {
  //异步获取地址数据
  async getAddress({commit,state}){
    const geohash=state.latitude+','+state.longitude;
    //发送ajax请求
    const result =await reqAddress(geohash);
    if(result.code===0){
      const address=result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //异步获取食品分类数据
  async getCategorys({commit,state}){
    //发送ajax请求
    const result =await reqFoodCategorys();
    //console.log(result)
    if(result.code===0){
      const categorys=result.data;
      //console.log(categorys)
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //异步获取食品分类数据
  async getShops({commit,state}){
    const {longitude,latitude}=state;
    //发送ajax请求
    const result =await reqShops(longitude,latitude);
    if(result.code===0){
      const shops=result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },

  //同步接受用户相关信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result=await reqUserInfo();
    if(result.code===0){
      const userInfo=result.data;
      commit(RECEIVE_USER_INFO,{userInfo});
    }
  },
  //异步退出
  async logout({commit}){
    const result=await reqLogout();
    if(result.code===0){
      commit(RESET_USER_INFO);
    }
  }
}
