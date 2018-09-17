/*
* 间接更新  通过mutation更新数据
* */
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
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
} from "./mutationts-type";
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShop
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
  },

  //异步获取商品信息数据
  async getShopGoods({commit},callback){
    const result=await reqShopGoods();
    if(result.code===0){
      const goods=result.data;
      commit(RECEIVE_GOODS,{goods})
      //此时数据已经获取到，通知组件更新可以滑动啦
      callback && callback();
    }
  },
  //异步获取商品信息数据
  async getShopInfo({commit}){
    const result=await reqShopInfo();
    if(result.code===0){
      const info=result.data;
      commit(RECEIVE_INFO,{info})
    }
  },
  //异步获取商品评论信息数据
  async getShopRatings({commit},callback){
    const result=await reqShopRatings();
    if(result.code===0){
      const ratings=result.data;
      commit(RECEIVE_RATINGS,{ratings});
      callback&&callback();
    }
  },

  //同步获取商品数量
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCREAMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREAMENT_FOOD_COUNT,{food})
    }
  },
  //同步清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  //异步获取搜索商品数据
  async searchShops({commit,state},keyword){
    const geohash=state.latitude+','+state.longitude;
    const result=await reqSearchShop(geohash,keyword);
    if(result.code===0){
      const searchShops=result.data;
      commit(RECEIVE_SEARCH_SHOPS,{searchShops});
    }
  },
}
