<template>
  <div class="about">
      <h1>This is an about page!</h1>
      <button class="test jjff" @click="testM">test</button>
  </div>
</template>

<script>
    $(function () {
        // alert(123);
    });
    export default {
        name: 'about',
        components: {

        },
        created() {

        },
        methods: {
            testM() {
                console.log($('about:first'))
                $('about:first').removeClass('jjff')
            }
        }
    }
</script>
<style lang="css" scoped >
    .jjff {
        background-color: red;
    }
</style>