import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import store from './store'
import router from './router'
import './permission'
// 第三方组件引入
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
