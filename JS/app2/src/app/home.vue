
<template lang="html">
  <div class="">
      <p>
          <router-link to="/home/discover">Discover</router-link>
          <router-link to="/home/around">Around</router-link>
      </p>
      <!-- 对应的组件内容渲染到router-view中 -->
      <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="css" scoped>

</style>
