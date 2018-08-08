
<template>
  <dl class="bd min-height">
      <!--课程评价-->
      <dd>
          <ul class="evaluate-list mt10" v-if="customerEvalList.length!==0">
              <li  v-for="item of customerEvalList" :key="item.id">
                  <div class="clearfix">
                      <span class="name">{{item.userId}}</span>
                      <span class="time"> {{item.createTime | formatDate}}</span>
                  </div>
                  <div class="box">
                      <div class="clearfix top">
                        <div class="star-pane fl clearfix">
                                <div v-if="item.level===1">
                                  <span class="star"></span>
                                  <span class="star dis"></span>
                                  <span class="star dis"></span>
                                  <span class="star dis"></span>
                                  <span class="star dis"></span>
                                </div>
                                <div v-if="item.level===2">
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star dis"></span>
                                  <span class="star dis"></span>
                                  <span class="star dis"></span>
                                </div>
                                <div v-if="item.level===3">
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star dis"></span>
                                  <span class="star dis"></span>
                                </div>
                                <div v-if="item.level===4">
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star dis"></span>
                                </div>
                                <div v-if="item.level>=5">
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star"></span>
                                  <span class="star"></span>
                                </div>
                          </div>
                          <p class="fl tag">{{item.lessionTitle}}</p>
                      </div>
                      <p class="mt5">{{item.content}}</p>
                  </div>
              </li>
          </ul>
          <div v-else>
              <ul class="none-img"></ul>
            <p class="none-text">抱歉 暂无课程评价哦~</p>
          </div>
          <ul :class="{isdisplay:isCustomerEvalList}">
              <el-pagination background @current-change="pageChange" :current-page.sync="current" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper"></el-pagination>
          </ul>
      </dd>
  </dl>
</template>

<script>
import courseDetailService from '@/api/CourseDetailService'
import {formatDate} from '@/utils/FormatDate'
export default {
  props: ['customerEvalList', 'current', 'pageSize', 'isCustomerEvalList', 'total', 'teacherInfos'],
  methods: {
    pageChange: function (currentPage) {
      let params = {
        'index': currentPage,
        'teacherInfos': this.teacherInfos
      };
      this.initTeacherApprise(params);
    },
    // 初始化课程评价
    initTeacherApprise: function (params) {
      courseDetailService.initTeacherApprise(params).then((response) => {
        if (response.lessionAppraisePager !== null) {
          let customerEvalList = response.lessionAppraisePager.list;
          this.customerEvalList = customerEvalList;
          let pageInfo = response.pageInfo;
          if (!this.isInitPageInfo) {
            this.total = pageInfo.totalCount;
            this.pageSize = pageInfo.pageSize;
            this.current = pageInfo.firstPage;
            this.isInitPageInfo = true;
          }
          // 如果用户评价列表为空分页条隐藏
          if (customerEvalList.length > 0) {
            this.isCustomerEvalList = false;
          }
        }
      })
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<style scoped src="@/assets/components/coursedetail/css/coursedetail.css">

</style>
