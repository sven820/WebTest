<template>
	<div>
		<button v-on:click="didClickButton" >
			You clicked me {{ count }} times.
		</button>

		<!-- 子组件绑定父组件属性，可以动态更新 -->
    <!-- @ v-on:缩写 -->
    <!-- : v-bind:缩写 -->
    <!-- ref 链接子组件vue对象 -->
    <!-- $event.target.value 快捷取监听事件的值 -->
		<select-button class="" :msg="count" @select-button-changed="onSelectButtonSelectChanged" ref="childButton"></select-button>

    
    <!-- vmodel语法糖，用于和子组件数据交换，默认是value，emit imput事件，也可以切换type为clickbox的事件等 -->
    <span v-for="(data, index) in datas" v-if="isLoaded">
        {{data.isSelected}}
        <selection-button 
        v-model="data.isSelected" 
        :title="data.title" 
        @input="didClickSelectionButton([$event, index])"
        ></selection-button>
    </span>

    <subject-grade-compare-setting></subject-grade-compare-setting>
    
	</div>
</template>

<script>
import SelectButton from './SelectButton'
import SelectionButton from './SelectionButton'
import SubjectGradeCompareSetting from './SubjectGradeCompareSetting'

export default {

  name: 'CountButton',

  data () {
    return {
      isLoaded: true,
    	count: 0,
      isSelected: true,
      datas: []
    }
  },
  watch: {
    
  },
  created() {
      for (var i = 1; i < 4; i++) {
        var data = {
          title: "高" + i,
          isSelected: false
        }
        this.datas.push(data)
      }
  },
  mounted() {

  },
  methods: {
  	didClickButton() {
  		this.count++

      // alert(this.$refs.childButton.$data.isSelected)
  	},
    didClickSelectionButton(value) {
      let elIndex = value[1]
      let elSelect = value[0]
      this.datas.forEach(function(data, index) {
        if (index != elIndex && elSelect == true) {
          data.isSelected = false
        }
      })
      //刷新方法1
      this.reload()
      //刷新方法2 路由替换,是不是要vue-router？
      // alert(this.$router)
    },
    onSelectButtonSelectChanged(isSelected) {
      alert('get isSelected: ' + isSelected)
    },
    reload () {
     this.isLoaded = false
     this.$nextTick(() => (this.isLoaded = true))
   }  
  },
  components: {
  	'selectButton': SelectButton,
    'selectionButton': SelectionButton,
    'subjectGradeCompareSetting': SubjectGradeCompareSetting
  }
}
</script>

<style lang="css" scoped>
	button {
		width: 300px;
        height: 300px;
        backgroundColor: white
	}
</style>