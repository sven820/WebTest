// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueRouter from 'vue-router'
import './utils/ConstantSets'
import ElementUI from 'element-ui'
import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import './assets/third/element-zhixue/index.css'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(iView);

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
// Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
