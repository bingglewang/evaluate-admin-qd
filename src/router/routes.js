const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
/*const index = r => require.ensure([], () => r(require('@/pages/admin/index')), 'index');*/
const userList = r => require.ensure([], () => r(require('@/pages/user/user-list')), 'userList');
const recordList = r => require.ensure([], () => r(require('@/pages/record/record-list')), 'recordList');
/*const paramConfig = r => require.ensure([], () => r(require('@/pages/config/param-config')), 'paramConfig');*/
const NotFoundView = r => require.ensure([], () => r(require('@/components/404.vue')), 'NotFoundView');

/*routes*/
const routes = [
      {
        path: '/',
        name: 'login',
        component: login
      },
      {
        path: '/home',
        name: '',
        component: home,
        meta:{CName:'首页',auth:true},
        children: [
          {path: '',component: userList,meta: {auth:true},},
          {path: '/userList',component: userList,meta: {CName:'用户列表',auth:true}},
          {path: '/recordList',component: recordList,meta: {CName:'查询列表',auth:true}}
         /* {path:'/paramConfig',component:paramConfig,meta:{CName:'参数设置',auth:true}}*/
        ]
      },
      {
    path: '*',
    name: 'NotFoundView',
    component: NotFoundView
  }
]
export default routes
