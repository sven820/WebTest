<template>
  <div class="pay-success">
    <div class="course-info clearfix">
      <div v-if="showContact" class="module left">
        <div class="in-block pic-box">
          <img :src="qqUrl">
        </div>
        <div class="in-block description">
          <p class="p1">{{contact}}：</p>
          <p class="p2"><strong>{{teacherCode}}</strong></p>
          <p class="p3">获取听课流程及更多备考资料</p>
        </div>
      </div>
      <div class="module right">
        <div class="in-block">
          <img src="../../assets/components/payment/images/pay-success.png">
        </div>
        <div class="in-block description">
          <p class="p4"><strong>支付成功</strong>，快去提升成绩吧！</p>
          <p class="p5">购买课程：{{courseName}}</p>
          <a href="javascript:" @click="toMyCourse">我的课程</a>
        </div>
      </div>
    </div>

    <div class="course-service">
      <p><span>课前</span>准备</p>
      <ul class="service-box clearfix">
        <li>
          <p><img src="../../assets/components/payment/images/lession-ev.png"></p>
          <p class="p1">上课环境</p>
          <p class="p2">推荐在较为安静的室内，<span>使用 Chrome 浏览器和 4M 以上宽带</span>网络听课，保证听课效果</p>
        </li>
        <li>
          <p><img src="../../assets/components/payment/images/add-wechat.png"></p>
          <p class="p1">添加助教老师微信</p>
          <p class="p2"><span>添加助教老师微信</span>，疑难问题即时解决，上课及时提醒</p>
        </li>
        <li>
          <p><img src="../../assets/components/payment/images/preview-txt.png"></p>
          <p class="p1">预习讲义</p>
          <p class="p2">在<a href="javascript:" @click="toMyCourse">我的课程</a>下载并预习课程讲义，以便快速掌握老师上课所讲内容</p>
        </li>
      </ul>

      <p><span>课后</span>服务</p>
      <ul class="service-box clearfix">
        <li>
          <p><img src="../../assets/components/payment/images/asign-homework.png"></p>
          <p class="p1">布置作业</p>
          <p class="p2">听课结束后，辅导老师会在<span>班级微信群/QQ群</span>布置本节课程的课后作业，巩固已学知识点</p>
        </li>
        <li>
          <p><img src="../../assets/components/payment/images/onebyone.png"></p>
          <p class="p1">一对一作业批改</p>
          <p class="p2">完成课后作业并提交后，辅导老师会<span>一对一批改作业</span>，针对性解决问题</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import baseService from '@/api/baseService'
import defaultImg from '@/assets/components/payment/images/contact-us.png'
import commonUtils from '../../utils/CommonUtils';
import store from '../../vuex/store';
export default {
  name: 'PaySuccess',
  data () {
    return {
      WEB_MODULE: global.WEB_MODULE,
      WEB_OPCODE: global.WEB_OPCODE,
      showContact: false,
      courseName: '',
      teacherCode: '',
      contact: '加入班级QQ群',
      qqUrl: defaultImg
    }
  },
  created () {
    let courseId = this.$route.query.courseId;
    let source = this.$route.query.source;
    // 埋点
    let paramsLog = {};
    paramsLog.source = source;
    paramsLog.courseId = courseId;
    commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.PAYMENT_SUCCESS, store.state.currentUser.id, paramsLog);
    this.getCourseById(courseId);
  },
  methods: {
    getCourseById (id) {
      baseService.getCourseById(id).then((response) => {
        this.courseName = response.name;
        if (response.weChatInfo && response.weChatInfo.code && response.weChatInfo.teacherName) {
          this.contact = '添加助教 ' + response.weChatInfo.teacherName + ' 老师的微信号';
          this.teacherCode = response.weChatInfo.code;
          this.showContact = true;
        } else if (response.qqInfo && response.qqInfo.code && response.qqInfo.qrCodeUrl) {
          this.teacherCode = response.qqInfo.code;
          this.qqUrl = response.qqInfo.qrCodeUrl;
          this.showContact = true;
        }
      });
    },
    toMyCourse () {
      this.$router.push({
        path: '/myCourse'
      });
    }
  }
}
</script>

<style scoped>
.pay-success{
  width: 1200px;
  margin: 20px auto 30px;
}
.course-info{
  font-size: 0;
  padding: 50px 0;
  background: #fff;
  white-space: nowrap;
  text-align: center;
}
.course-info .module{
  display: inline-block;
  width: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  vertical-align: top;
}
.course-info .left{
  border-right: 1px solid #F0F1F2;
}
.in-block{
  display: inline-block;
  vertical-align: middle;
}
.description{
  font-size: 18px;
  color: #333;
  text-align: left;
  margin-left: 15px;
}
.description .p3{
  color: #ff731f;
}
.description .p4{
  font-size: 24px;
  color: #404145;
}
.description .p4 strong{
  color: #ff6a35;
}
.description .p5{
  font-size: 16px;
  color: #999;
}
.description a{
  display: inline-block;
  width: 130px;
  line-height: 34px;
  color: #0dc2b3;
  border: 1px solid #0dc2b3;
  text-align: center;
  border-radius: 3px;
  margin-top: 5px;
}
.description a:hover{
  color: #fff;
  background: #0dc2b3;
}
.course-service{
  padding: 25px;
  background: #fff;
  margin-top: 10px;
}
.course-service > p{
  line-height: 32px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-left: 35px;
  background: url('../../assets/components/payment/images/play-icon.png') no-repeat left center;
  margin-bottom: 40px;
}
.course-service > p span{
  color: #0dc2b3;
}
.service-box{
  padding-left: 43px;
  padding-bottom: 55px;
}
.service-box li{
  display: inline-block;
  width: 232px;
  text-align: center;
  vertical-align: top;
  margin: 0 60px;
}
.service-box li p.p1{
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 30px;
  margin-bottom: 15px;
}
.service-box li p.p2{
  text-align: left;
}
.service-box li p.p2 span{
  color: #ff822e;
}
.service-box li p a{
  color: #ff822e;
  text-decoration: underline;
}
.pic-box img{
  max-width: 90px;
}
</style>
