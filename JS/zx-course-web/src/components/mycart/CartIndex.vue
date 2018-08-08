<template>
  <div style="width: 1000px;color: #ffffff;margin: 33px auto 30px;">
    <div v-if="isEmpty" style="height: 540px;margin-top:230px;">
      <div style="text-align: center;width: 184px;height: 156px;position: relative;left: 50%;margin-left: -92px;">
        <img src="@/assets/images/old/notCart.png" style="width: 184px;height: 136px;"/>
        <p><span style="text-align: center;color: #a5a9af;font-size: 16px;">购物车空空如也，去选几门课程吧</span></p>
      </div>
    </div>
    <div v-else>
      <!--课程头部信息-->
      <div class="cart_table_thead">
        <div class="checkbox">
          <a :class="allChecked?'cart_link_check':'cart_link_uncheck'" href="javascript:;" @click="checkAll">全选</a>
        </div>
        <div class="detail">课程信息</div>
        <div class="price">价格</div>
        <div class="delete">删除</div>
      </div>
      <!--课程列表-->
      <div class="cart_course_list clearfix" style="min-height: 620px;">
        <!--1、活动课程-->
        <div v-if="courseActivitys" v-for="activity in courseActivitys" :key="activity.id">
          <div class="cart_activity_course clearfix">
            <div v-if="activity.currentDesc" class="cart_table_title">
              <p>
                <span>
                  <span v-if="activity.tag">&nbsp;{{activity.tag}}&nbsp;</span>
                  <span v-else>&nbsp;优惠活动&nbsp;</span>
                </span>
                <span>{{activity.currentDesc}}</span>
              </p>
            </div>
          </div>
          <cart-course
            :courseCartList="activity.cartItems"
            :cartType="'activity'"
            :checkedCourseIds="checkedCourseIds"
            :checkCourseId.sync="checkCourseId"
            @check-one="checkOne"
            @delete-one="deleteOne"
          >
          </cart-course>
          <div class="clearfix" style="margin: 2px 0;"></div>
        </div>
        <!--2、普通课程-->
        <div class="clearfix" v-if="commonCourseCart&&commonCourseCart.length">
          <cart-course
            :courseCartList="commonCourseCart"
            :cartType="'common'"
            :checkedCourseIds="checkedCourseIds"
            :checkCourseId.sync="checkCourseId"
            @check-one="checkOne"
            @delete-one="deleteOne"
          >
          </cart-course>
        </div>
        <!--3、失效课程-->
        <div v-if="disabledCourseCart&&disabledCourseCart.length">
          <div class="clearfix" style="border-top: 1px solid #dbdbdb;padding-top: 20px;">
            <div style="float:left;margin-left: 15px;color: #222222;font-size: 18px;font-weight: 200;"><span>失效课程</span></div>
            <div class="removeDisabledCourse">
              <span @click="removeDisabledCourse">&nbsp;清空失效课程&nbsp;</span>
            </div>
          </div>
          <div class="clearfix">
            <cart-course :courseCartList="disabledCourseCart" :cartType="'disabled'" @delete-one="deleteOne"></cart-course>
          </div>
        </div>
      </div>
      <!--结算-->
      <div class="cart_total clearfix">
        <div class="fl cart_foot" style="color: #000000;font-size: 14px;">
          <a :class="allChecked?'cart_link_check':'cart_link_uncheck'" href="javascript:;" @click="checkAll">全选</a>
        </div>
        <div><span><a style="color: #333333;" href="javascript:void(0);" @click="deleteCourses">批量删除</a></span></div>
        <div style=" font-size: 13px;color: #333333;float: left;margin-left: 325px;">
          <span v-show="totalPrice">总额：<span>{{totalPrice.toFixed(2)}}</span></span>
          <span v-show="reducePrice">优惠：<span>{{reducePrice.toFixed(2)}}</span></span>
          <span>合计：</span>
          <span>{{payPrice.toFixed(2)}}</span>
        </div>
        <div @click="goPay"><span>结&nbsp;账</span></div>
      </div>
    </div>
    <!--批量删除对话框-->
    <div class="delete_dialog_panal" v-show="isShowDeleteDialog">
      <div class="delete_dialog_background"></div>
      <div class="delete_dialog_main">
        <div>
          <p>
            <span>删除课程</span>
            <span @click="isShowDeleteDialog=false">
              <a><img src="@/assets/images/old/close-dialog.png" style="width: 12px;height: 12px;"></a>
            </span>
          </p>
        </div>
        <div>
          <p><span>确定要删除<label>{{checkedCourseIds.length||0}}</label>课程吗？</span></p>
          <p>
            <span id="sureBtn" @click="confirmDelete">确定</span>
            <span class="cancleBtn" @click="isShowDeleteDialog=false">取消</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService';
import courseDetailService from '@/api/CourseDetailService';
import CartCourse from '../common/CartCourse';
import {getOrderPrice} from '@/utils/Discount';
export default {
  name: 'MyCart',
  components: {CartCourse},
  data () {
    return {
      source: 'cart',
      isEmpty: true,
      allChecked: false,
      isShowDeleteDialog: false,

      courseActivitys: [],
      disabledCourseCart: [],
      commonCourseCart: [],
      discountActivity: {},
      voucherList: [],
      activityUserType: {},

      checkCourseId: '',
      abledCourseIds: [],
      checkedCourseIds: [],
      // 课程总价
      totalPrice: 0,
      // 优惠金额
      reducePrice: 0,
      // 实付总价
      payPrice: 0
    }
  },
  created () {
    this.init();
  },
  watch: {
    checkedCourseIds () {
      this.setPrice(this.checkedCourseIds);
    }
  },
  methods: {
    promptMessage (txt, type) {
      this.$message({
        message: txt,
        type: type,
        duration: 1000,
        customClass: 'vertical-center'
      });
    },
    init () {
      myCourseService.myCart().then((response) => {
        this.isEmpty = response.isEmpty;
        this.courseActivitys = response.courseActivitys;
        this.disabledCourseCart = response.disabledCourseCart;
        this.commonCourseCart = response.commonCourseCart;

        this.courseList = response.courseList;
        // this.voucherList = response.voucherList;
        this.discountActivity = response.discountActivity;
        this.activityUserType = response.activityUserType;

        this.courseActivitys.forEach(activity => {
          activity.cartItems.forEach(item => {
            this.abledCourseIds.push(item.courseId);
          })
        });
        this.commonCourseCart.forEach(item => {
          this.abledCourseIds.push(item.courseId);
        })
      });
    },
    // 全选
    checkAll () {
      this.allChecked = !this.allChecked;
      if (this.allChecked) {
        // 全选时
        this.checkedCourseIds = [];
        this.courseActivitys.forEach(activity => {
          activity.cartItems.forEach(item => {
            this.checkedCourseIds.push(item.courseId);
          })
        });
        this.commonCourseCart.forEach(item => {
          this.checkedCourseIds.push(item.courseId);
        })
      } else {
        this.checkedCourseIds = [];
      }
    },
    // 单选
    checkOne () {
      console.log(this.checkCourseId);
      let index = this.checkedCourseIds.indexOf(this.checkCourseId);
      if (index >= 0) {
        // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
        this.checkedCourseIds.splice(index, 1)
      } else {
        // courseId
        this.checkedCourseIds.push(this.checkCourseId)
      }
      this.allChecked = this.checkedCourseIds.length === this.abledCourseIds.length;
    },
    // 结算
    setPrice (courseIds) {
      let courses = [];
      if (courseIds != null) {
        for (let m = 0; m < courseIds.length; m++) {
          for (let n = 0; n < this.courseList.length; n++) {
            if (this.courseList[n].id === courseIds[m]) {
              courses.push(this.courseList[n]);
              break;
            }
          }
        }
      }
      let priceMap = getOrderPrice(courses, this.discountActivity, {}, this.activityUserType);
      let price = 0;
      let reducePrice = 0;
      let reduceDiscount = 0;
      // let reduceVoucherPrice = 0;
      for (let i in priceMap) {
        price += priceMap[i].price;
        reducePrice += priceMap[i].reducePrice;
        reduceDiscount += priceMap[i].reduceDiscount;
        // reduceVoucherPrice += priceMap[i].reduceVoucherPrice;
      }
      // 优惠金额
      this.reducePrice = reduceDiscount;
      // 总价
      this.totalPrice = price;
      // 实付价（合计）
      this.payPrice = reducePrice;
    },
    // 移除失效课程
    removeDisabledCourse () {
      myCourseService.removeDisabledCourse().then((response) => {
        if (response.errorCode === 0) {
          this.promptMessage('清空失效成功！', 'success');
          // window.location.reload();
          this.init();
        } else {
          this.promptMessage('清空失效失败，请稍后再试！', 'error');
        }
      });
    },
    // 删除多个课程
    deleteCourses () {
      if (this.checkedCourseIds && this.checkedCourseIds.length) {
        this.isShowDeleteDialog = true;
      } else {
        this.promptMessage('请选择删除的课程！', 'error');
      }
    },
    // 确认批量删除
    confirmDelete () {
      this.isShowDeleteDialog = false;
      if (this.checkedCourseIds && this.checkedCourseIds.length) {
        myCourseService.batchRemoveCart({
          courseIds: this.checkedCourseIds.join('|')
        }).then((response) => {
          if (response.errorCode === 0) {
            this.promptMessage('移除成功！', 'success');
            // window.location.reload();
            this.init();
          } else {
            this.promptMessage('移除失败，请稍后再试！', 'error');
          }
        });
      }
    },
    // 子组件里单个删除成功后更新
    deleteOne () {
      this.init();
    },
    // 去支付页
    goPay () {
      let params = {
        'courseIds': JSON.stringify(this.checkedCourseIds)
      };
      courseDetailService.joinAllCourse(params).then((response) => {
        if (response.errorCode === 0) {
          this.$router.push({
            path: 'pay/index',
            query: {
              tag: response.result.tag,
              source: this.source
            }
          });
        } else {
          this.promptMessage('报名失败~', 'error');
        }
      })
    }
  }
}
</script>
<style scoped src="@/assets/css/old/my_cart.css"></style>
<style scoped src="@/assets/css/old/new_my_course.css"></style>
