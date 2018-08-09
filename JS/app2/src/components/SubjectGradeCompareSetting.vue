<template>
  <div id="root">
    <div id="header">
      <button id="cancel">取消</button>
      <label id="title">学科成绩对比</label>
      <button id="confim">确定</button>
    </div>
    <div class="line"></div>
    <div class="left-bar">
      <label style="bottom: 0;position: absolute;">选择班级：</label>
    </div>
    <div class="right-table">
        <span v-for="(data, index) in datas" v-if="isLoaded">
          <selection-button 
          v-model="data.isSelected" 
          :title="data.title" 
          @input="didClickSelectionButton([$event, index])">
          </selection-button>
        </span>
    </div>  
    <div class="test"></div>
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
  #root {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*max-height: 600px;*/
    background-color: gray;
    overflow: scroll;
  }
  #header {
    height: 100px;
    background-color: orange;
    position: relative;
  }
  #cancel {
    position: absolute;
    left: 20px;
    top: 50%;
    height: 50px;
    margin-top: -25px;
    background-color: blue
  }
  #title {
    position: absolute;
    left:50%;
    top: 50%;
    width: 100px;height: 50px;
    margin-left: -50px;
    margin-top: -25px;
    background-color: blue;
    line-height: 50px;
  }
  #confim {
    position: absolute;
    right: 20px;
    top: 50%;
    height: 50px;
    margin-top: -25px;
    background-color: blue
  }
  .line {
    background-color: red;
    height: 2px;
  }
  .left-bar {
    float: left;
    background-color: blue;
    left: 0;
    height: 100%;
    width:10%;
  }
  .right-table {
    text-align: center;
    float: left;
    height: 100%;
    background-color: orange;
    width:80%;
  }
  .test {
    background-color: green;
    float: right;
    right: 0px;
    height: 100%;
    width:10%;  
  }
</style>