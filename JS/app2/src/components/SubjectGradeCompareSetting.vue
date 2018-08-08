<template>
	<div>
		<div id="header">
			<div id="cancel">取消</div>
			<div id="title">学科成绩对比</div>
			<div id="confim">确定</div>
			<div class="line"></div>
		</div>
		<div id="content">
			<div>选择班级：</div>
			<div id="content">
				<span v-for="(data, index) in datas" v-if="isLoaded">
			        <selection-button 
			        v-model="data.isSelected" 
			        :title="data.title" 
			        @input="didClickSelectionButton([$event, index])">
			        </selection-button>
    			</span>
			</div>	
		</div>
	</div>
</template>

<script>
	import SelectionButton from './SelectionButton'
export default {

  name: 'SubjectGradeCompareSetting',

  data () {
    return {
    	isLoaded: true,
    	datas: []
    }
  },
  created() {
  	for (var i = 1; i < 10; i++) {
        var data = {
          title: "高" + i,
          isSelected: false
        }
        this.datas.push(data)
      }
  },
  components: {
  	'selectionButton': SelectionButton,
  },
  methods: {
  	didClickSelectionButton(value) {
      let elIndex = value[1]
      let elSelect = value[0]
      this.datas.forEach(function(data, index) {
        if (index != elIndex && elSelect == true) {
          data.isSelected = false
        }
      })
      this.reload()
    },
    reload () {
     this.isLoaded = false
     this.$nextTick(() => (this.isLoaded = true))
   	}  
  }
}
</script>

<style lang="css" scoped>
	.line {
		background-color: gray;
		height: 2px;
	}
	#header {
		background-color: orange;
	}
	#cancel {

	}
	#title {

	}
	#confim {

	}
</style>