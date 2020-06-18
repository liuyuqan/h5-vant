import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoutes from './modules/user'

Vue.use(VueRouter)

  const constRoutes = [
    ...userRoutes,
    {
      name: 'redirect',
      path: '/',
      redirect: 'index'
    },
    {
      name: 'index',
      path: '/index',
      component: () => import('@/views/index')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'notFound',
      path: '*',
      component: () => import('@/views/NotFound')
    }
]

const createRouter = () => new VueRouter({
    routes: constRoutes
})
const router = createRouter()

export  function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // matcher =replace routes
}
export  default router
