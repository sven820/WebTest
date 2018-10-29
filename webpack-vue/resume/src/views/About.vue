

<template>
  <div class="about">
      <h1>This is an about page!</h1>
      <button class="test" @click="testM">test</button>

      <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">Left</button>
          <button type="button" class="btn btn-default">Middle</button>
          <button type="button" class="btn btn-default">Right</button>
      </div>
      <button type="button" class="btn btn-lg btn-primary">Primary</button>
      <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
  </div>
</template>

<script>
    /* eslint-disable */

    // import $ from 'jquery' //按需导入，非全局

    export default {
        name: 'about',
        components: {

        },
        created() {


        },
        methods: {
            testM() {
                console.log($('about:first')) // eslint-disable-line
                // eslint-disable-next-line
                $('.test').css('background-color', 'red')
            }
        }
    }
    /* eslint-enable */
</script>

<style lang="css" scoped >
</style>