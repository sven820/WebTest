<template>
  <div id="secondNav" class="second-nav">
    <div :class="isSecondNavFixed? 'fixed' : ''" class="menu-navi">
      <ul class="clearfix">
        <template v-if="showSmartClass">
          <li>
             <router-link to="/schoolcenter" class="school">智空课</router-link>
          </li>
          <li class="line"></li>
        </template>
        <li>
          <router-link to="/home" class="index">全部课程</router-link>
        </li>
        <li class="line"></li>
        <li>
          <router-link to="/myCart" class="course">我的购物车</router-link>
        </li>
        <li class="line"></li>
        <li>
          <router-link to="/myCourse" class="course">我的课程</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import baseService from '@/api/baseService'
export default {
  props: ['isSecondNavFixed'],
  name: 'SecondNav',
  data () {
    return {
      showSmartClass: false
    }
  },
  created () {
    this.isCustom();
  },
  methods: {
    isCustom () {
      baseService.isCustom().then((response) => {
        this.showSmartClass = response;
        if (this.showSmartClass) {
          let url = window.location.href;
          if (url.indexOf('from=web-container_top') > -1) {
            this.$router.push({
              path: '/schoolCenter'
            });
          }
        }
      });
    }
  }
}
</script>

<style scoped>
  .second-nav {
    height: 51px;
  }
  .menu-navi {
    width: 100%;
    height: 50px;
    background: #fff;
  }
  .menu-navi.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .menu-navi.fixed li a{
    font-size: 18px;
  }
  .menu-navi ul {
    width: 1200px;
    padding: 15px 0;
    margin: 0 auto;
  }
  .menu-navi li {
    float: left;
  }
  .menu-navi li.line {
    width: 1px;
    height: 14px;
    background: #bfbfbf;
    margin: 3px 25px 0;
  }
  .menu-navi li a {
    display: block;
    line-height: 20px;
    color: #333333;
    font-size: 14px;
  }
  .menu-navi li a:hover,
  .menu-navi li a.on {
    color: #0dc2b3;
  }
</style>
