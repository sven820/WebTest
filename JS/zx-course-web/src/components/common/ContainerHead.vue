<template>
  <div id="headTemplate">
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
    this.getCommonHead();
  },
  methods: {
    getCommonHead () {
      let cookieId = $.cookie('tlsysSessionId');
      let userId = store.state.currentUser.id;
      let role = store.state.currentUser.role;
      $.ajax({
        url: this.containerUrl + '/container/commonModule/getStudentHead/',
        type: 'GET',
        data: {
          'r': cookieId + userId + role
        },
        dataType: 'JSONP',
        cache: true,
        jsonp: 'callback',
        jsonpCallback: 'getStudentHead',
        success: function (data) {
          // 将HTML进行解码
          let html = $('<div/>').html(data.html).text();
          $('#headTemplate').html(html);
        },
        error: function () {}
      });
    }
  }
}
</script>

<style scoped>

</style>
