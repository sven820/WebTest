<template>
  <div class="my-pay-bg">
    <div class="my-pay">
      <!--收货信息 start-->
      <div v-if="isAddressMust || isPhotoMust">
        <div>
          <span class="title-left"></span>
          <span class="title-text">收货信息</span>
        </div>
        <div class="info-inner">
          <div class="address" v-if="isAddressMust">
            <ul class="address-list">
              <li class="address-line" v-for="address in userAddresses" :key="address.id" @click="choseAddress(address.id)">
                <div style="width: 1000px">
                  <span style="width: 3%"><a :class="choseAddressId===address.id?'checked':'unchecked'" href="javascript:"></a></span>
                  <span style="width: 10%">{{address.receiver}}</span>
                  <span style="width: 13%">{{address.mobile.substr(0,3)}}****{{address.mobile.substr(-4)}}</span>
                  <span style="width: 40%">{{address.provinceName}} {{address.cityName}} {{address.districtName}} {{address.address}}</span>
                  <span style="width: 10%"><a class="modify" href="javascript:" @click="modifyAddress(address)"></a></span>
                </div>
              </li>
            </ul>
            <button class="address-btn" @click="addAddress">
              <span>添加新地址</span>
            </button>
          </div>
          <div v-else-if="isPhotoMust" class="address-phone">
            <span>手机号：</span>
            <el-input v-model="mobile" placeholder="用于接收上课提醒短信" maxlength="11"></el-input>
          </div>
        </div>
      </div>
      <!--收货信息 end-->
      <!--添加地址对话框 start-->
      <div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="720px">
          <address-form :address="addressForm" @save-success="saveAddressSuccess" ref="addressFormInit"></address-form>
        </el-dialog>
      </div>
      <!--添加地址对话框 end-->
      <!--课程信息 start-->
      <div>
        <div>
          <span class="title-left"></span>
          <span class="title-text">课程信息</span>
        </div>
        <div class="info-inner">
          <div class="courseActivity" v-for="(courses,id) in courseListMap" :key="id">
            <div class="course-item" v-for="course in courses" :key="course.courseId">
              <div class="course-inner">
                <div class="course-left">
                  <div class="course-name">课程名称：{{course.name}}</div>
                  <div class="course-info">
                    <span>上课时间：{{course.formatDateStr}}</span>
                    <span class="ml35">授课老师：</span>
                    <span :title="course.teacherStr"
                          v-text="course.teacherStr"
                          class="course-teacher">
                    </span>
                  </div>
                </div>
                <div class="course-right">
                  <div class="course-price">
                    <span>课程价格：</span>
                    <span class="course-amount"><i>¥</i>{{course.discountPrice/100}}</span>
                  </div>
                  <el-select
                    v-model="course.voucherId"
                    :disabled="!course.vouchers||course.vouchers.length===0"
                    @visible-change="savePreVoucherChange(course.voucherId)"
                    @change="handleVoucherChange(course.voucherId)"
                    size="mini"
                    class="pay-course-voucher"
                    v-if="!orderId||!orderPrice"
                  >
                    <el-option
                      value="noneUse"
                      v-show="!course.vouchers||course.vouchers.length===0"
                      label="暂无可用优惠券"
                    >
                    </el-option>
                    <el-option value="notUse" label="不使用优惠券">不使用优惠券</el-option>
                    <el-option
                      v-for="voucher in course.vouchers"
                      :key="voucher.id"
                      :value="voucher.id"
                      v-show="!useVoucherMap[voucher.id]"
                      :label="voucher.price+'元优惠券'"
                    >
                    </el-option>
                  </el-select>
                  <!-- 代金券下拉框end-->
                </div>
              </div>
            </div>
            <!--<div v-show="courses.reduceDiscount>0">-->
              <!--活动优惠：-¥<span>0</span>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <!--课程信息 end-->
      <!--订单结算 start-->
      <div>
        <div>
          <span class="title-left"></span>
          <span class="title-text">订单结算</span>
        </div>
        <div class="info-inner">
          <div class="total-price">
            <div class="price-right">
              <div>
                <div>课程总价：<i class="price-symbol">¥</i>{{totalPrice}}</div>
                <div class="price-voucher" v-if="!orderId||!orderPrice">
                  <span>代金券：-<i class="price-symbol">¥</i>{{voucherPrice}} </span><span> | </span>
                  <span v-if="activityPrice>0">活动优惠：-<i class="price-symbol">¥</i>{{activityPrice}}</span>
                  <span v-else>未参加活动</span>
                </div>
              </div>
              <div>
                <div>实付款：<span class="course-amount"><i>¥</i>{{payPrice}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--订单结算 end-->
      <div>
        <div>
          <span class="title-left"></span>
          <span class="title-text">支付方式</span>
        </div>
        <div class="info-inner">
          <div class="pay-type fl">
            <ul>
              <li>
                <a :class="payType==='alipay'?'selected':'unselected'"
                   href="javascript:void(0);"
                   @click="setPayType('alipay')">
                  <i class="check"></i>
                  <i class="icon pay1"></i>
                  <span>支付宝</span>
                </a>
              </li>
              <li>
                <a :class="payType==='wechat'?'selected':'unselected'"
                   href="javascript:void(0);"
                   @click="setPayType('wechat')">
                  <i class="check"></i>
                  <i class="icon pay2"></i>
                  <span>微信支付</span>
                </a>
              </li>
              <li>
                <a :class="payType==='bankUnion'?'selected':'unselected'"
                   href="javascript:void(0);"
                   @click="setPayType('bankUnion')">
                  <i class="check"></i>
                  <i class="icon pay3"></i>
                  <span>银联支付</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pay-submit">
        <el-button type="danger" @click="goPay" style="width:260px;">立即报名</el-button>
        <el-checkbox checked disabled class="ml10"></el-checkbox>
        <span class="buy-agreement" @click="lookAgreement">购买协议</span>
      </div>
      <!--支付反馈弹框 start-->
      <div class="feedback">
        <el-dialog :visible.sync="showFeedback" width="650px" @close="feedbackClose">
          <div>
            <div class="feedback-title">支付完成前请不要关闭此窗口！</div>
            <div class="feedback-body">
              <div class="success fl" v-show="paySuccessFlag">
                <div class="mb20">若已成功支付，请点击</div>
                <el-button type="primary" @click="isPaySuccess">支付成功</el-button>
              </div>
              <div class="repay fl">
                <div class="mb20">若支付遇到问题，您可以</div>
                <el-button type="danger" @click="rePay">重新支付</el-button>
              </div>
            </div>
            <div class="feedback-footer">
              <div class="feedback-tip">
                <span>支付有疑问，请拨打客服专线：</span>
                <span class="feedback-tel">{{hotLine}}</span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <!--支付反馈弹框 end-->
    </div>
    <a id="jumpHref" href="" target="_blank" style="visibility: hidden"></a>
  </div>
</template>

<script>
// import Vue from 'vue'
import myCourseService from '@/api/MyCourseService'
import {toDecimal, getOrderPrice} from '@/utils/Discount'
import commonUtils from '../../utils/CommonUtils';
import store from '../../vuex/store';
import AddressForm from '../common/AddressForm';
export default {
  name: 'PayIndex',
  components: {
    'address-form': AddressForm
  },
  data () {
    return {
      // 埋点参数
      WEB_MODULE: global.WEB_MODULE,
      WEB_OPCODE: global.WEB_OPCODE,
      // 全局参数
      staticPath: process.env.STATIC_PATH,
      hotLine: global.hotLine,
      // 支付方式，默认支付宝
      payType: 'alipay',
      paySuccessFlag: true,
      dialogFormVisible: false,
      showFeedback: false,
      isCityShow: true,
      isDistrictShow: true,
      // 地址必须
      isAddressMust: false,
      // 手机必须
      isPhotoMust: false,
      userAddresses: [],
      // 地址栏get请求参数
      orderId: '',
      tag: '',
      courseId: '',
      source: '',
      // 地址
      choseAddressId: '',
      // 课程
      orderPrice: 0,
      courseListMap: {},
      courseIds: [],
      courseList: [],
      voucherListMap: {},
      discountActivity: {},
      activityUserType: {},
      // 课程对应代金券:courseId 和 voucher 的映射
      voucherData: {},
      // 存储代金券change事件前的值,点击不使用代金券时从useVoucherMapz中删除记录
      saveVoucherId: '',
      // 已使用代金券
      useVoucherMap: {},
      // 结算栏
      totalPrice: 0,
      payPrice: 0,
      activityPrice: 0,
      voucherPrice: 0,
      mobile: '',
      // 地址表单
      addressForm: {},
      addressFormInit: this.$refs.addressFormInit
    }
  },
  created () {
    // this.addressFormInit = this.$refs.addressFormInit;
    this.addressForm = Object.assign({}, this.addressFormInit);
    this.tag = this.$route.query.tag;
    this.courseId = this.$route.query.courseId;
    this.orderId = this.$route.query.orderId;
    this.source = this.$route.query.source;
    let params = {};
    params.courseId = this.courseId;
    params.tag = this.tag;
    params.orderId = this.orderId;
    this.initAll(params);
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
    // 课程教师列表
    dealTeachers (lectures) {
      let list = [];
      let count = 0;
      for (let i = 0; i < lectures.length; i++) {
        if (count === 3) {
          break;
        }
        if (lectures[i].name) {
          list.push(lectures[i].name);
          count++;
        }
      }
      return list.join('、');
    },
    initAll (params) {
      myCourseService.getGoodsList(params).then((response) => {
        this.isAddressMust = response.isAddressMust;
        this.isPhotoMust = response.isPhotoMust;
        this.userAddresses = response.userAddressesList;
        if (this.isAddressMust && this.userAddresses && this.userAddresses.length > 0) {
          this.choseAddressId = this.userAddresses[0].id;
        }
        if (this.isPhotoMust && response.mobile) {
          this.mobile = response.mobile;
        }
        this.courseListMap = response.courseMap;
        this.orderPrice = response.orderPrice;
        this.courseIds = response.courseIds;
        // 埋点
        let paramsLog = {};
        paramsLog.source = this.source;
        paramsLog.courseIds = JSON.stringify(this.courseIds);
        commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.PAYMENT, store.state.currentUser.id, paramsLog);

        this.courseList = response.courseList;
        this.voucherListMap = response.voucherList;
        this.discountActivity = response.discountActivity;
        this.activityUserType = response.activityUserType;
        if (this.courseListMap) {
          this.initCourse();
        }
      })
    },
    addAddress () {
      if (this.userAddresses.length >= 5) {
        this.promptMessage('收货地址数量已达上限~', 'error');
        return;
      }
      this.addressForm = Object.assign({}, this.addressFormInit);
      this.dialogFormVisible = true;
    },
    modifyAddress (address) {
      let addressForm =
        {
          id: address.id,
          receiver: address.receiver,
          provinceId: address.provinceId,
          provinceName: address.provinceName,
          cityId: address.cityId,
          cityName: address.cityName,
          distinctId: address.districtId,
          distinctName: address.districtName,
          detail: address.address,
          mobile: address.mobile,
          isDefault: address.isDefault
        };
      this.addressForm = Object.assign({}, addressForm);
      this.dialogFormVisible = true;
    },
    // 地址保存成功后父组件刷新页面
    saveAddressSuccess () {
      this.dialogFormVisible = false;
      myCourseService.myAddress().then((response) => {
        this.userAddresses = response.userAddresses;
        this.choseAddressId = this.userAddresses[0].id;
      })
    },
    // 选择地址
    choseAddress (addressId) {
      this.choseAddressId = addressId;
    },
    /* 代金券功能 start */
    initCourse () {
      // 按顺序给课程赋予代金券
      Object.keys(this.courseListMap).forEach((key) => {
        this.courseListMap[key].forEach((course) => {
          // 课程时间
          course.formatDateStr = commonUtils.formatTimeToStr(course.beginTime, course.endTime).join('-');
          // 课程老师
          course.teacherStr = this.dealTeachers(course.lectures);
          let vouchers = this.getCourseVouchers(course.id) || [];
          course.vouchers = [];
          // 代金券
          if (this.discountActivity &&
            this.discountActivity[course.id] &&
            this.discountActivity[course.id].saleDiscount &&
            !this.discountActivity[course.id].saleDiscount.ableVoucher) {
            // 后台活动设置代金券不可用
            course.voucherId = 'noneUse';
          } else {
            if (vouchers && vouchers.length > 0) {
              course.vouchers = vouchers;
              // 有代金券且代金券没有全部被占用：
              for (let i = 0; i < vouchers.length; i++) {
                if (!this.useVoucherMap[vouchers[i].id]) {
                  // 代金券未被其他课程选择，选第一张可用的
                  course.voucherId = vouchers[i].id;
                  // 放到已使用代金券的集合里做记录
                  this.useVoucherMap[course.voucherId] = course.voucherId;
                  break;
                }
                course.voucherId = 'notUse';
              }
            } else {
              course.voucherId = 'noneUse';
            }
          }
        })
      });
      // console.log(this.courseListMap);
      // 结算价格
      this.setOrderPrice();
    },
    // 获取课程可用的代金券列表
    getCourseVouchers (courseId) {
      if (this.voucherListMap && this.voucherListMap[courseId] && this.voucherListMap[courseId].length > 0) {
        let vouchers = [];
        let voucherList = this.voucherListMap[courseId] || [];
        for (let i = 0; i < voucherList.length; i++) {
          // 未过期
          if (voucherList[i].endTime > new Date().getTime()) {
            vouchers.push(voucherList[i]);
          }
        }
        // 对vouchers进行排序，价格降序
        vouchers.sort(function (obj1, obj2) {
          if (obj1['price'] > obj2['price']) {
            return -1;
          } else if (obj1['price'] < obj2['price']) {
            return 1;
          } else {
            return 0;
          }
        });
        return vouchers;
      } else {
        return null;
      }
    },
    savePreVoucherChange (voucherId) {
      this.saveVoucherId = voucherId;
      // console.log(this.saveVoucherId);
    },
    handleVoucherChange (voucherId) {
      if (voucherId === 'notUse') {
        delete this.useVoucherMap[this.saveVoucherId];
      } else if (voucherId === 'noneUse') {
        // do nothing
      } else {
        delete this.useVoucherMap[this.saveVoucherId];
        this.useVoucherMap[voucherId] = voucherId;
      }
      console.log(this.useVoucherMap);
      // 触发视图更新
      this.useVoucherMap = Object.assign({}, this.useVoucherMap);
      // 结算价格
      this.setOrderPrice();
    },
    /* 代金券功能 end */
    setOrderPrice () {
      let voucherData = {};
      Object.keys(this.courseListMap).forEach((key) => {
        this.courseListMap[key].forEach((course) => {
          if (course.voucherId && course.voucherId !== 'notUse' && course.voucherId !== 'noneUse') {
            for (let i = 0; i < course.vouchers.length; i++) {
              if (course.vouchers[i].id === course.voucherId) {
                voucherData[course.id] = course.vouchers[i];
                break;
              }
            }
          }
        })
      });
      // console.log('voucherData:' + JSON.stringify(voucherData));
      this.voucherData = voucherData;
      let priceMap = getOrderPrice(this.courseList, this.discountActivity, voucherData, this.activityUserType);
      let price = 0;
      let reducePrice = 0;
      let reduceDiscount = 0;
      let reduceVoucherPrice = 0;
      for (let id in priceMap) {
        price += priceMap[id].price;
        reducePrice += priceMap[id].reducePrice;
        reduceDiscount += priceMap[id].reduceDiscount;
        reduceVoucherPrice += priceMap[id].price - priceMap[id].reduceDiscount - priceMap[id].reducePrice;
        if (this.orderId && this.orderPrice > 0) {
          // 屏蔽优惠
          // $("#panelDiscount_"+i).hide();
        } else {
          // 活动价格
          // reduceDiscount = toDecimal(priceMap[i].reduceDiscount);
          this.courseListMap[id].reduceDiscount = toDecimal(priceMap[id].reduceDiscount);
        }
      }
      if (this.orderId && this.orderPrice > 0) {
        // 已创建订单
        this.totalPrice = toDecimal(price);
        this.payPrice = toDecimal(this.orderPrice / 100);
      } else {
        this.totalPrice = toDecimal(price);
        this.payPrice = toDecimal(reducePrice);
        this.activityPrice = toDecimal(reduceDiscount);
        this.voucherPrice = toDecimal(reduceVoucherPrice);
      }
    },
    // 支付类型
    setPayType (type) {
      this.payType = type;
    },
    // 立即报名
    goPay () {
      if (store.state.isVisitor) {
        this.promptMessage('游客不支持购买课程哦，请先登录！', 'error');
        return false;
      }
      let options = {};
      let orderId = this.$route.query.orderId;
      if (orderId) {
        options.orderId = orderId;
      }
      let courseData = {};
      for (let i = 0; i < this.courseList.length; i++) {
        courseData[this.courseList[i].id] = '';
        if (this.voucherData[this.courseList[i].id]) {
          courseData[this.courseList[i].id] = this.voucherData[this.courseList[i].id].id;
        }
      }
      options.courseData = JSON.stringify(courseData);
      options.payType = this.payType;
      options.addressId = this.choseAddressId;
      if (!this.isAddressMust && this.isPhotoMust) {
        if (this.mobile.length < 11 || this.mobile.substr(0, 1) !== '1') {
          this.promptMessage('请填写正确的手机号码~', 'error');
          return;
        }
        options.mobile = this.mobile;
      }
      let paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseIds = JSON.stringify(this.courseIds);
      paramsLog.couserVouchers = JSON.stringify(courseData);
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.PAYMENT_BUY, store.state.currentUser.id, paramsLog);
      let newWindow;
      if (this.payPrice) {
        // 实付金额大于0
        newWindow = window.open();
      }
      myCourseService.getPaymentPage(options).then((response) => {
        if (response) {
          // 支付已关闭，直接跳成功页
          this.courseId = response.courseId;
          if (response.status === '0') {
            // 支付已关闭，直接跳成功页
            this.initCourse();
            // window.location.href = '#/pay/success?courseId=' + this.courseId;
            this.$router.push({
              path: '/pay/success',
              query: {
                courseId: this.courseId
              }
            });
            if (newWindow) {
              newWindow.close();
            }
          } else if (response.status === '1') {
            let orderId = response.orderId;
            // 待支付
            if (this.payType === 'alipay' || this.payType === 'bankUnion') {
              this.initCourse();
              newWindow.location = '#/pay/jump?orderId=' + orderId;
            } else if (this.payType === 'wechat') {
              this.initCourse();
              newWindow.location = '#/pay/wechat?orderId=' + orderId;
            }
            this.showFeedback = true;
          } else if (response.status === '2') {
            // 失败
            this.promptMessage(response.msg, 'error');
            if (newWindow) {
              newWindow.close();
            }
          } else {
            this.promptMessage('支付失败', 'error');
            if (newWindow) {
              newWindow.close();
            }
          }
        }
      });
    },
    // 查看协议
    lookAgreement () {
      let agreementUrl = this.staticPath + '/static/views/payagreement.html';
      window.open(agreementUrl);
    },
    // 订单是否支付成功
    isPaySuccess () {
      // 埋点
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.PAYMENT_BTN_SUCCESS, store.state.currentUser.id, {});
      let params = {
        'courseId': this.courseId,
        'tag': this.tag
      };
      myCourseService.isPaySuccess(params).then((isBuy) => {
        if (isBuy) {
          this.$router.push({
            path: '/pay/success',
            query: params
          });
        } else {
          // this.paySuccessFlag = false;
        }
      });
      // 产品要求即使失败，也要隐藏反馈框
      this.showFeedback = false;
      // let path = '/pay/success';
      // this.$router.push({
      //   path: path,
      //   params: params
      // });
    },
    // 重新支付
    rePay () {
      // 埋点
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.PAYMENT_BTN_REPAY, store.state.currentUser.id, {});
      this.showFeedback = false;
    },
    feedbackClose () {
      // 埋点
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.PAYMENT_BTN_CLOSE, store.state.currentUser.id, {});
    }
  }
}
</script>
<style scoped src="@/assets/components/payment/css/pay-index.css">
</style>
