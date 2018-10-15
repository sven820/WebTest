<template>
	<button class="selection-button" :style="style" @click="didClicked">{{title}}</button>
</template>

<script>
export default {

  name: 'SelectionButton',
  props: ['value', 'title', 'enable'],
  data () {
    return {
    	isSelected: this.value,
    }
  },
  computed: {
  	style: function() {
  		return {
			   color: this.isSelected ? '#3FC1C6' : '#212426',
  		}
  	}
  },
  methods: {
  	didClicked(event) {
      if (this.enable === false) { return }
  		this.isSelected = !this.isSelected
  		this.$emit('input', this.isSelected)
  	}
  }
}
</script>

<style lang="css" scoped>
	.selection-button {
		color: #212426;
		font-size: 28px;
		background-color: transparent; 
		border: 0;
		outline: none;
	}
</style>