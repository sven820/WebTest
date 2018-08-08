<template>
	<button class="selection-button" :style="style" @click="didClicked">{{title}}</button>
</template>

<script>
export default {

  name: 'SelectionButton',
  props: ['value', 'title'],
  data () {
    return {
    	isSelected: this.value
    }
  },
  computed: {
  	style: function() {
  		return {
			backgroundColor: this.isSelected ? 'red' : 'green'
  		}
  	}
  },
  mounted() {

  },
  methods: {
  	didClicked(event) {
  		this.isSelected = !this.isSelected
  		this.$emit('input', this.isSelected)
  	}
  }
}
</script>

<style lang="css" scoped>
	.selection-button {
		background-color: green;
		width: 200px;
		height: 80px;
		font-size: 26px;
		border-radius: 2px;
	}
</style>