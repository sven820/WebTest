<template>
	<div>
		<head-view id="header" :rightButtons="rightItem" title="班级成绩对比"  seqkey="header-view-ClassGradeCompare"></head-view>
		<div id="content">
			<table-header class="tableHeader" 
			title="班级"
			@didSelectTableHeaderWithData="didSelectTableHeaderWithData($event)"></table-header>
			<table-cell class="tableCell" v-for="model in gradeModels" :model="model" :key="model.id"></table-cell>
		</div>
		<select-alert v-if='showAlert' @touchEmpty="switchShowAlert"></select-alert>
	</div>
</template>

<script>
	import Vue from 'vue'
	import HeadView from './views/GradeCompareHeader.vue'
	import TableHeader from './views/GradeCompareTableHeader.vue'
	import TableCell from './views/GradeCompareTableCell.vue'
	import SelectAlert from './SelectAlert'
	import TitleImgButton from './views/TitleImgButton'
	import rightArrow from './assets/rightArrow.png'

export default {

  name: 'ClassGradeCompare',
  props: [],
  data () {
    return {
    	showAlert: false,
    	rightItem: [],
    	gradeModels: [],
    	classList: []
    }
  },
  created() {
  		this.addRightViews()
  		this.requestForData()
  },
  components: {
	'headView': HeadView,
	'selectAlert': SelectAlert,
	'tableHeader': TableHeader,
	'tableCell': TableCell
  },
  methods: {
  	addRightViews() {
  		let selectClassButton = new (Vue.extend(TitleImgButton))
  		selectClassButton.$props.title = '选择班级'
  		selectClassButton.$props.img = rightArrow
  		selectClassButton.$props.imgSize = {width: '14px', height: '25px'}
  		selectClassButton.$on('clicked', this.switchShowAlert)

  		this.rightItem = [selectClassButton]
  	},
  	switchShowAlert() {
  		this.showAlert = !this.showAlert
  	},
  	didSelectTableHeaderWithData(data) {
  		let list = this.gradeModels
  		list.sort(function(v1, v2){
  			switch (data.column) {
  				case 1:
  					return data.asc ? (v1.excellentRate > v2.excellentRate) : 
  										(v1.excellentRate < v2.excellentRate)
  				break;
  				case 2:
  					return data.asc ? (v1.wellRate > v2.wellRate) :
  										(v1.wellRate < v2.wellRate)
  				break;
  				case 3:
	  				return data.asc ? (v1.passRate > v2.passRate) :
	  										(v1.passRate < v2.passRate)
  				break;
  				case 4:
	  				return data.asc ? (v1.lowRate > v2.lowRate) :
		  										(v1.lowRate < v2.lowRate)
  				break;
  			}
  		})
  		this.gradeModels = list
  	},
  	requestForData() {
  		for (var i = 0; i < 10; i++) {
  			let data = {
  				id: i,
	    		subject: '语文',
	    		excellentRate: this.testRandomNum(10, 30),
	    		wellRate: this.testRandomNum(10, 30),
	    		passRate: this.testRandomNum(10, 30),
	    		lowRate: this.testRandomNum(10, 30),
	    		detail: '我是谁 我是谁 我是谁 我是谁 我是谁 我是谁'
    		}
    		this.gradeModels.push(data)
  		}
  	},
  	testRandomNum(min, max) {
  		return parseInt(Math.random()*(max-min+1)+min,10)
  	},
  }
}
</script>

<style lang="css" scoped>
	#header {
		position: relative;
		height: 97px;
		width: 100%;
		line-height: 97px;
		background-color: white
	}
	#content {
		width: 100%;
		height: auto;
	}
</style>