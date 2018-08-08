
<template>
<div>
  <div v-if="this.courseList.length!==0">
  <div class="sel_course_box">
    <div class="sel_course_main" v-if="this.courseGrade!==null">
      <div class="course_single clearfix">
        <span>年级：</span>
        <ul class="select_kind">
          <li v-for="grade of this.courseGrade" :key="grade.code">
            <a :class="{on:grade.code===userGradeCode}" v-if="grade.code==='-1'">全部</a>
            <a :class="{on:grade.code===userGradeCode}" v-else @click="chooseGrade(grade.code)">{{grade.name}}</a>
          </li>
        </ul>
      </div>
      <div class="course_single clearfix">
        <span>科目：</span>
        <ul class="select_kind" v-for="grade of this.courseGrade" :key="grade.code">
            <li v-if="grade.code===userGradeCode" v-for="subject of grade.courseSubjects" :key="subject.code">
                <a :class="{on:subject.code===userSubjectCode}" v-if="subject.code==='-1'">全部</a>
                <a :class="{on:subject.code===userSubjectCode}" v-else @click="chooseSubject(grade.code,subject.code)">{{subject.name}}</a>
            </li>
        </ul>
      </div>
    </div>
  </div>
    <div class="background_list" >
      <div class="optional_curse">
        <ul class="clearfix">
            <li class="hover_shadow scale" v-for="course of this.courseList" :key="course.id">
                <a class="pll_pic" @click="toCourseDetail(course.id)">
                    <img v-if="course.picture" :src="course.picture">
                    <img v-else src="@/assets/components/schoolcenter/images/video_default_koudai.jpg">
                    <span v-if="course.gradeName !== '不限' && course.gradeName !== null
                    &&course.subjectName !== null && course.subjectName !== '不限'">
                        {{course.gradeName}}{{course.subjectName}}
                    </span>
                </a>
                <div class="oc_info">
                    <p class="oc_tit oc_name" :title="course.name">{{course.name}}</p>
                    <p class="oc_time">时间：<span class="oc_time_con">{{course.beginTime|formatDate}} - {{course.endTime|formatDate}}</span></p>
                    <p class="oc_tea oc_name">讲师：<span class="oc_tea_con oc_name" v-for="lecture of course.lectures" :key="lecture.id">{{lecture.name}}</span></p>
                    <p class="oc_price">
                        <span class="declaration">平台使用费</span>
                        <span class="discount">¥{{course.discountPrice/100}}</span>
                    </p>
                </div>
            </li>
        </ul>
      </div>
        <div class="page" :class="{visibility:isVisibility}">
          <el-pagination background @current-change="pageChange" :current-page.sync="current" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper" ></el-pagination>
        </div>
    </div>

    </div>
    <div v-else>
      <div class="correcting-waiting">
        <i></i>
          <p>努力加载中~</p>
      </div>
    </div>
</div>
</template>

<script>
import schoolCenterService from '@/api/SchoolCenter.js'
import {formatDate} from '@/utils/FormatDate'
export default {
  data () {
    return {
      isVisibility: false,
      courseGrade: [],
      userGradeCode: '',
      userSubjectCode: '',
      courseList: [],
      // 分页参数
      total: 0,
      pageSize: 0,
      current: 1

    }
  },
  mounted () {
    this.initPage();
  },
  methods: {
  // 初始化分页
    initPage: function (params) {
      schoolCenterService.initPage(params).then((response) => {
        response.courseGrade.forEach(element => {
          this.courseGrade.push(element);
        });
        this.userGradeCode = response.userGradeCode;
        this.userSubjectCode = response.userSubjectCode;
        response.courseList.forEach(element => {
          this.courseList.push(element);
        });
        let pageInfo = JSON.parse(response.pageInfo);
        this.current = pageInfo.currentPage;
        this.total = pageInfo.totalCount;
        this.pageSize = pageInfo.pageSize;
        if (this.total < 8) {
          this.isVisibility = true;
        } else {
          this.isVisibility = false;
        }
      })
    },
    // 点击年级
    chooseGrade: function (gradeCode) {
      this.courseGrade = [];
      this.courseList = [];
      let params = {
        'pageIndex': 1,
        'pageSize': 8,
        'gradeCode': gradeCode
      };
      this.initPage(params);
    },
    // 点击学科
    chooseSubject: function (gradeCode, subjectCode) {
      this.courseGrade = [];
      this.courseList = [];
      let params = {
        'pageIndex': 1,
        'pageSize': 8,
        'gradeCode': gradeCode,
        'subjectCode': subjectCode
      };
      this.initPage(params);
    },
    // 跳转课程详情页面
    toCourseDetail: function (courseId) {
      this.$router.push({
        path: '/courseDetail',
        query: {
          courseId: courseId
        }
      });
    },
    // 分页条
    pageChange: function () {
      this.courseGrade = [];
      this.courseList = [];
      let params = {
        'pageIndex': this.current,
        'pageSize': this.pageSize,
        'gradeCode': this.userGradeCode,
        'subjectCode': this.subjectCode
      };
      this.initPage(params);
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped src="@/assets/components/schoolcenter/css/schoolcenter.css">
</style>
