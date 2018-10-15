<template>
	<span @click="click">
		<label>{{this.title}}</label>
		<img src="../assets/rightArrow.png">
	</span>
</template>

<script>
export default {

  name: 'SettingArrowButton',
  props: ['title', 'normalImage', 'selectImage'],
  data () {
    return {

    }
  },
  created() {

  },
  methods: {
  	click() {
  		this.$emit('clicked')
  	}
  }
}
</script>

<style lang="css" scoped>
	div label {
		color: #212426;
		background-color: orange;
		vertical-align: middle;
		font-size: 28px;
	}
	div img {
		width: 14px;
		height: 25px;
		vertical-align: middle;
	}

</style>