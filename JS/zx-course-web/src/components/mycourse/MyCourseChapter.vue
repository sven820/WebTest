<template>
  <div>
  <ul class="my-course-list sc-mt">
    <li>
      <div class="clearfix">
        <div class="fl">
          <p class="name clearfix">
            <label v-if="course.subjectName && course.subjectName.length">{{course.subjectName}}</label> {{course.name}}
          </p>
          <div class="ifr">
            <p class="time fl">时间：{{course.formatTime}}</p>
            <span class="fl">课程进度：</span>
            <div class="course-progress fl">
              <el-progress :percentage="course.endRate" color="#0dc2b3" :stroke-width=6 :text-inside=true></el-progress>
            </div>
            <span class="progress-bar-num fl">{{course.endCount}}/{{course.periods[0].lessions.length}}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <div class="my-course-tabwarp clearfix ">
    <ul class="my-course-tabhd fl">
      <li :class="{'showTab': selectTabOne,'active': selectTabOne}" @click="changeTab(0)">待上小节</li>
      <li :class="{'showTab': selectTabOne,'active': selectTabTwo}" @click="changeTab(1)">已上小节</li>
    </ul>
    </div>
    <dl class="my-course-tabbd">
      <dd :class="{'showTab': selectTabOne}">
        <ul class="my-course-list sc" v-if="this.noStudyLessions && this.noStudyLessions.length">
          <li v-for="lesson in this.noStudyLessions" :key="lesson.id">
            <div class="sub-course clearfix sc">
              <div class="fl">
                <p class="subcourse-name">第{{lesson.sort}}讲 {{lesson.title}}</p>
                <p class="subcourse-ifr">主讲老师：{{lesson.teacherName}}&#12288;&#12288;时间：{{lesson.formatTime}}</p>
                 <p v-if="lesson.limitViewdCount || lesson.limitViewdTime" class="subcourse-ifr">
                  <span v-if="lesson.limitViewdCount">剩余观看次数：{{lesson.limitViewdCount}}</span>&#12288;&#12288;
                  <span v-if="lesson.limitViewdTime">剩余观看时间：{{lesson.limitViewdTime}}</span>
                </p>
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
              <a :href="pocketBasePath + '/student/direct/play?lessionId=' + lesson.id + '&from=stu'" target="_blank" class="btn-study fr">进入教室</a>
            </div>
            <div class="icon"></div>
          </li>
        </ul>
        <div v-else>
          <div class="nodata-pic"></div>
          <p class="nodata-txt">这里还没有待上小节哦～</p>
        </div>
      </dd>
      <dd :class="{'showTab': selectTabTwo}">
        <ul class="my-course-list sc" v-if="this.studyLessions && this.studyLessions.length">
          <li v-for="(lesson, index) in this.studyLessions" :key="lesson.id">
            <div class="sub-course clearfix sc">
              <div class="fl">
                <p class="subcourse-name">第{{lesson.sort}}讲 {{lesson.title}}</p>
                <p class="subcourse-ifr">主讲老师：{{lesson.teacherName}}&#12288;&#12288;时间：{{lesson.formatTime}}</p>
                <p v-if="lesson.limitViewdCount || lesson.limitViewdTime" class="subcourse-ifr">
                  <span v-if="lesson.limitViewdCount">剩余观看次数：{{lesson.limitViewdCount}}</span>&#12288;&#12288;
                  <span v-if="lesson.limitViewdTime">剩余观看时间：{{lesson.limitViewdTime}}</span>
                </p>
                <p class="clearfix">
                  <span class="handout-name" v-if="lesson.attachments && lesson.attachments.length" v-for="attach in lesson.attachments" :key="attach.id">{{attach.title}}</span>
                  <a :href="homework.homeworkUrl" target="_blank"
                    v-if="homeworkMap[lesson.id] && homeworkMap[lesson.id].length"
                    v-for="homework in homeworkMap[lesson.id]" :key="homework.id">
                    <span class="coursework">{{homework.name}}</span>
                  </a>
                </p>
              </div>
              <a href="javascript:void(0)" class="btn-video up fr" v-if="btnVideo && btnVideo.length && btnVideo[index].up === 1"  @click="displayVideoPanel(index)">观看回放<i></i></a>
              <a href="javascript:void(0)" class="btn-video fr" v-else-if="btnVideo && btnVideo.length && btnVideo[index].up === 0" :class="{'up': btnVideo[index].up}"  @click="displayVideoPanel(index)">观看回放<i></i></a>
              <a href="javascript:void(0)" class="btn-video dis fr" v-else-if="btnVideo && btnVideo.length && btnVideo[index].up === -1" :class="{'up': btnVideo[index].up}"  @click="displayVideoPanel(index)">观看回放</a>
            </div>
            <div class="playback-video" v-if="btnVideo && btnVideo.length && btnVideo[index].up === 0">
              <p class="tag">回放视频</p>
              <ul class="playback-video-ul clearfix">
                <li v-if="lesson.roomInfo && lesson.roomInfo.roomAttachment && lesson.roomInfo.roomAttachment.length" v-for="attachment in lesson.roomInfo.roomAttachment" :key="attachment.number">
                  <a :href="pocketBasePath + '/student/direct/play?lessionId=' + lesson.id + '&attachId=' +attachment.attachId" target="_blank">
                    <div class="pic"><img src="../../assets/images/default/video_default_koudai.jpg" width="123" height="83"><div class="cover"></div></div>
                    <p class="txt">{{attachment.attachName}}</p>
                  </a>
                </li>
              </ul>
            </div>
            <div class="icon"></div>
          </li>

        </ul>
        <div v-else>
          <div class="nodata-pic"></div>
          <p class="nodata-txt">这里还没有已上小节哦～</p>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import {formatDate} from '@/utils/FormatDate'
export default {
  name: 'MyCourseChapter',
  data () {
    return {
      course: {},
      selectTabOne: true,
      selectTabTwo: false,
      noStudyLessions: [],
      studyLessions: [],
      liveData: [],
      systemTime: 0,
      btnVideo: [{'up': 1}],
      pocketBasePath: process.env.POCKET_BASE_PATH,
      isUp: false,
      lessionReviewLimitDtos: []
    }
  },
  mounted () {
    // this.getOneWeekLiveCourse()

  },
  created () {
    this.courseId = this.$route.query.courseId;
    this.getCourseChapter(this.courseId);
  },
  computed: {
  },
  methods: {
    displayVideoPanel: function (index) {
      if (this.btnVideo[index].up === 1) {
        this.btnVideo[index].up = 0;
      } else if (this.btnVideo[index].up === 0) {
        this.btnVideo[index].up = 1;
      }
    },
    // 切换tab
    changeTab: function (index) {
      if (index === 0) {
        this.selectTabOne = true;
        this.selectTabTwo = false;
      } else if (index === 1) {
        this.selectTabOne = false;
        this.selectTabTwo = true;
      }
    },
    // 获取课程章节
    getCourseChapter: function (courseId) {
      myCourseService.getCourseChapter(courseId).then((response) => {
        this.studyLessions = response.studyLessions;
        this.noStudyLessions = response.noStudyLessions;
        this.course = response.course;
        this.homeworkMap = response.homeworkMap;
        this.topicPackagesInfoMap = response.topicPackagesInfoMap;
        this.isFinishedMap = response.isFinishedMap;
        this.zlsRootUrl = response.zlsRootUrl;
        this.homeworkRootUrl = response.homeworkRootUrl;
        this.lessionReviewLimitDtos = response.lessionReviewLimitDtos;
        // console.info(this.lessionReviewLimitDtos);
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
        this.course.formatTime = this.formatTimeToStr(this.course.beginTime, this.course.endTime).join('-');
        let endCount = 0;
        if (this.course['periods'] && this.course['periods'][0]['lessions'] && this.course['periods'][0]['lessions'].length) {
          var lessons = this.course['periods'][0]['lessions'];
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
        this.course.endCount = endCount;
        if (endCount === 0) {
          this.course.endRate = 0;
        } else {
          this.course.endRate = (endCount / this.course.periods[0].lessions.length) * 100;
        }

        this.btnVideo = [];

        // 初始化已上课程信息
        for (let i = 0; i < this.studyLessions.length; i++) {
          // 1、初始化小节时间
          this.studyLessions[i].formatTime = this.formatTimeToStr(this.studyLessions[i].beginTime, this.studyLessions[i].endTime).join('-');
          // 2、初始化已上课程视频播放次数限制
          for (let n = 0; n < this.lessionReviewLimitDtos.length; n++) {
            if (this.studyLessions[i].id === this.lessionReviewLimitDtos[n].lessionId) {
              this.studyLessions[i].isAllowed = this.lessionReviewLimitDtos[n].isAllowed;
              if (this.lessionReviewLimitDtos[n].leftPlayCount === -1) {
                this.studyLessions[i].limitViewdCount = '不限';
              } else if (this.lessionReviewLimitDtos[n].leftPlayCount >= 0) {
                this.studyLessions[i].limitViewdCount = this.lessionReviewLimitDtos[n].leftPlayCount;
              }
              if (this.lessionReviewLimitDtos[n].leftValidTime === -1) {
                this.studyLessions[i].limitViewdTime = '不限';
              } else if (this.lessionReviewLimitDtos[n].leftValidTime >= 0) {
                this.studyLessions[i].limitViewdTime = this.lessionReviewLimitDtos[n].leftValidTime + '分钟';
              }
            }
          }
          // 3、初始化已上课程回放按钮状态
          if (this.studyLessions[i].roomInfo && this.studyLessions[i].roomInfo.roomAttachment) {
            if (this.studyLessions[i].roomInfo.roomAttachment.length && this.studyLessions[i].isAllowed) {
              this.btnVideo.push({'up': 1});
            } else {
              this.btnVideo.push({'up': -1});
            }
          }
          // 4、初始化小节附件信息
          if (this.studyLessions[i] && this.studyLessions[i]['attachments'] && this.studyLessions[i]['attachments'].length) {
            for (let m = 0; m < this.studyLessions[i]['attachments'].length; m++) {
              var url = this.studyLessions[i]['attachments'][m]['url'];
              if (url) {
                var strArr = url.split('_');
                if (strArr) {
                  this.studyLessions[i]['attachments'][m]['title'] = strArr[strArr.length - 1];
                }
              }
            }
          }
        }

        // 初始化待上课程信息
        for (let i = 0; i < this.noStudyLessions.length; i++) {
          // 1、初始化待上课程时间格式
          this.noStudyLessions[i].formatTime = this.formatTimeToStr(this.noStudyLessions[i].beginTime, this.noStudyLessions[i].endTime).join('-');
          // 2、初始化待上课程小节附件信息
          if (this.noStudyLessions[i] && this.noStudyLessions[i]['attachments'] && this.noStudyLessions[i]['attachments'].length) {
            for (let m = 0; m < this.noStudyLessions[i]['attachments'].length; m++) {
              var urls = this.noStudyLessions[i]['attachments'][m]['url'];
              if (urls) {
                var strArrs = urls.split('_');
                if (strArrs) {
                  this.noStudyLessions[i]['attachments'][m]['title'] = strArrs[strArrs.length - 1];
                }
              }
            }
          }
          // 3、初始化视频播放次数限制
          for (let n = 0; n < this.lessionReviewLimitDtos.length; n++) {
            if (this.noStudyLessions[i].id === this.lessionReviewLimitDtos[n].lessionId) {
              if (this.lessionReviewLimitDtos[n].leftPlayCount === -1) {
                this.noStudyLessions[i].limitViewdCount = '不限';
              } else if (this.lessionReviewLimitDtos[n].leftPlayCount >= 0) {
                this.noStudyLessions[i].limitViewdCount = this.lessionReviewLimitDtos[n].leftPlayCount;
              }
              if (this.lessionReviewLimitDtos[n].leftValidTime === -1) {
                this.noStudyLessions[i].limitViewdTime = '不限';
              } else if (this.lessionReviewLimitDtos[n].leftValidTime >= 0) {
                this.noStudyLessions[i].limitViewdTime = this.lessionReviewLimitDtos[n].leftPlayCount;
              }
            }
          }
        }
      })
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
.showTab,.isShow {
  display: block;
}
.course-progress{
  width: 100px;
  margin-top: 2px;
  margin-right: 3px;
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
