<template>
  <ul class="course-card-main clearfix">
    <li class="course-card-list" v-for="(course,index) in courseList" :key="index+course.id">
      <a href="javascript:;" v-on:click="loadCourseDetail(course.id, gradeCode, subjectCode, categoryIndex, index,categoryId)">
        <p class="course-card-title" :title="course.name">
          <span v-if="course.subjectCode != -1">{{course.subjectName}}</span>
          {{course.name}}
        </p>
        <p class="course-card-time">时间：{{course.formatTime}}</p>
        <p class="course-card-teacher">
          <ul class="clearfix">
            <li v-for="teacher in course.lectures" :key="teacher.id" :title="teacher.name">
              <p v-if="teacher.avatar">
                <img class="course-card-teacher-avatar" :src="teacher.avatar">
              </p>
              <p v-else>
                <img class="course-card-teacher-avatar" src="../../assets/images/default/default-img.png">
              </p>
              <p class="course-card-teacher-name">{{teacher.name}}</p>
            </li>
          </ul>
        </p>
        <p class="course-card-line"></p>
        <div class="course-card-bottom clearfix" v-if="course.isSellOut">
          <div class="fl course-card-buy-count">
            <template v-if="course.maxJoinCount > 0">限售{{course.maxJoinCount}}人</template>
          </div>
          <div class="fr course-card-unsale">
            已售罄
          </div>
        </div>
        <div class="course-card-bottom" v-else-if="course.isLive && course.isBuy">
          <a class="course-card-join" href="javascript:;">正在上课，立即学习</a>
        </div>
        <div class="course-card-bottom" v-else-if="!course.isLive && course.isBuy">
          <div class="fl course-card-buy-count">
            <template v-if="course.maxJoinCount > 0">限售{{course.maxJoinCount}}人，</template>已有{{course.buyCount}}人报名
          </div>
          <div class="fr course-card-buy">
            已报名
          </div>
        </div>
        <div class="course-card-bottom" v-else-if="!course.isInSale">
          <div class="fl course-card-sale">
            距离开售还有<i>{{getSaleTime(time,course.saleTime)}}</i>
          </div>
          <div class="fr course-card-price">
            <i v-show="course.price != course.discountPrice">¥{{course.price/100}}</i>
            <b>¥</b>
            {{course.discountPrice/100}}
          </div>
        </div>
        <div class="course-card-bottom" v-else>
          <div class="fl course-card-buy-count">
            <template v-if="course.maxJoinCount > 0">限售{{course.maxJoinCount}}人，</template>已有{{course.buyCount}}人报名
          </div>
          <div class="fr course-card-price">
            <i v-show="course.price != course.discountPrice">¥{{course.price/100}}</i>
            <b>¥</b>
            {{course.discountPrice/100}}
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import {formatDate} from '@/utils/FormatDate';
import commonUtils from '../../utils/CommonUtils';
import store from '../../vuex/store';
export default {
  props: ['courseList', 'time', 'categoryIndex', 'source', 'gradeCode', 'subjectCode', 'categoryId'],
  name: 'CourseCard',
  data () {
    return {
      pocketBasePath: process.env.POCKET_BASE_PATH,
      WEB_MODULE: global.WEB_MODULE,
      WEB_OPCODE: global.WEB_OPCODE
    }
  },
  created () {
  },
  methods: {
    loadCourseDetail: function (courseId, gradeCode, subjectCode, categoryIndex, courseIndex, categoryId) {
      var params = {};
      params.subjectCode = subjectCode;
      params.gradeCode = gradeCode;
      params.courseId = courseId;
      params.categoryId = categoryId;
      var opCode = this.WEB_OPCODE.INDEX_CARD;
      var source = 'qbkckckp';
      if (categoryIndex !== undefined) {
        params.categoryIndex = categoryIndex;
        opCode = this.WEB_OPCODE.INDEX_CARD;
        source = 'qbkckckp';
      } else {
        opCode = this.WEB_OPCODE.CARD_MORE;
        source = 'gdkckp';
      }
      params.courseIndex = courseIndex;
      commonUtils.setLog(this.WEB_MODULE, opCode, store.state.currentUser.id, params);

      var path = {path: '/courseDetail', query: { courseId: courseId, source: source }};
      this.$router.push(path);
    },
    /**
     * 获取课程开售时间文案
     */
    getSaleTime: function (currentTime, saleTime) {
      // 时间差的毫秒数
      var date = new Date(saleTime).getTime() - currentTime.getTime();
      // 计算出相差天数
      var days = Math.floor(date / (24 * 3600 * 1000));
      // 计算出小时数
      var leave1 = date % (24 * 3600 * 1000);
      var hours = Math.floor(leave1 / (3600 * 1000));
      // 计算相差分钟数
      // var leave2 = leave1 % (3600 * 1000);
      // var minutes = Math.floor(leave2 / (60 * 1000));
      // 计算相差秒数
      // var leave3 = leave2 % (60 * 1000);
      // var seconds = Math.round(leave3 / 1000);
      return days + '天' + hours + '小时 ';
    }
  },
  filters: {
    formatDate (time) {
      if (!time) {
        return '';
      }
      return formatDate(new Date(time), 'MM-dd hh:mm:ss');
    }
  }
}
</script>
