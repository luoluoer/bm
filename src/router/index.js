import Vue from 'vue'
import VueRouter from 'vue-router'
import MaterielGoodsInfoView from '../views/MaterielGoodsInfoView.vue'

import Layout from '../Layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/Login',
    children: [
      {
        path: 'MaterielGoodsInfoView',
        name: 'MaterielGoodsInfoView',
        component: () => import('@/views/MaterielGoodsInfoView.vue')
      },
      {
        path: 'PcbBomInfo',
        name: 'PcbBomInfo',
        component: () => import('@/views/PcbBomInfo.vue')
      },
      {
        path: 'Book',
        name: 'Book',
        component: () => import('@/views/Book.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },

  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
