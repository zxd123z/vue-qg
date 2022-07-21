// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import store from './store'
// 页面默认样式清除
import "../src/assets/style/reset.css"
// 引入swiper样式
import "swiper/css/swiper.css" 
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:routers,
  store,
  components: { App },
  template: '<App/>'
})
