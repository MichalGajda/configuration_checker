import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Requirements',
      component: () => import('@/components/Requirements'),
    },
    {
      path: '/raports',
      name: 'RaportsDashboard',
      component: () => import('@/components/RaportsDashboard'),
    },
    {
      path: '/raports/:name',
      name: 'Raport',
      component: () => import('@/components/TestRaport'),
    }
  ]
})
