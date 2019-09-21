import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './routes'
import {post} from '@/utils/config/axios'

//加载路由中间件
Vue.use(Router)

//定义路由
const router = new Router({
  routes: routeConfig,
})

/**
 * 路由守卫
 * param to 路由目标
 * param from 路由起点
 * param next 跳出守卫
 *
 */
router.beforeEach((to, from, next) => {
  //根据字段判断是否路由过滤
  if (to.matched.some(record => record.meta.auth)) {
    if (window.localStorage.user != undefined && window.localStorage.user != '' && window.localStorage.user != null) {
      let isLoginPower = {
        token: JSON.parse(window.localStorage.user).token
      }
      post('/admin/getAdminById', isLoginPower).then(resp => {
        if (resp.status == 0) {
          next();
        } else {
          //防止无限循环
          if (to.name === 'login') {
            next();
            return
          }
          next(
            {
              path: '/',
              query:{redirect:to.fullPath}
            }
          )
        }
      })
    } else {
      //防止无限循环
      if (to.name === 'login') {
        next();
        return
      }
      next({
        path: '/',
        query:{redirect:to.fullPath}
      });
    }
  } else {
    next()//若点击的是不需要验证的页面,则进行正常的路由跳转
  }
})
export default router
