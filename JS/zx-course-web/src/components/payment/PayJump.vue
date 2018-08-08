<template>
  <div>
    <form action="" id="payForm" name="payForm" style="display: none" method="post">
    </form>
    <div class="correcting-waiting">
      <i></i>
        <p>努力加载中~</p>
    </div>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
export default {
  name: 'PayJump',
  data () {
    return {
      orderId: ''
    }
  },
  mounted () {
    this.orderId = this.$route.query.orderId;
    if (this.orderId) {
      var options = {};
      options.orderId = this.orderId;
      myCourseService.getPaymentParams(options).then((response) => {
        if (response) {
          // 模拟表单提交
          this.formPost(response.action, response.params);
        }
      });
    }
  },
  methods: {
    formPost (url, params) {
      let form = document.getElementById('payForm');
      form.action = url;
      let div = document.createElement('div');
      params.forEach(param => {
        let ele = document.createElement('input');
        ele.name = param.name;
        // 防止IE浏览器将null 自动转换为"null" 导致错误
        if (param.value !== null) {
          ele.value = param.value;
        }
        div.appendChild(ele);
      });
      form.appendChild(div);
      form.submit();
    }
  }
}
</script>
