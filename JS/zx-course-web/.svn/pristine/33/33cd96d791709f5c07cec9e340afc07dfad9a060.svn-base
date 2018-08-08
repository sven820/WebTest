<template>
  <div>
    <container-head></container-head>
    <second-nav :isSecondNavFixed='isSecondNavFixed'></second-nav>
    <div class="course-warp">
      <router-view></router-view>
    </div>
    <container-foot></container-foot>
  </div>
</template>

<script>
import ContainerHead from './common/ContainerHead'
import SecondNav from './common/SecondNav'
import ContainerFoot from './common/ContainerFoot'
export default {
  name: 'index',
  components: {
    'second-nav': SecondNav,
    'container-foot': ContainerFoot,
    'container-head': ContainerHead
  },
  data () {
    return {
      isSecondNavFixed: false
    }
  },
  created () {
    // 设置公共头部导航选中样式
    setTimeout(function () {
      if (window.highLightHeadMenu) {
        window.highLightHeadMenu('online');
      }
    }, 1000);
  },
  mounted () {
    this.setMinHeight();
    // window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var offsetTop = document.querySelector('#secondNav').offsetTop;
      if (scrollTop > offsetTop) {
        this.isSecondNavFixed = true;
      } else {
        this.isSecondNavFixed = false;
      }
    },
    setMinHeight () {
      if (document.querySelector('.course-warp')) {
        let height = document.documentElement.clientHeight - 228;
        document.querySelector('.course-warp').style.minHeight = height + 'px';
      }
    }
  },
  destroyed () {
  }
}
</script>

<style>
body{
  background: #f8f8f8
}
.course-warp{
  min-height: 500px;
}
</style>
