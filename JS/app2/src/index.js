
// import store from './vuex/store'
import Vue from 'vue';
import './assets/css/common.scss'
import './assets/css/common.css'
// import personImg from './assets/images/jxf_test.jpg'
import Home from './app/home'
import jquery from 'jquery'
import Test from './components/Test'
import SelectButton from './components/SelectButton'
import CountButton from './components/CountButton'
import SelectAlert from './ZXReport/SelectAlert'
import SettingArrow from './ZXReport/views/SettingArrowButton'
import TitleImgButton from './ZXReport/views/TitleImgButton'
import GradeCompareHeader from './ZXReport/views/GradeCompareHeader'
import ClassGradeCompare from './ZXReport/ClassGradeCompare'
import SubjectGradeCompare from './ZXReport/SubjectGradeCompare'
import App from './App'
import router from './router'

console.log("========>")
console.log(jquery('#app'))
console.log("========>")

Vue.component('person',{
  data: function () {
      return {

      }
    },
  template: '<div>person <img src="./images/jxf_test.jpg"> </div>',
});

// var img = document.createElement('img')
// img.src = personImg
// document.querySelector('#app').appendChild(img)


Vue.component('button-counter', {
  data: function () {
    return {
      count: 0,
      style: {
        width: '300px',
        height: '300px',
        backgroundColor: 'white'
      }
    }
  },
  components: {
    'selectButton': SelectButton
  },
  template: '\
    <button v-on:click="count++" v-bind:style="style"> \
    You clicked me {{ count }} times. \
    <select-button msg="count"></select-button> \
    </button>\
  '
})

var app = new Vue({
  el: '#app',
  router,
  // data: {
  //   message: 'hello jxf'
  // },
  data() {
    return {
      message: 'hello jxf',
      id: '123456'
    }
  },
  components: {
    'home': Home,
    'test': Test,
    'selectButton': SelectButton,
    'countButton': CountButton,
    'selectAlert': SelectAlert,
    'settingArrow': SettingArrow,
    'gradeCompareHeader': GradeCompareHeader,
    'classGradeCompare': ClassGradeCompare,
    'subjectGradeCompare': SubjectGradeCompare,
    'titleImgButton': TitleImgButton,
    'app': App
  },
  created() {
    // alert('jxf')
  },

  methods: {
    openHome: function(event) {
      alert('open home')
      window.location.href = 'home.html'
    }
  }
});

//通过vue对象获取属性
// alert(app.$data.message)
//import的对象data答应不了
// alert(SelectButton.data().isSelected)


