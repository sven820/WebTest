<template>
	<div class="root">
		<title-img-button class="item" 
		v-for="data in cellDatas"
		@clicked="didClickItem(data)"
		:title="data.title" 
		:key="data.column" 
		:img="data.img"
		:style="itemStyle"
    :imgSize="data.size"
		 title-color="#606D75"></title-img-button>
    <div class="detailContent" v-if="showDetail">
      <div class="detail" :style="detailStyle">
        <label>{{model.detail}}</label>
      </div>
    </div>
    <div class="line"></div>
	</div>
</template>

<script>
import TopImg from '../assets/topArrow.png'
import BottomImg from '../assets/bottomArrow.png'
import TitleImgButton from './TitleImgButton'

export default {

  name: 'GradeCompareTableCell',
  props: ['model'],
  data () {
    return {
      showDetail: false,
    }
  },
  computed: {
    cellDatas: function() {
        return [
          {title: this.model.subject, column: 0},
          {title: this.model.excellentRate + '%', column: 1},
          {title: this.model.wellRate + '%', column: 2},
          {title: this.model.passRate + '%', column: 3},
          {title: this.model.lowRate + '%', column: 4},
          {title: '详情', column: 5, img: BottomImg, size: {width: '25px', height: '14px'}}
        ]
    },
  	itemStyle: function() {
  		return {
  			width: 100/this.cellDatas.length + '%',
  		}
  	},
    detailStyle: function() {
      return {
        marginLeft: 100/this.cellDatas.length + '%',
      }
    },
  },
  components: {
  	'titleImgButton': TitleImgButton
  },
  created() {

  },
  methods: {
  	didClickItem(data) {
      if (data.column == 5) {
        this.showDetail = !this.showDetail
        if (this.showDetail)  {
          data.img = TopImg
        } else {
          data.img = BottomImg 
        }
      }
  	}
  }
}
</script>

<style lang="css" scoped>
  .root {
    position: relative;
  }
	.item {
    background-color: #FFFFFF;
    height: 90px;
    line-height: 90px;
		display: inline-block;
		text-align: center;
	}
  .detailContent {
    padding-bottom: 30px;
    background-color: white
  }
  .detail {
    background-color: #FAFBFD;
    border-radius: 6px;
    padding: 24px 80px
  }
  .detail label {
    color: #606D75;
    font-size: 26px;
    text-align: left;
    line-height: 48px;
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