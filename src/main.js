// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Goods from 'components/goods/goods.vue'
import Sellers from 'components/sellers/sellers.vue'
import Ratings from 'components/ratings/ratings.vue'

import 'common/stylus/index.styl'

Vue.config.productionTip = false
// 1.引用vue-router
Vue.use(VueRouter)
// 2.实例化vue-router
// 3.配置路由、组件
const router = new VueRouter({
  linkActiveClass: 'active', /* 全局配置 <router-link> 的默认『激活 class 类名』 */
  routes: [
    {path: '/goods', component: Goods},
    {path: '/sellers', component: Sellers},
    {path: '/ratings', component: Ratings}
  ]
})
/* eslint-disable no-new */
// 4.实例化Vue将App组件挂载到#body
new Vue({
  el: '#body',
  router,
  template: '<App/>',
  components: { App }
})
// router.push('/goods')

