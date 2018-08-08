<template>
  <div id="footTemplate">
  </div>
</template>

<script>
import store from '../../vuex/store'
export default {
  data () {
    return {
    }
  },
  computed: {
    containerUrl: function () {
      if (process.env.NODE_ENV === 'development') {
        return 'http://test.zhixue.com';
      }
      return '';
    }
  },
  created () {
    this.getCommonFoot();
  },
  methods: {
    getCommonFoot () {
      let cookieId = $.cookie('tlsysSessionId');
      let userId = store.state.currentUser.id;
      let role = store.state.currentUser.role;
      $.ajax({
        url: this.containerUrl + '/container/commonModule/getStudentFoot/',
        type: 'GET',
        data: {
          'r': cookieId + userId + role
        },
        dataType: 'JSONP',
        cache: true,
        jsonp: 'callback',
        jsonpCallback: 'getStudentFoot',
        success: function (data) {
          // 将HTML进行解码
          let html = $('<div/>').html(data.html).text();
          $('#footTemplate').html(html);
        },
        error: function () {}
      });
    }
  }
}
</script>

<style scoped>

</style>
