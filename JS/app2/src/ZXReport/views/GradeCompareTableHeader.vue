<template>
	<div class="root">
		<title-img-button class="item" 
		v-for="data in list"
		@clicked="didClickItem(data)"
		:title="data.title" 
		:key="data.column" 
		:img="data.img"
		:style="itemStyle"
		:imgSize="data.size"
		 title-color="#606D75"></title-img-button>
		<div class="line"></div>
	</div>
</template>

<script>
import AscImg from '../assets/sortAsc.png'
import DescImg from '../assets/sortDesc.png'
import NormalImg from '../assets/sortNone.png'
import TitleImgButton from './TitleImgButton'

export default {

  name: 'GradeCompareTableHeader',
  props: ['title'],
  data () {
    return {
    	list: [
    		{
    			title: this.title,
    			column: 0,
    		},
    		{
    			title: "优秀率",
    			column: 1,
    			img: NormalImg,
    			asc: false,
    			size: {
		            width: '19px',
		            height: '24px'
          		}
    		},
    		{
    			title: "良好率",
    			column: 2,
    			img: NormalImg,
    			asc: false,
    			size: {
		            width: '19px',
		            height: '24px'
          		}
    		},
    		{
    			title: "合格率",
    			column: 3,
    			asc: false,
    			img: NormalImg,
    			size: {
		            width: '19px',
		            height: '24px'
          		}
    		},
    		{
    			title: "低分率",
    			column: 4,
    			asc: false,
    			img: NormalImg,
    			size: {
		            width: '19px',
		            height: '24px'
          		}
    		},
    		{
    			title: "操作",
    			column: 5,
    		},
    	]
    }
  },
  computed: {
  	itemStyle: function() {
  		return {
  			width: 100/this.list.length + '%',
  		}
  	}
  },
  components: {
  	'titleImgButton': TitleImgButton
  },
  methods: {
  	didClickItem(data) {
  		data.asc = !data.asc
  		data.img = data.asc ? AscImg : DescImg
  		this.$emit('didSelectTableHeaderWithData', {column: data.column, asc: data.asc})
  	}
  }
}
</script>

<style lang="css" scoped>
	.root {
		background-color: #FAFBFD;
		border-radius: 6px;
		height: 90px;
		line-height: 90px;
		position: relative;
	}
	.item {
		display: inline-block;
		text-align: center;
	}
	.line {
    position: absolute;
    background-color: #F1F1F1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
  }
</style>