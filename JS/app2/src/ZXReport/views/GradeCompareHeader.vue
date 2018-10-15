<template>
	<div>
		<div class="head-line"></div>
		<div class="head-title">{{title}}</div>
		<div class="right-buttons" :id="seqkey"></div>
	</div>
</template>

<script>
	import SettingArrowButton from './SettingArrowButton'
	export default {

		name: 'GradeCompareHeader',
		props: ['rightButtons', 'title', 'seqkey'],
		data () {
			return {

			}
		},
		created() {

			window.addEventListener("load", this.addRightButtons);
		
		},
		components: {
			'settingArrowButton': SettingArrowButton,
		},
		methods: {
			addRightButtons(event) {
				let rightButtonView = document.getElementById(this.seqkey)
				let length = this.rightButtons.length
				let margin = length > 1 ? '12px' : '0'
				for (let index in this.rightButtons) {
					let span = document.createElement('span')
					span.style.marginRight = index < length - 1 ? margin : 0
					let div = document.createElement('div')
					rightButtonView.appendChild(span)
					span.appendChild(div)
					this.rightButtons[index].$mount(div)
				}
			}
		}
	}
</script>

<style lang="css" scoped>
	.head-line {
		display: inline-block;
		position: relative;
		width: 6px;
		height: 34px; 
		top: 6px;
		background-color: #3FC1C6;
		/*vertical-align: middle;*/
	}
	.head-title {
		display: inline-block;
		font-size: 30px;
		color: #212426;
		/*vertical-align: middle;*/
	}
	.right-buttons {
		display: inline-block;
		position: absolute;
		right: 0px;
		margin-right: 12px;
	}
</style>