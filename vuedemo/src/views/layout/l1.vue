<template>
	<div class="content">
		<div class="test">navnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnavnav</div>
    <div class="name">{{name}}</div>
	</div>
</template>

<script>
export default {

  name: 'l1',

  data () {
    return {
      name: 'jxf'
    }
  },
  created() {
    this.test()
  },
  methods: {
    test() {
      console.log('jxf===');
    }
  }
}
</script>

<style lang="css" scoped>
.test {
	word-break: normal;
	word-wrap: break-word;
}

</style>