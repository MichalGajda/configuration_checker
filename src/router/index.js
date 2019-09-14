import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: () => import('@/components/RaportsDashboard'),
    // },
    {
      path: '/raports',
      name: 'RaportsDashboard',
      component: () => import('@/components/RaportsDashboard'),
    },
    {
      path: '/raports/:id',
      name: 'Raport',
      component: () => import('@/components/Raport'),
    }
  ]
})
