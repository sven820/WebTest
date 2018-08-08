<template>
  <div>
    <div class="course-main-bg-top">
      <!--banner模块-->
      <div class="block course-banner-main course-warpper" v-if="bannerList.length > 0">
        <el-carousel>
          <el-carousel-item v-for="(item,index) in bannerList" :key="item.id">
            <a href="javascript:;" v-on:click="openBanner(item.externalLink,item.id,index)">
              <div class="course-banner-item">
                <img :src="item.image">
              </div>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--搜索条件模块-->
      <div id="searchPanel" class="course-warpper course-search clearfix">
        <div :class="isSearchFixed ? 'course-search-fix' : ''">
          <div class="course-warpper-search">
            <div class="course-warpper-grade">
              <ul class="clearfix">
                <li :key="grade.code" v-for="grade in gradeList">
                  <a href="javascript:;" v-on:click="selectGrade(grade)" :class="grade.code == defaultGradeCode ? 'on' : ''">{{grade.name}}</a>
                </li>
              </ul>
            </div>
            <div class="course-warpper-subject">
              <ul class="clearfix">
                <li :key="subject.code" v-for="subject in subjectList">
                  <a href="javascript:;" v-on:click="selectSubject(subject)" :class="subject.code == defaultSubjectCode ? 'on' : ''">{{subject.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="course-main-bg-bottom">
      <!--推荐课程列表模块-->
      <template v-if="defaultSubjectCode === '0'">
        <template v-if="recommendCategoryTotal > 0">
          <div class="course-recomment course-warpper" v-for="(recomment,recommentIndex) in defaultCategoryList" :key="recomment.id" v-show="recomment.list.length > 0">
            <p class="course-recomment-title">{{recomment.name}}
              <a href="javascript:;" v-on:click="addMoreLog(recomment.id,recomment.name)" v-if="recomment.totalCount > 3">更多</a>
            </p>
            <div>
              <course-card :time='currentDate' :categoryId="recomment.id" :courseList='recomment.list' :gradeCode="defaultGradeCode" :subjectCode="defaultSubjectCode" :categoryIndex="recommentIndex"></course-card>
            </div>
          </div>
        </template>
        <template v-else>
          <!--暂无课程-->
          <div class="course-warpper">
            <div class="course-empty">
              <div class="course-empty-bg">
              </div>
              <p class="course-empty-tips">暂无课程</p>
            </div>
          </div>
        </template>
      </template>

      <!--学科课程列表模块-->
      <template v-if="defaultSubjectCode !== '0'">
        <template v-if="courseList.length > 0">
          <!-- 公开课 -->
          <div v-for="category in this.openSubjectCategry" :key="'open' + category.id">
            <div class="course-warpper" v-for="recomment in courseList" :key="recomment.category.id" v-if="category.id === recomment.category.id">
              <p class="course-recomment-title">{{recomment.category.name}}
                <a href="javascript:;" v-on:click="addMoreLog(recomment.category.id,recomment.category.name)" v-if="recomment.totalCount > 6 && recomment.category.id != '1'">更多</a>
              </p>
              <div>
                <course-card :time='currentDate' :categoryId="recomment.category.id" :courseList='recomment.list' :gradeCode="defaultGradeCode" :subjectCode="defaultSubjectCode" :categoryIndex="1"></course-card>
              </div>
            </div>
          </div>
          <!-- 班课用户 -->
          <div v-for="(category,recommentIndex) in this.longSubjectCategry" :key="'long' + category.id" v-if="isLongCourseUser">
            <div class="course-warpper"  v-for="(recomment) in courseList" :key="recomment.category.id" v-if="category.id === recomment.category.id">
              <p class="course-recomment-title">{{recomment.category.name}}
                <a href="javascript:;" v-on:click="addMoreLog(recomment.category.id,recomment.category.name)" v-if="recomment.totalCount > 6 && recomment.category.id != '1'">更多</a>
              </p>
              <div>
                <course-card :time='currentDate' :courseList='recomment.list' :gradeCode="defaultGradeCode" :subjectCode="defaultSubjectCode" :categoryIndex="recommentIndex"></course-card>
              </div>
            </div>
          </div>
          <!-- 非班课用户 -->
          <div v-for="(category,recommentIndex) in this.defaultSubjectCategry" :key="'default' + category.id" v-if="!isLongCourseUser">
            <div class="course-warpper" v-for="recomment in courseList" :key="recomment.category.id" v-if="category.id === recomment.category.id">
              <p class="course-recomment-title">{{recomment.category.name}}
                <a href="javascript:;" v-on:click="addMoreLog(recomment.category.id,recomment.category.name)" v-if="recomment.totalCount > 6 && recomment.category.id != '1'">更多</a>
              </p>
              <div>
                <course-card :time='currentDate' :categoryId="recomment.category.id" :courseList='recomment.list' :gradeCode="defaultGradeCode" :subjectCode="defaultSubjectCode" :categoryIndex="recommentIndex"></course-card>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <!--暂无课程-->
          <div class="course-warpper">
            <div class="course-empty">
              <div class="course-empty-bg">
              </div>
              <p class="course-empty-tips">暂无课程</p>
            </div>
          </div>
        </template>
        <!--显示更多-->
        <div v-show="loading" class="loading-box-tag"><i class="el-icon-loading"></i> 正在加载~</div>
        <div class="course-warpper" v-if="ztLength >= ztTotalCount && ztTotalCount >  0">
          <span class="course-card-more">没有更多了</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import mainService from '@/api/MainService';
import baseService from '@/api/baseService';
import {formatDate} from '@/utils/FormatDate';
import CourseCard from '../common/CourseCard';
import commonUtils from '../../utils/CommonUtils';
import store from '../../vuex/store';
export default {
  name: 'LiveBroadcastIndex',
  components: {
    'course-card': CourseCard
  },
  data () {
    return {
      msg: '口袋首页',
      isSearchFixed: false,
      defaultGradeCode: '07',
      defaultSubjectCode: '0',
      // 服务端当前时间
      currentDate: new Date(),
      bannerList: [],
      defaultCategoryList: [],
      // 推荐课程数量
      recommendCategoryTotal: 0,
      coursePhases: [],
      gradeList: [
        { name: '六年级', code: '06' },
        { name: '七年级', code: '07' },
        { name: '八年级', code: '08' },
        { name: '九年级', code: '09' },
        { name: '高一', code: '10' },
        { name: '高二', code: '11' },
        { name: '高三', code: '12' }
      ],
      subjectList: [
      ],
      defaultSubjectCategry: [
        { name: '体验课', id: '400000000' },
        { name: '系统班', id: '2' },
        { name: '专题课', id: '1' }
      ],
      longSubjectCategry: [
        { name: '系统班', id: '2' },
        { name: '专题课', id: '1' }
      ],
      openSubjectCategry: [
        { name: '公开课', id: '800000000' }
      ],
      ztTotalCount: 0,
      ztLength: 0,
      courseList: [],
      pageIndex: 1,
      pageSize: 6,
      loadingSwitch: true,
      loading: null,
      WEB_MODULE: global.WEB_MODULE,
      WEB_OPCODE: global.WEB_OPCODE
    };
  },
  mounted () {
    this.getCourseHomeData();
    window.addEventListener('scroll', this.handleScroll);
    // 增加埋点
    commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.INDEX, store.state.currentUser.id, {});
  },
  methods: {
    /**
     * 打开更多
     */
    addMoreLog: function (categoryId, categoryName) {
      var params = {};
      params.subjectCode = this.defaultSubjectCode;
      params.gradeCode = this.defaultGradeCode;
      params.categoryId = categoryId;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.INDEX_MORE, store.state.currentUser.id, params);
      // 跳转更多页面
      let path = {path: 'list', query: { categoryId: categoryId, categoryName: categoryName, gradeCode: this.defaultGradeCode, subjectCode: this.defaultSubjectCode }};
      this.$router.push(path);
    },

    /**
     * 点击banner
     */
    openBanner: function (link, bannerId, index) {
      var params = {};
      params.bannerId = bannerId;
      params.index = index;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.INDEX_BANNER, store.state.currentUser.id, params);
      if (link && link.indexOf('?') > -1) {
        link += '&source=banner';
      } else {
        link += '?source=banner';
      }
      window.location.href = link;
    },
    openFullScreen () {
      this.loading = true;
    },
    closeFullScreen () {
      this.loading = false;
    },
    handleScroll: function () {
      // 滚动条滚动高度
      let scrollTop = this.getScrollTop();
      // 判断数据是否全部加载完成
      if (this.ztLength < this.ztTotalCount) {
        // 窗口可视范围的高度
        let clientHeight = this.getClientHeight();
        // 文档内容实际高度
        let scrollHeight = this.getScrollHeight();
        // 判断是否滚动到底部
        if ((scrollTop + clientHeight + 20) >= scrollHeight) {
          if (this.defaultSubjectCode === '-1') {
            this.getSubjectCoursePage(this.defaultGradeCode, this.defaultSubjectCode, this.openSubjectCategry[0], this.pageIndex, this.pageSize);
          } else {
            this.getSubjectCoursePage(this.defaultGradeCode, this.defaultSubjectCode, this.defaultSubjectCategry[2], this.pageIndex, this.pageSize);
          }
        }
      }

      var offsetTop = document.querySelector('#searchPanel').offsetTop;
      if (scrollTop > offsetTop) {
        this.isSearchFixed = true;
      } else {
        this.isSearchFixed = false;
      }
    },
    selectGrade: function (grade) {
      this.defaultGradeCode = grade.code;
      this.pageIndex = 1;
      var condition = {
        gradeCode: this.defaultGradeCode,
        subjectCode: this.defaultSubjectCode
      };
      this.initSubjectCode();
      baseService.setSelectorCondition('index', condition);
      mainService.getCourseCategory(this.defaultGradeCode).then(response => {
        if (response.errorCode === 0 && response.result && response.result.categorys) {
          this.defaultCategoryList = response.result.categorys;
        }
        this.getCourses();
      });
      var params = {};
      params.subjectCode = this.defaultSubjectCode;
      params.gradeCode = this.defaultGradeCode;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.INDEX_GRADE, store.state.currentUser.id, params);
    },
    selectSubject: function (subject) {
      this.defaultSubjectCode = subject.code;
      this.pageIndex = 1;
      var condition = {
        gradeCode: this.defaultGradeCode,
        subjectCode: this.defaultSubjectCode
      };
      baseService.setSelectorCondition('index', condition);
      this.getCourses();
      var params = {};
      params.subjectCode = this.defaultSubjectCode;
      params.gradeCode = this.defaultGradeCode;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.INDEX_SUBJECT, store.state.currentUser.id, params);
    },
    getCourseHomeData: function () {
      mainService.getCourseHomeData().then(response => {
        if (
          response.errorCode === 0 &&
          response.result &&
          response.result.searchQuery
        ) {
          this.currentDate = new Date(response.result.currentDate);
          this.bannerList = response.result.banners;
          // 初始化grade,subject
          this.coursePhases = response.result.searchQuery.coursePhases;
          // this.categoryList = response.result.categorys;
          // 初始化筛选条件
          var condition = baseService.getSelectorCondition('index');
          if (condition && condition.gradeCode && condition.subjectCode) {
            this.defaultGradeCode = condition.gradeCode;
            this.defaultSubjectCode = condition.subjectCode;
          } else {
            this.defaultGradeCode = response.result.gradeCode;
          }
          this.initSubjectCode();
          this.isLongCourseUser = response.result.isLongCourseUser;

          mainService.getCourseCategory(this.defaultGradeCode).then(response => {
            if (response.errorCode === 0 && response.result && response.result.categorys) {
              this.defaultCategoryList = response.result.categorys;
            }
            this.getCourses();
          });
        }
      });
    },
    /**
     * 初始化学科
     */
    initSubjectCode: function () {
      this.subjectList = [
        { name: '推荐', code: '0' },
        { name: '数学', code: '02' },
        { name: '英语', code: '03' },
        { name: '物理', code: '05' },
        { name: '化学', code: '06' },
        { name: '语文', code: '01' },
        { name: '公开课', code: '-1' }
      ];
      for (let i = 0; i < this.coursePhases.length; i++) {
        for (let j = 0; j < this.coursePhases[i].courseGrades.length; j++) {
          if (this.coursePhases[i].courseGrades[j].code === this.defaultGradeCode) {
            let subjects = this.coursePhases[i].courseGrades[j].courseSubjects;
            if (subjects) {
              this.subjectList = [
                { name: '推荐', code: '0' },
                { name: '数学', code: '02' },
                { name: '英语', code: '03' },
                { name: '物理', code: '05' },
                { name: '化学', code: '06' },
                { name: '语文', code: '01' }];
              for (var k = 0; k < subjects.length; k++) {
                if (subjects[k].code !== '02' && subjects[k].code !== '03' && subjects[k].code !== '05' &&
                    subjects[k].code !== '06' && subjects[k].code !== '01' && subjects[k].code !== '-1') {
                  // 初中显示思想品德，高中显示政治
                  if (this.coursePhases[i].code === '04' && subjects[k].code === '27') {
                    subjects[k].name = '思想品德';
                  }
                  this.subjectList.push(subjects[k]);
                }
              }
              this.subjectList.push({ name: '公开课', code: '-1' });
            }
            break;
          }
        }
      }
    },
    getCourses: function () {
      // 获取具体推荐课程
      this.courseList = [];
      if (this.defaultSubjectCode === '0') {
        this.recommendCategoryTotal = 0;
        if (this.defaultCategoryList.length > 0) {
          for (var i = 0; i < this.defaultCategoryList.length; i++) {
            this.getCategoryCourseData(this.defaultGradeCode, this.defaultCategoryList[i]);
          }
        }
      } else if (this.defaultSubjectCode === '-1') {
        // 公开课
        for (var j = 0; j < this.openSubjectCategry.length; j++) {
          this.getSubjectRecommentData(this.defaultGradeCode, this.defaultSubjectCode, this.openSubjectCategry[j], 1, this.pageSize);
        }
      } else {
        if (this.isLongCourseUser) {
          // 班课用户
          for (var k = 0; k < this.longSubjectCategry.length; k++) {
            this.getSubjectRecommentData(this.defaultGradeCode, this.defaultSubjectCode, this.longSubjectCategry[k], 1, this.pageSize);
          }
        } else {
          // 非班课用户
          for (var m = 0; m < this.defaultSubjectCategry.length; m++) {
            this.getSubjectRecommentData(this.defaultGradeCode, this.defaultSubjectCode, this.defaultSubjectCategry[m], 1, this.pageSize);
          }
        }
      }
    },

    /**
     * 获取推荐课程（课程分类）
     */
    getCategoryCourseData: function (gradeCode, category) {
      // 清空数据
      category.list = [];
      category.totalCount = 0;
      mainService.getCourseRecommentData(gradeCode, '', category.id, 1, 3).then(data => {
        if (data.errorCode === 0 && data.result.totalCount > 0) {
          for (var j = 0; j < data.result.list.length; j++) {
            data.result.list[j].formatTime = commonUtils.formatTimeToStr(data.result.list[j].beginTime, data.result.list[j].endTime).join('-');
          }
          category.list = data.result.list;
          category.totalCount = data.result.totalCount;
          this.recommendCategoryTotal += data.result.totalCount;
        }
      });
    },

    /**
     * 获取具体学科推荐的课程
     */
    getSubjectRecommentData: function (gradeCode, subjectCode, category, pageIndex, pageSize) {
      this.ztTotalCount = 0;
      mainService.getCourseRecommentData(gradeCode, subjectCode, category.id, pageIndex, pageSize).then(data => {
        if (data.errorCode === 0 && data.result.totalCount > 0) {
          var categoryObj = {
            category: {},
            list: [],
            totalCount: 0
          };
          for (var j = 0; j < data.result.list.length; j++) {
            data.result.list[j].formatTime = commonUtils.formatTimeToStr(data.result.list[j].beginTime, data.result.list[j].endTime).join('-');
          }
          categoryObj.list = data.result.list;
          categoryObj.totalCount = data.result.totalCount;
          categoryObj.category = category;
          this.courseList.push(categoryObj);
          if (category.id === '1' || category.id === '800000000') {
            this.ztTotalCount = data.result.totalCount;
            this.ztLength = data.result.list.length;
            this.pageIndex++;
          }
        }
      });
    },
    getSubjectCoursePage: function (gradeCode, subjectCode, category, pageIndex, pageSize) {
      if (this.loadingSwitch) {
        this.loadingSwitch = false;
        this.ztTotalCount = 0;
        this.openFullScreen();
        mainService.getCourseRecommentData(gradeCode, subjectCode, category.id, pageIndex, pageSize).then(data => {
          if (data.errorCode === 0 && data.result.totalCount > 0) {
            for (var i = 0; i < this.courseList.length; i++) {
              if (this.courseList[i].category.id === category.id) {
                for (var k = 0; k < data.result.list.length; k++) {
                  data.result.list[k].formatTime = commonUtils.formatTimeToStr(data.result.list[k].beginTime, data.result.list[k].endTime).join('-');
                  this.courseList[i].list.push(data.result.list[k]);
                }
                this.ztLength = this.courseList[i].list.length;
                this.pageIndex++;
                break;
              }
            }
            this.ztTotalCount = data.result.totalCount;
          }
          this.closeFullScreen();
          this.loadingSwitch = true;
        }).catch(data => {
          this.loadingSwitch = true;
          this.closeFullScreen();
        });
      }
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

