<template>
  <div>
    {{login}}
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: 'Loading……',
      jumpUrl: process.env.LOGIN_PATH
    }
  },
  created () {
    window.location.href = this.jumpUrl;
  }
}
</script>

<style scoped>

</style>
