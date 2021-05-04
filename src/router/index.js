import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:exercise',
    name: 'ExercisePage',
    component: () => import(/* webpackChunkName: "exercise" */ '@/views/ExercisePage.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
]

const baseUrl = process.env.BASE_URL

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
})

export default router
