<template>
  <div>
    <div class="course-main-bg-bottom">
      <!--推荐课程列表模块-->
      <div class="course-recomment course-warpper">
        <p class="course-recomment-title">{{categoryName}}
        </p>
        <div>
          <ul class="course-card-main clearfix">
            <course-card  v-for="(course,index) in courseList" :time='currentDate' :course='course' :key="course.id" :courseIndex="index" :gradeCode="gradeCode" :subjectCode="subjectCode"></course-card>
          </ul>
        </div>
      </div>

      <!--显示更多-->
      <div v-show="loading" class="loading-box-tag"><i class="el-icon-loading"></i> 正在加载~</div>
      <div class="course-warpper" v-if="courseList.length >= totalCount">
        <span class="course-card-more">没有更多了</span>
      </div>
    </div>
  </div>
</template>


<script>
import mainService from '@/api/MainService';
import {formatDate} from '@/utils/FormatDate';
import CourseCard from '../common/CourseCard';
export default {
  name: 'LiveBroadcastMore',
  components: {
    'course-card': CourseCard
  },
  data () {
    return {
      msg: '口袋首页',
      courseList: [],
      totalCount: 0,
      cardSwitch: true,
      categoryName: '',
      categoryId: '',
      gradeCode: '',
      subjectCode: '',
      pageIndex: 1,
      pageSize: 6,
      // 当前时间
      currentDate: new Date(),
      fullscreenLoading: false,
      loading: null
    };
  },
  created () {
    this.categoryId = this.$route.query.categoryId;
    this.categoryName = this.$route.query.categoryName;
    this.gradeCode = this.$route.query.gradeCode;
    this.subjectCode = this.$route.query.subjectCode;
    // 初始化pageSize，防止页面没有滚动条，导致数据无法显示。
    this.getCourseRecommentData(this.gradeCode, this.subjectCode, this.categoryId);
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    openFullScreen () {
      this.loading = true;
    },
    closeFullScreen () {
      this.loading = false;
    },
    handleScroll: function () {
      // 判断数据是否全部加载完成
      if (this.courseList.length < this.totalCount) {
        // 滚动条滚动高度
        let scrollTop = this.getScrollTop();
        // 窗口可视范围的高度
        let clientHeight = this.getClientHeight();
        // 文档内容实际高度
        let scrollHeight = this.getScrollHeight();
        // 判断是否滚动到底部
        if ((scrollTop + clientHeight + 20) >= scrollHeight) {
          this.getCourseRecommentData(this.gradeCode, this.subjectCode, this.categoryId);
        }
      }
    },
    getCourseRecommentData: function (gradeCode, subjectCode, categoryId) {
      if (this.cardSwitch) {
        this.cardSwitch = false;
        this.openFullScreen();
        mainService.getCourseRecommentData(gradeCode, subjectCode, categoryId, this.pageIndex, this.pageSize).then(data => {
          if (data.errorCode === 0 && data.result.totalCount > 0) {
            for (var j = 0; j < data.result.list.length; j++) {
              data.result.list[j].formatTime = this.formatTimeToStr(data.result.list[j].beginTime, data.result.list[j].endTime).join('-');
              this.courseList.push(data.result.list[j]);
            }
            this.totalCount = data.result.totalCount;
            this.cardSwitch = true;
            this.pageIndex++;
            this.closeFullScreen();
          }
        }).catch(data => {
          this.cardSwitch = true;
          this.closeFullScreen();
        });
      }
    },
    formatTimeToStr: function (beginTime, endTime) {
      beginTime = new Date(beginTime);
      endTime = new Date(endTime);
      var now = new Date();
      var nowYear = now.getFullYear();
      var nowMonth = now.getMonth() + 1;
      var nowDate = now.getDate();

      var bYear = beginTime.getFullYear();
      var bMonth = beginTime.getMonth() + 1;
      var bDate = beginTime.getDate();

      var eYear = endTime.getFullYear();
      var eMonth = endTime.getMonth() + 1;
      var eDate = endTime.getDate();

      var str1;
      var str2;

      if (bYear !== eYear) {
        str1 = formatDate(beginTime, 'yy年MM月dd日');
        str2 = formatDate(endTime, 'yy年MM月dd日');
      } else {
        // 1.非今年
        if (bYear !== nowYear) {
          if ((bYear + bMonth + bDate) === (eYear + eMonth + eDate)) { // 某一天
            str1 = formatDate(beginTime, 'yy年MM月dd日 hh:mm');
            str2 = formatDate(endTime, 'hh:mm');
          } else { // 某几天
            str1 = formatDate(beginTime, 'yy年MM月dd日');
            str2 = formatDate(endTime, 'MM月dd日');
          }
        } else { // 今年
          if (bYear === eYear && bMonth === eMonth && bDate === eDate) { // 同一天
            if (bYear === nowYear && bMonth === nowMonth && bDate === nowDate) { // 今天
              str1 = formatDate(beginTime, '今天 hh:mm');
              str2 = formatDate(endTime, 'hh:mm');
            } else if (bYear === nowYear && bMonth === nowMonth && bDate === (nowDate + 1)) { // 明天
              str1 = formatDate(beginTime, '明天 hh:mm');
              str2 = formatDate(endTime, 'hh:mm');
            } else { // 其他
              str1 = formatDate(beginTime, 'MM月dd日 hh:mm');
              str2 = formatDate(endTime, 'hh:mm');
            }
          } else { // 某几天
            str1 = formatDate(beginTime, 'MM月dd日');
            str2 = formatDate(endTime, 'MM月dd日');
          }
        }
      }
      return [str1, str2];
    },
    /**
     * 获取日期时间的时间戳
     * @param datetime 格式为"2014-03-03 09:36:00"
     * @returns {Number} 时间戳
     */
    toTimeStamp: function (datetime) {
      var dateAndTime = datetime.split(' ');
      var date = dateAndTime[0].split('-');
      // 如果时间格式没有传递时分秒，在下面补上
      if (dateAndTime.length === 1) {
        dateAndTime.push('00:00:00');
      }
      var time = dateAndTime[1].split(':');
      return parseInt(new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]).getTime());
    },
    getClientHeight: function () {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    getScrollHeight: function () {
      return document.body.scrollHeight;
    },
    getScrollTop: function () {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    }
  },
  filters: {
    formatDate (time) {
      if (!time) {
        return '';
      }
      return formatDate(new Date(time), 'MM-dd hh:mm:ss');
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
</style>
