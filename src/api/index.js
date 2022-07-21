import requests from "./request";

// 课程列表接口
// api/v1/goods/list
export const getCourseList = (params)=>requests({url:'/v1/goods/list',method:'get',data:params})
// 轮播图接口
export const getSwiperList = ()=>requests({url:'/v1/rotation/list',method:'get'})
// 课程详情接口
export const queryUserInfo = ()=>requests({url:'/v1/qgUser/queryUserInfo',method:'get'})