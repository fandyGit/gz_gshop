/*
* vuex当中的计算属性
* */
export default {
  totalCount(state){//计算总的商品数量
    return state.cartFoods.reduce((prevTotal,food)=>prevTotal+food.count,0)
  },
  totalPrice(state){//计算总的价格
    return state.cartFoods.reduce((prevTotal,food)=>prevTotal+(food.count*food.price),0)
  },
  positiveSize(state){
    return state.ratings.reduce((prevTotal,rating)=>prevTotal+(rating.rateType===0?1:0),0)
  }
}
