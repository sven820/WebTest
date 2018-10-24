import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../static/js/jquery-3.3.1.min'
import '../static/js/bootstrap.min'
import '../static/css/bootstrap-theme.css'
import '../static/css/bootstrap.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
