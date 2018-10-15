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
			 color: this.isSelected ? '#3FC1C6' : '#212426'
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
		background-color: #FAFBFD;
    color: #212426;
		/*width: 200px;
		height: 80px;*/
		font-size: 26px;
		border-radius: 2px;
	}
</style>