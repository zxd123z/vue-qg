// 对axios进行二次封装
// 引入axios
import axios from 'axios';
const requests = axios.create({
    // 配置对象
    // 基础路径，请求的时候，路径中会显示api
    baseURL:'http://yw.chengtouji.com/dev-api',
    //  baseURL:'/api',
    // 请求超时时间
    timeout:5000
})
// 请求拦截器，再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
    var token = localStorage.getItem('user_token')
    if (config.url == "api/v1/qgUser/queryUserInfo" || config.url == "api/v1/goodsBill/list" || config.url ==
    "api/v1/order/creatOrder" || config.url == "api/v1/order/list") {
        config.headers['Authorization'] = token
    }
    // config是配置对象，对象里有一个属性很重要，headers请求头
    return config;
})
// 响应拦截器,有成功和失败的回调
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器的数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(error)=>{
    // 失败的回调
    return Promise.reject(new Error('请求失败'))
})
// 对外暴露
export default requests;