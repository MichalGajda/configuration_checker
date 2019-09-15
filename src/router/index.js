import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: () => import('@/components/RaportsDashboard'),
    // },
    {
      path: '/requirements',
      name: 'Requirements',
      component: () => import('@/components/Requirements'),
    },
    {
      path: '/raports',
      name: 'RaportsDashboard',
      component: () => import('@/components/RaportsDashboard'),
    },
    {
      path: '/raports/:id',
      name: 'Raport',
      component: () => import('@/components/TestRaport'),
    }
  ]
})
