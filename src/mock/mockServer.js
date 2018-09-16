/*
* mock数据
* */
import data from './data.json'
import Mock from 'mockjs'

//提供goods接口
Mock.mock('/goods',{code:0,data:data.goods})
//提供ratings接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//提供info接口
Mock.mock('/info',{code:0,data:data.info})

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
