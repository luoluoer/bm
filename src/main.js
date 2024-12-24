import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'


Vue.config.productionTip = false
Vue.use(ElementUI, { size: Cookies.get('size') || 'small' })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
