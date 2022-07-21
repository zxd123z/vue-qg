
import {getSwiperList} from '@/api/index.js'
// 主页数据存储
const state = {
    // 初始化数据
    bannerList:[],//轮播图数据
    courseList:[], //课程列表
    courseDetail:{}, //课程详情
    token:null, //用户token
    userInfo:null, //用户信息
}
const mutations = {
    GETBANNERLIST(state,bannerList){
            state.bannerList = bannerList
    },
    USERINFO(state,userinfo){
        state.userInfo = userinfo
    },
    USERTOKEN(state,usertoken){
        state.token = usertoken,
        localStorage.user_token = usertoken
    }
   
}
const actions = {
    async getBannerList({commit}){
        let result = await getSwiperList();
        if (result.code == 200) {
            commit('GETBANNERLIST',result.data.records)   
        }else{
            console.log('false');
        }
    },
    userInfo({commit},data){
        commit('USERINFO',data)
    },
    usertoken({commit},data){
        commit('USERTOKEN',data)
    }
 
}
const getters = {
        //获取token方法
        //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
        if (!state.token) {
          state.token = localStorage.getItem('user_token')
        }
        return state.token
    },
  
}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}