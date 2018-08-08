<template>
  <div class="my-pay-bg">
    <div class="pay-wechat">
      <div>
        <span class="title-left"></span>
        <span class="title-text">在线支付</span>
      </div>
      <div class="pay-wechat-body">
        <div class="pay-wechat-left">
          <p class="pay-wechat-zx"><img src="../../assets/components/payment/images/wechat-pay-zx.png"></p>
          <div class="pay-wechat-order">
            <p>请您及时付款，以便订单尽快处理！</p>
            <p>订单号：{{orderId}}</p>
            <p>请您在<span>12小时</span>内付清款项，否则订单会被自动取消。</p>
            <div class="pay-wechat-amount">
              <p>应付金额：<strong>{{ammount/100}}</strong>元</p>
            </div>
          </div>
        </div>
        <div class="pay-wechat-right">
          <div class="pay-wechat-qr">
            <div class="qrcode-bg">
              <div class="qrcode" id="qrcode"></div>
            </div>
          </div>
          <div class="pay-wechat-tip">
            <p><img src="../../assets/components/payment/images/wechat-pay-icon.png"></p>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import QRCode from 'qrcodejs2'
export default {
  name: 'PayWechat',
  data () {
    return {
      courseId: '',
      orderId: '',
      ammount: '',
      interval: null,
      qrUrl: '',
      qrcode: null
    }
  },
  mounted () {
    this.orderId = this.$route.query.orderId;
    if (this.orderId) {
      var options = {};
      options.orderId = this.orderId;
      myCourseService.getPaymentParams(options).then((response) => {
        if (response) {
          this.orderId = response.orderId;
          this.ammount = response.ammount;
          this.courseId = response.courseId;
          // 二维码
          this.qrcode = new QRCode(document.getElementById('qrcode'), {
            text: response.codeUrl,
            width: 164,
            height: 164,
            colorDark: '#000000',
            colorLight: '#ffffff'
          });
          let that = this;
          // 轮询查询支付状态
          this.interval = setInterval(function () {
            that.getOrderState(that);
          }, 1500);
        }
      });
    }
  },
  methods: {
    promptMessage (txt, type) {
      this.$message({
        message: txt,
        type: type,
        duration: 2000,
        customClass: 'vertical-center'
      });
    },
    getOrderState (that) {
      myCourseService.weChatOrderQuery(that.orderId).then((response) => {
        if (response) {
          switch (response['result']) {
            case 'FAIL':
              // 订单查询失败，信息可能被篡改
              break;
            case 'SUCCESS':
              // 支付成功
              clearInterval(that.interval);
              this.$router.push({
                path: '/pay/success',
                query: {
                  courseId: that.courseId
                }
              });
              break;
            case 'REFUND':
              // 转入退款
              break;
            case 'NOTPAY':
              // 未支付
              break;
            case 'REVOKED':
              // 已撤销
              clearInterval(that.interval);
              this.promptMessage('支付已取消！', 'error');
              break;
            case 'CLOSED':
              // 已关闭
              clearInterval(that.interval);
              that.promptMessage('支付失败，订单已关闭！', 'error');
              break;
            case 'USERPAYING':
              // 用户支付中
              break;
            case 'PAYERROR':
              // 支付失败
              clearInterval(that.interval);
              that.promptMessage('支付失败！', 'error');
              break;
          }
        }
      });
    }
  }
}
</script>

<style scoped src="@/assets/components/payment/css/pay-index.css">
</style>
