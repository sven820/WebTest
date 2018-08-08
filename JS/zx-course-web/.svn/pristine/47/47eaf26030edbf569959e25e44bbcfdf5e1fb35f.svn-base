<template>
  <div class="classroom-account clearfix">
    <div class="classroom-right-tit clearfix">
      <ul class="tag-ul">
        <li class="tag-li" :class="curIndex==1? 'on' : ''" @click="tabChange(1)">专题课优惠券</li>
        <li class="tag-li" :class="curIndex==2? 'on' : ''" @click="tabChange(2)">班课优惠券</li>
      </ul>
    </div>

    <ul class="voucher-ul mt20">
      <li :key="voucher.id" v-for="voucher in vouchers" class="voucher-li fl" :class="voucher.isPast==1? 'past' : voucher.type==1? 'zhuanti' : 'long'">
        <p class="voucher-li-top">
          <span class="icon">¥</span>
          <span class="price">{{voucher.price}}</span>

          <span v-if="voucher.subName" class="type" :title="voucher.subName + '优惠券'">{{voucher.subName}}优惠券</span>
          <template v-else>
            <span v-if="voucher.type==1" class="type">专题课优惠券</span>
            <span v-else class="type">班课优惠券</span>
          </template>
        </p>
        <p class="voucher-li-btm clearfix">
          <span class="time">截止日期：{{voucher.endTime | formatDate}}</span>
          <span class="desc">本券仅限于直播课</span>
        </p>
      </li>
      <li v-show="!vouchers || !vouchers.length" class="no-tip"><p>暂无代金券</p></li>
    </ul>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import {formatDate} from '@/utils/FormatDate'
export default {
  name: 'myVoucher',
  data () {
    return {
      curIndex: 1,
      vouchers: []
    }
  },
  components: {
  },
  mounted () {
    this.tabChange(this.curIndex);
  },
  methods: {
    tabChange: function (type) {
      this.curIndex = type;
      myCourseService.myVoucher(type).then((response) => {
        this.vouchers = response;
      })
    },
    // 处理数据
    handleVouchers: function (vouchers) {
      var size = vouchers && vouchers.length;
      let tempVouchers = [];
      let usefulVouchers = [];
      for (var i = 0; i < size; i++) {
        if (typeof vouchers[i].info === 'string') {
          var info = JSON.parse(vouchers[i].info);
          vouchers[i].price = info.reductionPrice;
          vouchers[i].endTime = info.endTime;
          var tempTime = Date.parse(info.endTime.replace(/-/g, '/'));
          var curTime = Date.parse(new Date());
          if (curTime > tempTime) {
            vouchers[i].isPast = 1;
            tempVouchers.push(vouchers[i]);
          } else {
            vouchers[i].isPast = 0;
            for (var m = 0; m < vouchers[i].count; m++) {
              usefulVouchers.push(vouchers[i]);
            }
          }
        }
      }

      var length = tempVouchers && tempVouchers.length;
      for (var j = 0; j < length; j++) {
        usefulVouchers.push(tempVouchers[j]);
      }
      return usefulVouchers;
    }
  },
  filters: {
    formatDate (time) {
      if (!time) {
        return '';
      }
      return formatDate(new Date(time), 'yyyy.MM.dd');
    }
  }
}
</script>

<style scoped>
.col3{
    color: #333;
}
.voucher-ul .no-tip{
    text-align: center;
    line-height: 200px;
    font-size: 16px;
    font-weight: bold;
    color: grey;
}
.voucher-li{
    display: block;
    width: 230px;
    height: 144px;
    margin: 0 10px 10px 0;
    background: url("http://www.zhixue.com/pocket/public/module/global/pocket/student/images/voucher-bkg-icon.png");
}
.voucher-ul .zhuanti{
    background-position: 0 0;
}
.zhuanti .type{
    color: #0d5f61;
}
.voucher-ul .long{
    background-position: -294px 0;
}
.long .type{
    color: #8f3d3e;
}
.voucher-ul .past{
    background-position: -588px 0;
}
.past .type{
    color:#979797;
}
.voucher-li .icon{
    color:#fff;
    font-size: 16px;
    margin-left: 20px;
}
.voucher-li .price{
    color: #fff;
    font-size: 50px;
}
.voucher-li .type{
    display: inline-block;
    position: absolute;
    top: 16%;
    right: 15px;
    font-size: 14px;
    width: 106px;
    height: 75px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.voucher-li-top{
    line-height: 75px;
    position: relative;
}
.voucher-li-btm{
    color: #a9a9a9;
    padding-top:8px;
    padding-left: 20px;
    font-size: 12px;
}
.voucher-li-btm .time,.voucher-li-btm .desc{
    float: left;
}
.tag-li{
  cursor: pointer;
  float: left;
  margin-right: 20px;
  font-size: 16px;
  color: #333;
  line-height: normal;
  padding-bottom: 10px;
  margin-bottom: -1px;
  margin-top: -5px;
}
.tag-ul .on,.tag-li:hover{
  color:#0dc2b3;
  border-bottom: 2px solid #0dc2b3;
}
</style>
