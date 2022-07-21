import Vue from 'vue'
import router from 'vue-router'
import Home from '@/pages/Home/Home'
import Center from '@/pages/Center/Center'
import Login from '@/pages/Login/Login'
import Mine from '@/pages/Mine/Mine'
import detail from '@/pages/Home/Detail/Detail'
import Buy from '@/pages/Mine/Buy/Buy'
import Empty from '@/pages/Mine/Empty/Empty'

Vue.use(router)

const routers = new router({
  routes: [
    {
      path:'/',
      component:Home,
      name:'Home',
      meta:{showFooter:true}
      // redirect:'/Home'
  },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      props:true,
      meta:{showFooter:true}
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:detail,
    },
    {
      path: '/Center',
      name: 'Center',
      component: Center,
      meta:{showFooter:true}
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      meta:{showFooter:true}
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Buy',
      name: 'Buy',
      component: Buy,
      meta:{isAuth:true},
      children:[
        {
          path: 'Empty',
          name: 'Empty',
          component: Empty,
        }
      ]
    },
      // 重定向,在项目跑起来的时候，访问/,连让他到首页
     
  ]
})

// 前置路由守卫，初始化的时候被调用和每次切换路由之前被调用
routers.beforeEach((to,from,next)=>{
  // console.log('前置路由守卫');
  // 判断是否需要鉴权
  const token = localStorage.getItem("user_token")
  if (to.meta.isAuth) {
      // 判断localStorage里是否有这个信息
        if (token == '' || token == null) {  
          next({ name: 'Empty' })
        
        }else{
          //  console.log('登陆过了，可以放行');
          next()
        }
        console.log();
        next()
         
  }else{
      next() //放行，进行下一步跳转
  }
})
export default routers;