import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;


// 计算缩放比例
// (function () {
//   var phoneScale = parseInt(window.screen.width) / 375;
//   console.log("=====>", phoneScale, window.screen.width);
//   // document.write('<meta name="viewport" content="width=375, minimum-scale=' + phoneScale + ', maximum-scale=' + phoneScale + ', user-scalable=no">');
//   document.write('<meta name="viewport" content="width=' + 'width-device' + ', initial-scale=1">');
// })();

// (function() {
// 	var curWidth = window.screen.width; //iphone 6plus为414px
//     var targetWidth = 375;
//     var scale = curWidth/targetWidth;
//     var meta = document.createElement("meta");
//     meta.name = "viewport";
//     meta.content = 'initial-scale='+scale+',minimum-scale='+scale+',maximum-scale='+scale+'';
//     document.head.appendChild(meta);
// })()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
