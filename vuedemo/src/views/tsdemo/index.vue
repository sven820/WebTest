<template>
  <div class="content">
      <div>ts demo</div>
      <div class="msg">{{msg}}</div>
  </div>
</template>
//https://segmentfault.com/a/1190000011744210?utm_source=tuicool&utm_medium=referral
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

  import './index.ts'

  @Component({
    // 所有的组件选项都可以放在这里
    template: '<button @click="onClick">Click!</button>'
  })
  
  export default class App extends Vue {
    // 初始化数据

    msg: string = '123'

    // 声明周期钩子
    mounted() {
      this.greet(this.msg)
    }

    // 计算属性
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // 方法
    greet(msg: string) {
        let name: string = 'jxf'
    //   alert('greeting: ' + this.msg)
        console.log(name);
    }
  }
</script>

<style>

</style>