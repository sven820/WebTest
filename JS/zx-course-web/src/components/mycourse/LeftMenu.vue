<template>
  <div class="my_c_center fl">
    <div class="info-content">
      <div class="u_center_img">
        <img :src="userInfo.avatarUrl" width="99" height="99">
      </div>
      <div class="cover"></div>
      <p class="u_center_name">
        您好，
        <span v-if="userInfo.isParent">{{userInfo.name}}同学的家长</span>
        <span v-else>{{userInfo.name}}</span>
      </p>
      <div class="u_had_learn"><span>已学<b>{{userInfo.count}}</b>节课</span></div>
    </div>

    <dl class="c_account_tab">
      <dd>
        <router-link class="course" to="/myCourse/course">我的课程</router-link>
      </dd>
      <dd>
        <router-link class="account" to="/myCourse/buyRecord">购买记录</router-link>
      </dd>
      <dd>
        <router-link class="voucher" to="/myCourse/myVoucher">我的优惠券</router-link>
      </dd>
      <dd>
        <router-link class="address" to="/myCourse/myAddress">我的收货地址</router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import defaultAdminImg from '@/assets/images/default/admin01.jpg'
export default {
  name: 'LeftMenu',
  data () {
    return {
      defaultAdminImg: defaultAdminImg,
      userInfo: {
        name: '',
        avatarUrl: '',
        count: 0,
        isParent: false
      }
    }
  },
  mounted () {
    this.getCurrentUserInfo();
  },
  methods: {
    getCurrentUserInfo: function () {
      myCourseService.getCurrentUserInfo().then((response) => {
        this.userInfo.name = response.user.name;
        this.userInfo.avatarUrl = response.avatarUrl || defaultAdminImg;
        this.userInfo.count = response.count;
        this.userInfo.isParent = response.isParent;
      })
    }
  }
}
</script>

<style scoped>
.my_c_center{
  float: left;
  width: 245px;
  height: 100%;
}
.u_center_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 25px auto 20px;
}
.u_center_img img{
  width: 100% !important;
  height: 100% !important;
  border-radius: 50%;
}
.u_center_name{
  font-size: 16px;
  color: #999999;
  text-align: center;
}
.u_center_name span{
  color: #0dc2b3;
}
.u_had_learn{
  text-align: center;
  margin-top: 15px;
}
.u_had_learn span{
  display: inline-block;
  line-height: 24px;
  padding: 0 5px;
  font-size: 12px;
  color: #ffffff;
  background: #0dc2b3;
  border-radius: 3px;
}
.c_account_tab{
  margin-top: 50px;
  margin-bottom: 50px;
}
.c_account_tab dd a{
  display: block;
  line-height: 80px;
  font-size: 16px;
  color: #666666;
  padding-left: 110px;
  background: url("../../assets/images/old/stu-side-icon.png") no-repeat 32px -58px;
}
.c_account_tab dd:first-child a{
  background-position: 35px 18px;
}
.c_account_tab .voucher{
  background-position: 35px -144px;
}
.c_account_tab dd .address{
  display: block;
  line-height: 80px;
  font-size: 16px;
  color: #666666;
  padding-left: 110px;
  background: url("../../assets/images/old/pocket_address.png") no-repeat 38px;
}
.c_account_tab dd a:hover{
  color: #0dc2b3;
}
.c_account_tab dd a.on{
  color: #0dc2b3;
  background-color: #fff;
}
</style>
