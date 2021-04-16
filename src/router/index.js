import { createRouter, createWebHistory } from 'vue-router'
import Exo01 from '../views/Exo-01.vue'

const routes = [
  {
    path: '/',
    name: 'Exo-01',
    component: Exo01,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Exo-02.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
