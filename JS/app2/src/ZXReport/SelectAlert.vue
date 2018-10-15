<template>
	<div id="root">
		<div id="empty" @click="didClickEmptyArea"></div>
		<div id="content" v-if="isLoaded">
			<selection-button 
			id="all-button"
			v-model="isSelectAll" 
			title="全部班级" 
			:enable="enableSelectAll"
			@input="didClickAllSelectionButton([$event])">
			</selection-button>

			<ul>
				<li v-for="(data, index) in datas">
					<selection-button 
					v-model="data.isSelected" 
					:title="data.title" 
					@input="didClickSelectionButton([$event, index])">
					</selection-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import SelectionButton from './views/SelectionButton'
	export default {

		name: 'SelectAlert',
		props: [],
		data () {
			return {
				isLoaded: true,
				isSelectAll: false,
				enableSelectAll: true,
				datas: [],
			}
		},
		created() {
			for (var i = 1; i < 20; i++) {
				var data = {
					title: "高" + i,
					isSelected: false
				}
				if (i == 1) {
					data.isSelected = true
				}
				this.datas.push(data)
			}
		},
		components: {
			'selectionButton': SelectionButton,
		},
		methods: {
			didClickEmptyArea() {
				this.$emit('touchEmpty')
			},
			didClickSelectionButton(value) {
				let elIndex = value[1]
				let elSelect = value[0]
				let data = this.datas[elIndex]
				data.isSelected = elSelect

				if (this.isSelectAll) {
					this.isSelectAll = false
					this.enableSelectAll = true
					this.reload()
				}
			},
			didClickAllSelectionButton(value) {
				if (this.isSelectAll && this.enableSelectAll) {
					this.enableSelectAll = false
					this.datas.forEach(function(data, index) {
						data.isSelected = false
					})
					this.reload()
				}
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
	    background-color: rgba(0,0,0,0.5015);
	    z-index: 1000
	}
	#empty {
		position: absolute;
		height: 100%;
		left: 0;
		right: 0;
		/*background-color: gray;*/
	}
	#content {
		position: absolute;
		height: 100%;
		width: 300px;
		right: 0px;
		background-color: #FAFBFD;
	}
	#all-button {
		width: 100%;
		height: 90px;
		text-align: center;
		line-height: 90px;
	}
	ul {
		overflow: auto;
		padding: 0px;
		margin: 0px;
		top: 90px;
		bottom: 0px;
		right: 0px;
		left: 0px;
		position: absolute;
	}
	li {
		list-style-type:none;
		height: 90px;
		line-height: 90px;
		text-align: center;
		vertical-align: center;
	}
</style>