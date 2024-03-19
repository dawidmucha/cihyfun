import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/xkcdProgress',
      name: 'xkcdProgress',
      component: () => import('../views/XkcdProgressView.vue')
    }
  ]
})

export default router
