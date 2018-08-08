
</script>

<template>
	<div id="test">test vue </div>
</template>

<script>
export default {

  name: 'Test',

  data () {
    return {
    	message : "hello jxf" 
    }
  },
  /*
	beforecreated：el 和 data 并未初始化 
	created:完成了 data 数据的初始化，el没有
	beforeMount：完成了 el 和 data 初始化 
	mounted ：完成挂载
  */
  beforeCreate() {
  	 console.group('beforeCreate 创建前状态===============》');
               console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
               console.log("%c%s", "color:red","message: " + this.message)
  },
  created() {
  	console.group('created 创建完毕状态===============》');
    console.log("%c%s", "color:red","el     : " + this.$el); //undefined
   	console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
   	console.log("%c%s", "color:red","message: " + this.message); //已被初始化
  },
  beforeMount() {
  	console.group('beforeMount 挂载前状态===============》');
            console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
            console.log(this.$el);
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化
  },
  mounted() {
  	console.group('mounted 挂载结束状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
  },
  beforeUpdate() {
  	console.group('beforeUpdate 更新前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);   
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message); 
  },
  updated() {
  	console.group('updated 更新完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el); 
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message);
  },
  beforeDestroy() {
  	console.group('beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message);
  },
  destroyed() {
  	console.group('destroyed 销毁完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);  
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message)
  },
  watch: {

  },
  methods: {

  }

}
</script>

<style lang="css" scoped>
</style>