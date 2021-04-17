import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ExercisePage from '@/views/ExercisePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:exercise',
    name: 'ExercisePage',
    component: ExercisePage,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
]

const baseUrl = process.env.BASE_URL

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
})

export default router
