<template>
	<span @click="click">
		<label :style="labelStyle">{{this.title}}</label>
		<img :src="img" :style="imgStyle" v-if="img">
	</span>
</template>

<script>
export default {

  name: 'TitleImgButton',
  props: ['title', 'img', 'titleFont', 'titleColor', 'imgSize', 'titleImgMargin'],
  data () {
    return {
      
    }
  },
  computed: {
  	labelStyle: function() {
  		return {
  			color: this.titleColor ? this.titleColor : '#212426',
  			fontSize: this.titleFont ? this.titleFont : '28px',
  			marginRight: this.titleImgMargin && this.img ? this.titleImgMargin : '4px'
  		}
  	}, 
  	imgStyle: function() {
  		return {
  			width: this.imgSize ? this.imgSize.width : '',
  			height: this.imgSize ? this.imgSize.height : '',
  		}
  	}
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
		vertical-align: middle;
		font-size: 28px;
		margin-right: 4px;
	}
	div img {
		vertical-align: middle;
	}

</style>