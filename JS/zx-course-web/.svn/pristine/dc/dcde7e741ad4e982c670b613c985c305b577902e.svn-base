<template>
  <div class="classroom-course course-list" id="courseList">
    <ul v-if="courses && courses.length" class="clearfix">
      <li :key="course.course.id" v-for="course in courses" class="clearfix ul-li">
        <div class="pic fl ">
          <img :src="course.course.picture || defaultVideoImg" height="138" width="206">
        </div>
        <div class="ml25 fl cont">
          <p class="ft18 col3 mt5 oc_name" :title="course.course.name">{{course.course.name}}</p>
          <p class="classroom-cola mt5 ft14 oc_name">授课教师：{{course.teacherNames}}</p>
          <p class="col6 mt25 lh23">开课时间：{{course.course.beginTime | formatDate}}-{{course.course.endTime | formatDate}}</p>
          <p class="col6 mt5">
            <span v-if="course.freshDate" class="time">最近更新时间：{{course.freshDate | formatDate}}</span>
            <span v-else class="time">最近更新时间：暂未更新 </span>
          </p>
        </div>
        <a :href="pocketBasePath + '/online/turnToStudy?courseId=' + course.course.id" target="_blank" class="study fr">去学习</a>
        <div :class="course.course.formType == 1? 'taga' : course.course.formType == 2? 'tagb' : ''"></div>
      </li>
    </ul>
    <div v-show="isShowNoneData" class="classroom-course-none">
      课程列表空空如也~赶紧去选课充充饥！
      <router-link class="go-select" :to="{path:'/home/index'}">去学习</router-link>
    </div>
    <div v-show="isShowPagination" class="pagination-box clearfix">
      <el-pagination background @current-change="pageChange" :current-page.sync="current" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
// import store from '../../vuex/store'
import myCourseService from '@/api/MyCourseService'
import defaultVideoImg from '@/assets/images/default/video_default_koudai.jpg'
import {formatDate} from '@/utils/FormatDate'
export default {
  name: 'liveBroadcastIndex',
  data () {
    return {
      defaultVideoImg: defaultVideoImg,
      courses: [],
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
    this.getCourseList(1, 10);
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    getCourseList: function (index, size) {
      myCourseService.getCourseList(index, size).then((response) => {
        this.courses = response.courses;
        if (!this.isInitPageInfo) {
          let pageInfo = JSON.parse(response.pageInfo);
          this.total = pageInfo.totalCount;
          this.pageSize = pageInfo.pageSize;
          this.current = pageInfo.firstPage;
          this.isShowPagination = this.total > this.pageSize;
          this.isInitPageInfo = true;
        }
        if (!this.courses || !this.courses.length) {
          this.isShowNoneData = true;
        }
      })
    },
    pageChange: function (currentPage) {
      this.getCourseList(currentPage, 10);
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
.pagination-box >>> .el-pagination{
  float: right;
  font-weight: normal;
  padding: 25px 0 35px;
}
</style>
