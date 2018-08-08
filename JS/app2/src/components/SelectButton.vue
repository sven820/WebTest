
<template>
	
	<div class="select-button">
		<!-- style支持数组多样式 -->
		<button class = "select-button" 
		v-bind:style = 'style'
		v-on:click ='didClickedButton'>
		
		{{title}}
		</button>

		<div>test bind props msg: {{msg}}</div>
	</div>
	
</template>

<script>
export default {

  name: 'SelectButton',
  props: ['msg'], //父组件传递给子组件参数，//子组件不要更改props的值，可以通过计算属性绑定
  data () { //一般用来存放视图数据
    return {
    	title: this.msg, //可以这么写但是不能动态更新,不能和props中的属性重复
    	isSelected: false,
    	// style: {
    	// 	backgroundColor: 'green',
    	// },
    }
  },
  computed: { //计算属性
  	style: function() {
  		let styleData = {
			backgroundColor: this.isSelected ? 'red' : 'green'
  		}
  		return styleData
  	}
  },
  watch: { //侦听属性
  	// isSelected: function(val) {
  	// 	if (val) {
  	// 		this.style.backgroundColor = 'red'
  	// 	} else {
  	// 		this.style.backgroundColor = 'green'
  	// 	}
  	// }
  	msg: function(val) { //初始父组件传递到prop的值并不能被watch到
  		console.log('msg changed', val)
  	}
  },
  created() {
  	// this.title = this.msg
  },
  mounted() {

  },
  methods: {
  	didClickedButton(event) {
  		this.isSelected = !this.isSelected;
  		// alert(event.target.isSelected)
      // this.msg =  
      this.$emit('select-button-changed', this.isSelected)
  	}
  }
}
</script>

<style lang="css" scoped>
	.select-button {
		background-color: green;
		width: 200px;
		height: 80px;
		font-size: 26px;
		border-radius: 2px;
	}
</style>

