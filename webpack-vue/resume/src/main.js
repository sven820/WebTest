import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局导入
import '../static/js/jquery-3.3.1'
import '../static/js/bootstrap'

// import jjj from 'jquery'
// window.$ = window.jquery = jjj
// import 'bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
