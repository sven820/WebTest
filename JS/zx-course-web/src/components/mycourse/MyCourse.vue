<template>
  <div>
    <div class="my-course-tabwarp clearfix">
      <ul class="my-course-tabhd fl">
        <li :class="{'active': selectOne,'isHide': showTab}" @click="changeTab(0)">今日课程</li>
        <li :class="{'active': selectTwo}" @click="changeTab(1)">待上课程</li>
        <li :class="{'active': selectThree}" @click="changeTab(2)">已上课程</li>
        <li :class="{'active': selectFour}" @click="changeTab(3)">直播日历</li>
      </ul>
      <div class="download fr">
        <a :href="downloadUrl" target="_blank" class="btn">下载直播助手</a>
        <div class="box">听课前请下载并安装直播助手，安装完成后刷新浏览器，点击“正在直播”启动客户端</div>
      </div>
    </div>
    <dl class="my-course-tabbd">
      <dd :class="{'isShow': selectOne}">
        <ul class="my-course-list">
          <li v-for="course in this.todayCourses" :key="course.id">
            <div class="clearfix">
              <div class="fl">
                <p class="name clearfix"><label v-if="course.subjectName && course.subjectName.length">{{course.subjectName}}</label>  {{course.name}}</p>
                <div class="ifr">
                  <p class="time fl">时间：{{course.formatTime}}</p>
                  <span class="fl">课程进度：</span>
                  <div class="course-progress fl">
                    <el-progress :percentage="course.endRate" color="#0dc2b3" :stroke-width=6 :text-inside=true></el-progress>
                  </div>
                  <span class="progress-bar-num fl">{{course.endCount}}/{{course.periods[0].lessions.length}}</span>
                </div>
              </div>
              <router-link :to="{ path: '../chapter?courseId='+course.id }" active-class>
                <a href="javascript:void(0)" class="btn-section fr">全部章节</a>
              </router-link>
            </div>
            <div v-if="course.periods[0].lessions && course.periods[0].lessions.length" v-for="lesson in course.periods[0].lessions" :key="lesson.id">
              <div class="sub-course clearfix" v-if="lesson['isShow'] && lesson['isShow'] === true">
                <div class="fl">
                  <p class="subcourse-name">第{{lesson.sort}}讲 {{lesson.title}}</p>
                  <p class="subcourse-ifr">主讲老师：{{lesson.teacherName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：{{lesson.formatTime}}</p>
                  <p class="clearfix">
                    <a :href="attach.url" v-if="lesson.attachments && lesson.attachments.length" v-for="attach in lesson.attachments" :key="attach.id">
                      <span class="handout-name">{{attach.title}}</span>
                    </a>
                    <a :href="homework.homeworkUrl" target="_blank"
                    v-if="homeworkMap[lesson.id] && homeworkMap[lesson.id].length"
                    v-for="homework in homeworkMap[lesson.id]" :key="homework.id">
                      <span class="coursework">{{homework.name}}</span>
                    </a>
                  </p>
                </div>
                <!-- <a :href="pocketBasePath + '/online/turnToStudy?courseId=' + course.id" target="_blank" class="study fr">去学习</a> -->
                <a v-if="lesson.status === 1" :href="pocketBasePath + '/student/direct/play?lessionId=' + lesson.id + '&from=stu'" target="_blank" class="btn-study fr">进入教室</a>

                <a v-else-if="lesson.status === 11" href="javascript:void(0);"
                @click="handleJoinRoom(course.id, course.schoolId, lesson.roomInfo.studentClientToken, lesson.roomInfo.stuUrl)"  class="btn-study fr">进入教室</a>
                 <a v-else href="javascript:void(0);" class="btn-study dis fr">进入教室</a>
              </div>
            </div>
          </li>
        </ul>
      </dd>
      <!-- 待上课程 -->
      <dd :class="{'isShow': selectTwo}">
        <ul class="my-course-list" v-if="noStudyCourses && noStudyCourses.length">
          <li class="clearfix" v-for="course in this.noStudyCourses" :key="course.id">
            <div class="fl">
              <p class="name clearfix"><label v-if="course.subjectName && course.subjectName.length">{{course.subjectName}}</label> {{course.name}}</p>
              <div class="ifr">
                <p class="time fl">{{course.formatTime}}{{course.beginTime | formatDate}}</p>
                <span class="fl" v-if="course.periods[0] && course.periods[0].lessions && course.periods[0].lessions.length">课程进度：</span>
                <div class="course-progress fl" v-if="course.periods[0] && course.periods[0].lessions && course.periods[0].lessions.length">
                  <el-progress :percentage="course.endRate" color="#0dc2b3" :stroke-width=6 :text-inside=true></el-progress>
                </div>
                <span class="progress-bar-num fl" v-if="course.periods[0] && course.periods[0].lessions && course.periods[0].lessions.length">{{course.endCount}}/{{course.periods[0].lessions.length}}</span>
              </div>
            </div>
            <!-- <a :href="pocketBasePath + '/online/turnToStudy?courseId=' + course.id" target="_blank" class="study fr">去学习</a> -->
            <router-link :to="{ path: '../chapter?courseId='+course.id }">
              <a href="javascript:void(0)" class="btn-section fr">全部章节</a>
            </router-link>
          </li>
        </ul>
        <div v-else>
          <div class="nodata-pic"></div>
          <p class="nodata-txt">这里还没有课程哦～</p>
          <a href="#/home/index" class="btn-go">立即选课</a>
        </div>
      </dd>
      <!-- 已上课程 -->
      <dd :class="{'isShow': selectThree}">
        <ul class="my-course-list" v-if="studyCourses && studyCourses.length">
          <li class="clearfix"  v-for="course in this.studyCourses" :key="course.id">
            <div class="fl">
              <p class="name clearfix">
                <label v-if="course.subjectName && course.subjectName.length">{{course.subjectName}}</label> {{course.name}}
              </p>
              <div class="ifr">
                <p class="time fl">时间：{{course.formatTime}}{{course.beginTime | formatDate}}</p>
                <!-- <span class="fl">课程进度：</span>
                <div class="course-progress fl">
                  <el-progress :percentage="100" color="#0dc2b3" :stroke-width=6 :text-inside=true></el-progress>
                </div>
                <span class="progress-bar-num fl">{{course.periods[0].lessions.length}}/{{course.periods[0].lessions.length}}</span> -->
              </div>
            </div>
            <router-link :to="{ path: '../chapter?courseId='+course.id }">
              <a href="javascript:void(0)" class="btn-section fr">全部章节</a>
            </router-link>
          </li>
        </ul>
        <div v-else>
          <div class="nodata-pic"></div>
          <p class="nodata-txt">这里还没有课程哦～</p>
          <a href="#/home/index" class="btn-go">立即选课</a>
        </div>

      </dd>
      <!-- 直播日历 -->
      <dd :class="{'isShow': selectFour}">
        <div style="min-height: 300px;">
          <zx-calendar v-if="isShowCalendar" :timeList="days" :time.sync="time" :checkDay.sync="checkDay" @initmonth="initMonthData" @initday="initDayCourses"></zx-calendar>
        </div>
        <div>
        <ul class="my-course-list calendar" v-if="calendarCourses && calendarCourses.length">
          <li v-for="(course, index) in this.calendarCourses" :key="index">
            <div class="clearfix">
              <div class="fl">
                <p class="name clearfix"><label v-if="course.subjectName && course.subjectName.length">{{course.subjectName}}</label>  {{course.name}}</p>
                <div class="ifr">
                  <p class="time fl">时间：{{course.formatTime}}</p>
                  <span class="fl">课程进度：</span>
                  <div class="course-progress fl">
                    <el-progress :percentage="course.endRate" color="#0dc2b3" :time.sync="time" :stroke-width=6 :text-inside=true></el-progress>
                  </div>
                  <span class="progress-bar-num fl">{{course.endCount}}/{{course.periods[0].lessions.length}}</span>
                </div>
              </div>
              <router-link :to="{ path: '../chapter?courseId='+course.id }">
                <a href="javascript:void(0)" class="btn-section fr">全部章节</a>
              </router-link>
            </div>
            <div class="icon"></div>
            <div class="video-time">{{course.lessonTime}}</div>
          </li>
        </ul>
        <div v-else>
          <div class="nodata-pic"></div>
          <p class="nodata-txt">这里还没有课程哦～</p>
          <a href="#/home/index" class="btn-go">立即选课</a>
        </div>
        </div>
      </dd>
    </dl>

    <div v-show="isShowPagination" class="pagination-box clearfix">
      <el-pagination background @current-change="pageChange" :current-page.sync="current" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import defaultVideoImg from '@/assets/images/default/video_default_koudai.jpg'
import {formatDate} from '@/utils/FormatDate'
import Calendar from '../common/zhixue/Calendar'
export default {
  name: 'myCourse',
  components: {
    'zx-calendar': Calendar
  },
  data () {
    return {
      pocketBasePath: process.env.POCKET_BASE_PATH,
      basePath: process.env.LOGIN_PATH,
      displayDownloadTips: false,
      showTab: false,
      selectOne: true,
      selectTwo: false,
      selectThree: false,
      selectFour: false,
      courses: [],
      noStudyCourses: [],
      studyCourses: [],
      todayCourses: [],
      downloadUrl: '',
      defaultVideoImg: defaultVideoImg,
      isShowPagination: false,
      isInitPageInfo: false,
      total: 10,
      pageSize: 10,
      current: 1,
      homeworkMap: {},
      courseDate: ['2018-06-19', '2018-06-20', '2018-06-1', '2018-06-4', '2018-06-19', '2018-06-20'],
      calendarCourses: [],
      topicPackagesInfoMap: {},
      isFinishedMap: {},
      showClassMap: {},
      zlsRootUrl: '',
      homeworkRootUrl: '',
      isShowCalendar: false,
      days: [],
      checkDay: 0,
      time: 0
    }
  },
  mounted () {
    this.getDownloadUrl();
    this.getTodayCourses(1, 10);
  },
  methods: {
    // 刷新页面数据
    initDayCourses: function () {
      this.getCourseCalendar(this.checkDay);
    },

    // 月份切换
    initMonthData: function () {
      this.initCourseCalendar(this.time);
    },

    // 初始化日历
    initCourseCalendar: function (courseDate) {
      myCourseService.initCourseCalendar(courseDate).then((response) => {
        if (response && response.days) {
          this.days = response.days;
        }
        this.isShowCalendar = true;
        console.info(this.days);
        // this.initCalendar(days);
      });
    },

    // 进入直播间
    handleJoinRoom: function (courseId, schoolId, token, redirectUrl) {
      let nickname = '';
      if (this.showClassMap[courseId]) {
        if (this.classNameMap[courseId]) {
          // nickname = encodeURIComponent(this.classNameMap[courseId] + '-' + currentUser.name);
        } else {
          // nickname = encodeURIComponent(currentUser.name);
        }
      } else {
        // nickname = encodeURIComponent(currentUser.name);
      }
      var url = redirectUrl + '?token=' + token + '&nickname=' + nickname + '&uid=' + nickname + '&type=jsonp&jsonpcallback=runPlayer';
      // var url = redirectUrl + '?token=' + token + '&type=jsonp&jsonpcallback=runPlayer';
      console.info(url);
      myCourseService.handleJoinRoom(url).then((response) => {
        console.log(response.name);
      });
    },

    // tab导航切换
    changeTab: function (index) {
      if (index === 0) {
        this.selectOne = true;
        this.selectTwo = false;
        this.selectThree = false;
        this.selectFour = false;
        this.getTodayCourses(1, 10);
      } else if (index === 1) {
        this.selectOne = false;
        this.selectTwo = true;
        this.selectThree = false;
        this.selectFour = false;
        this.getStudyCourses(1, 10, 0);
      } else if (index === 2) {
        this.selectOne = false;
        this.selectTwo = false;
        this.selectThree = true;
        this.selectFour = false;
        this.getStudyCourses(1, 10, 1);
      } else if (index === 3) {
        this.isShowPagination = false;
        this.selectOne = false;
        this.selectTwo = false;
        this.selectThree = false;
        this.selectFour = true;
        let nowDate = new Date().getTime();
        this.getCourseCalendar(nowDate);
        this.initCourseCalendar(new Date().getTime());
        this.checkDay = nowDate;
        this.time = nowDate;
      }
    },

    // 获取课程日历
    getCourseCalendar: function (courseDate) {
      myCourseService.getCourseCalendar(courseDate).then((response) => {
        this.isShowPagination = false;
        if (response && response.courses) {
          this.calendarCourses = response.courses;
          let lessonIds = response.lessonIds;
          for (let i = 0; i < this.calendarCourses.length; i++) {
            let endCount = 0;
            this.calendarCourses[i].formatTime = this.formatTimeToStr(this.calendarCourses[i].beginTime, this.calendarCourses[i].endTime).join('-');
            if (this.calendarCourses[i]['periods'] && this.calendarCourses[i]['periods'][0]['lessions'] && this.calendarCourses[i]['periods'][0]['lessions'].length) {
              var lessons = this.calendarCourses[i]['periods'][0]['lessions'];
              // 循环课程小节
              for (let j = 0; j < lessons.length; j++) {
              // 计算已经结束的小节
                let time = new Date().getTime();
                if (lessons[j].endTime < time) {
                  endCount++;
                }
                if (lessonIds[i] === lessons[j].id) {
                  let time = new Date(lessons[j].beginTime)
                  let hour = time.getHours();
                  let minutes = time.getMinutes();
                  if (hour <= 9) {
                    hour = '0' + hour;
                  }
                  if (minutes <= 9) {
                    minutes = '0' + minutes;
                  }
                  this.calendarCourses[i].lessonTime = hour + ':' + minutes;
                }
              }
            }
            // 计算课程进度以及完成率
            this.calendarCourses[i].endCount = endCount;
            if (endCount === 0) {
              this.calendarCourses[i].endRate = 0;
            } else {
              this.calendarCourses[i].endRate = (endCount / this.calendarCourses[i].periods[0].lessions.length) * 100;
            }
          }
        }
      })
    },

    // 切换学科tab
    changeStudySubject: function (subjectCode, status) {
      if (status === 0) {
        this.defaultStudySubjectCode = subjectCode;
      } else if (status === 1) {
        this.defaultNoStudySubjectCode = subjectCode;
      }
      this.getStudyCourses();
    },

    // 获取待上课程/已上课程
    getStudyCourses: function (index, size, status) {
      myCourseService.getStudyCourses(index, size, status).then((response) => {
        this.courses = response.courses;
        for (let i = 0; i < this.courses.length; i++) {
          let endCount = 0;
          this.courses[i].formatTime = this.formatTimeToStr(this.courses[i].beginTime, this.courses[i].endTime).join('-');
          if (this.courses[i]['periods'] && this.courses[i]['periods'][0]['lessions'] && this.courses[i]['periods'][0]['lessions'].length) {
            var lessons = this.courses[i]['periods'][0]['lessions'];
            // 循环课程小节
            for (let j = 0; j < lessons.length; j++) {
              // 计算已经结束的小节
              let time = new Date().getTime();
              if (lessons[j].endTime < time) {
                endCount++;
              }
            }
          }
          // 计算课程进度以及完成率
          this.courses[i].endCount = endCount;
          if (endCount === 0) {
            this.courses[i].endRate = 0;
          } else {
            this.courses[i].endRate = (endCount / this.courses[i].periods[0].lessions.length) * 100;
          }
        }
        if (status === 0) {
          this.noStudyCourses = this.courses;
        } else if (status === 1) {
          this.studyCourses = this.courses;
        }
        let pageInfo = JSON.parse(response.pageInfo);
        this.total = pageInfo.totalCount;
        this.pageSize = pageInfo.pageSize;
        this.current = pageInfo.currentPage;
        this.isShowPagination = this.total > this.pageSize;
        this.isInitPageInfo = true;
      })
    },

    // 获取今日课程
    getTodayCourses: function () {
      myCourseService.getTodayCourses().then((response) => {
        this.todayCourses = response.courses;
        var lessonIds = response.lessonIds;
        this.homeworkMap = response.homeworkMap;
        this.topicPackagesInfoMap = response.topicPackagesInfoMap;
        this.isFinishedMap = response.isFinishedMap;
        this.zlsRootUrl = response.zlsRootUrl;
        this.homeworkRootUrl = response.homeworkRootUrl;
        // 处理作业跳转链接
        for (let key in this.topicPackagesInfoMap) {
          var homeworkUrl = '';
          // 自适应作业
          if (this.topicPackagesInfoMap[key][2] === 'custom_on' && this.isFinishedMap[key] === 1) {
            homeworkUrl = this.zlsRootUrl + '/zls/student/analysis/index?type=custom_on&attachParam=' + this.topicPackagesInfoMap[key][3] + '&homeworkId=' + key;
          } else if (this.topicPackagesInfoMap[key][2] === 'custom_on' && this.isFinishedMap[key] !== 1 && this.topicPackagesInfoMap[key][4] === '1') {
            homeworkUrl = this.zlsRootUrl + '/zls/student/index?type=custom_on&attachParam=' + this.topicPackagesInfoMap[key][3];
          } else if (this.topicPackagesInfoMap[key][2] !== 'custom_on' && this.isFinishedMap[key] === 1) {
            homeworkUrl = this.homeworkRootUrl + '/student/main/analysis/?topicPackId=' + this.topicPackagesInfoMap[key][0] + '&homeworkId=' + key + '&packageName=' + this.topicPackagesInfoMap[key][1];
          } else if (this.topicPackagesInfoMap[key][2] !== 'custom_on' && this.isFinishedMap[key] !== 1) {
            homeworkUrl = this.homeworkRootUrl + '/student/main/getTopics/?topicPackId=' + this.topicPackagesInfoMap[key][0] + '&homeworkId=' + key + '&packageName=' + this.topicPackagesInfoMap[key][1];
          }
          for (let k in this.homeworkMap) {
            for (let m = 0; m < this.homeworkMap[k].length; m++) {
              if (key === this.homeworkMap[k][m].id) {
                this.homeworkMap[k][m].homeworkUrl = homeworkUrl;
              }
            }
          }
        }
        for (let i = 0; i < this.todayCourses.length; i++) {
          let endCount = 0;
          this.todayCourses[i].formatTime = this.formatTimeToStr(this.todayCourses[i].beginTime, this.todayCourses[i].endTime).join('-');
          if (this.todayCourses[i]['periods'] && this.todayCourses[i]['periods'][0]['lessions'] && this.todayCourses[i]['periods'][0]['lessions'].length) {
            var lessons = this.todayCourses[i]['periods'][0]['lessions'];
            // 循环课程小节
            for (let j = 0; j < lessons.length; j++) {
              // 格式化课程时间展示
              lessons[j].formatTime = this.formatTimeToStr(lessons[j].beginTime, lessons[j].endTime).join('-');
              // 计算已经结束的小节
              let time = new Date().getTime();
              if (lessons[j].endTime < time) {
                endCount++;
              }
              // 获取课程附件
              if (lessons[j]['attachments'] && lessons[j]['attachments'].length) {
                for (let m = 0; m < lessons[j]['attachments'].length; m++) {
                  var url = lessons[j]['attachments'][m]['url'];
                  if (url) {
                    // 由于附件没有附件名称，只有附件URL,所以截取附件URL
                    var strArr = url.split('_');
                    if (strArr) {
                      lessons[j]['attachments'][m]['title'] = strArr[strArr.length - 1];
                    }
                  }
                }
              }
              for (let k = 0; k < lessonIds.length; k++) {
                if (lessons[j]['id'] === lessonIds[k]) {
                  lessons[j]['isShow'] = true;
                  continue;
                }
              }
            }
          }
          // 计算课程进度以及完成率
          this.todayCourses[i].endCount = endCount;
          if (endCount === 0) {
            this.todayCourses[i].endRate = 0;
          } else {
            this.todayCourses[i].endRate = (endCount / this.todayCourses[i].periods[0].lessions.length) * 100;
          }
        }
        // this.getLessonHomework();
        this.isShowPagination = false;
        if (!this.todayCourses || !this.todayCourses.length) {
          this.showTab = true;
          this.selectTwo = true;
          this.getStudyCourses(1, 10, 0);
        }
      })
    },

    // 分页
    pageChange: function (currentPage) {
      if (this.selectOne) {
        this.getTodayCourses(currentPage, 10);
      } else if (this.selectTwo) {
        this.getStudyCourses(currentPage, 10, 0);
      } else if (this.selectThree) {
        this.getStudyCourses(currentPage, 10, 1);
      } else if (this.selectFour) {

      }
    },

    // 格式化时间
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
          if ((bYear + bMonth + bDate) === (eYear + eMonth + eDate)) { // 同一天
            if ((bYear + bMonth + bDate) === (nowYear + nowMonth + nowDate)) { // 今天
              str1 = formatDate(beginTime, '今天 hh:mm');
              str2 = formatDate(endTime, 'hh:mm');
            } else if ((bYear + bMonth + bDate) === (nowYear + bMonth + nowDate + 1)) { // 明天
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

    // 获取下载链接
    getDownloadUrl: function () {
      myCourseService.getDownloadUrl().then((response) => {
        this.downloadUrl = response;
      })
    }
  },
  filters: {
    formatDate (time) {
      if (!time) {
        return '';
      }
      return formatDate(new Date(time), 'yyyy.MM.dd');
    },
    formatTime (time) {
      if (!time) {
        return '';
      }
      return formatDate(new Date(time), 'HH:mm');
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
.isShow{
  display: block;
}
.isHide{
  display: none;
}
.el-progress-bar{
  display: none !important;
}
.course-progress{
  width: 100px;
  margin-top: 2px;
  margin-right: 3px;
}
.el-picker-panel .el-date-picker .el-popper {
  position: absolute;
  top: 235px;
  left: 297px;
  z-index: 2027;
  display: block !important;
}
a:hover{
  color: #0dc2b3;
}
.dis {
    border-color: #e1e1e1;
    color: #c4c4c4 !important;
    cursor: default;
}
</style>
