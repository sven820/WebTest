<template>
  <div class="classroom-account">
    <div class="classroom-right-tit clearfix">
      <div class="fl col3 ft20" style="color: #333;">购买记录</div>
      <div class="fr"></div>
    </div>
    <table>
      <tr>
          <th width="90px" class="pl10">课程形式</th>
          <th width="300px" >课程名称</th>
          <th width="80px" >学科</th>
          <th width="100px" >购买时间</th>
          <th width="100x" >课程状态</th>
          <th width="80px" >价格（元）</th>
          <th>支付状态</th>
      </tr>
      <tr :key="record.orderId + record.courseId + record.createTime" v-for="record in records">
          <td class="pl10">
            <span v-if="record.formType==1" class="types-a">直播</span>
            <span v-else-if="record.formType==2" class="types-b">录播</span>
          </td>
          <td class="oc_name">
            <a href="javascript:void(0)" style="color:#666;" :title="record.courseName">{{record.courseName}}</a>
          </td>
          <td>{{record.subjectName}}</td>
          <td>{{record.createTime | formatDate}}</td>
          <td>
            <!-- 0:未更新 1:更新中 2:已结束 -->
            <span v-if="record.status==0" class="classroom-colb">未开始</span>
            <span v-if="record.status==1" class="classroom-colb">更新中</span>
            <span v-if="record.status==2" class="classroom-colb">已结束</span>
          </td>
          <td>{{record.price / 100}}</td>
          <td v-if="record.orderStatus==0">
              <a href="javascript:;" @click="payOrderId(record.orderId, record.courseId)" class="pay" style="background: #0dc2b3">立即支付</a>
              <a @click="cancelOrder(record.orderId)" href="javascript:;" class="cancel-order" style="background: #0dc2b3">取消订单</a>
          </td>
          <td v-if="record.orderStatus==1">支付成功</td>
          <td v-if="record.orderStatus==2">支付取消</td>
          <td v-if="record.orderStatus==3">退款成功</td>
      </tr>
    </table>

    <div v-show="isShowNoneData" class="classroom-account-none">你还没有购买过课程，赶紧去首页选课吧！</div>

    <div v-show="isShowPagination" class="pagination-box clearfix">
      <el-pagination background @current-change="pageChange" :current-page.sync="current" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import {formatDate} from '@/utils/FormatDate'
export default {
  name: 'liveBroadcastIndex',
  data () {
    return {
      records: [],
      isShowPagination: false,
      isInitPageInfo: false,
      total: 10,
      pageSize: 10,
      current: 1,
      isShowNoneData: false,
      pocketBasePath: process.env.POCKET_BASE_PATH
    }
  },
  components: {
  },
  created () {
    this.getMyBuyRecord(1, 10);
  },
  methods: {
    getMyBuyRecord: function (index, size) {
      myCourseService.getMyBuyRecord(index, size).then((response) => {
        this.records = response.orders;
        if (!this.isInitPageInfo) {
          let pageInfo = response.pageInfo;
          this.total = pageInfo.totalCount;
          this.pageSize = pageInfo.pageSize;
          this.current = pageInfo.firstPage;
          this.isShowPagination = this.total > this.pageSize;
          this.isInitPageInfo = true;
        }
        if (!this.records || !this.records.length) {
          this.isShowNoneData = true;
        }
      })
    },
    pageChange: function (currentPage) {
      this.getMyBuyRecord(currentPage, 10)
    },
    payOrderId: function (orderId, courseId) {
      myCourseService.payAhead(courseId).then((response) => {
        if (response === 'success') {
          this.$message({
            message: '您已经购买了该课程哦~',
            type: 'success',
            duration: 1000
          });
        } else {
          this.$router.push({
            path: '/pay/index',
            query: {
              orderId: orderId,
              courseId: courseId
            }
          });
        }
      });
    },
    cancelOrder: function (orderId) {
      myCourseService.cancelOrder(orderId).then((response) => {
        if (response === 'success') {
          this.pageChange(this.current);
        } else {
          this.$message({
            message: '取消失败，请稍后再试~',
            type: 'error',
            duration: 1000
          });
        }
      });
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
.classroom-right-tit{
  line-height: normal;
  padding-bottom: 20px;
  margin-top: -5px;
}
.pagination-box >>> .el-pagination{
  float: right;
  font-weight: normal;
  padding: 10px 0 40px;
}
</style>
