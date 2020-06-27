import router  from './router'
import store from './store'
import { getToken } from '@/utils/cookies'
import getPageTitle from '@/utils/get-page-title'

const  whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  const  hasToken = getToken()
  // token check
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // vuex check
      const username = store.getters.username
      if (username) {
        next()
      } else {
        try {
          const  hasInfo = await store.dispatch('user/getInfo')
          if (hasInfo) {
            next({ ...to, replace: true })
          } else {
            throw new Error('getInfo-error')
          }
          // 异步路由
          // const accessRoutes = []
          // dynamically add accessible routes
          // router.addRoutes(accessRoutes)
        } catch (e) {
          console.log(e)
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    console.log('not-whiteList', to.path)
    if (!whiteList.indexOf(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
