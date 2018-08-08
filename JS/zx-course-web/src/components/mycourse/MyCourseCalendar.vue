<template>
  <div class="study_process">
    <ul v-if="liveData && liveData.length">
      <li :key="lession.id" v-for="lession in liveData">
        <div class="each_pro clearfix">
          <div class="study_time fl">
            <span class="now">{{lession.day}}</span><br><em>{{lession.hour}}:{{lession.minute}}</em>
          </div>
          <div class="study_con fl">
            <div class="t_col fl">
              <p class="lession-title" :title="lession.title">{{lession.title}}</p>
              <p class="ft12 col6">主讲老师：{{lession.teacherName}}</p>
            </div>
            <template v-if="lession.hasAttach">
              <template v-for="(am,index) in lession.attachments">
                <a :key="index" v-if="index==0" :href="am.url" class="attach"  target="_blank">预习讲义</a>
              </template>
            </template>
            <a v-else href="javascript:void(0);" class="attach dis">预习讲义</a>
            <a v-if="lession.status == 0" class="refuse" href="javascript:void(0);">直播未开始</a>
            <a v-else-if="lession.status == 1" class="in" target="_blank" :href="pocketBasePath + '/student/direct/play?lessionId=' + lession.id + '&from=stu'">正在直播</a>
            <a v-else-if="lession.status == 2" class="in" :href="pocketBasePath + '/online/turnToStudy?courseId=' + lession.courseId">观看回放</a>
            <a v-else class="refuse" href="javascript:void(0);">观看回放</a>
          </div>
        </div>
      </li>
    </ul>
    <p v-else class="no-lession-tip">暂时没有课程~</p>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
export default {
  name: 'LiveBroadcastIndex',
  data () {
    return {
      liveData: [],
      systemTime: 0,
      pocketBasePath: process.env.POCKET_BASE_PATH
    }
  },
  mounted () {
    this.getOneWeekLiveCourse()
  },
  computed: {
  },
  methods: {
    getOneWeekLiveCourse: function (index, size) {
      myCourseService.getOneWeekLiveCourse().then((response) => {
        this.systemTime = response.systemTime || 0
        this.liveData = this.handleLesson(response.lessions || [])
      })
    },
    // 处理课程列表数据
    handleLesson: function (lesson) {
      let size = lesson && lesson.length;
      for (let i = 0; i < size; i++) {
        let curTime = new Date();
        let lessonTime = new Date(lesson[i].beginTime);
        let tempHour = lessonTime.getHours();
        let tempMinute = lessonTime.getMinutes();
        // 优先使用系统时间，防止系统和本地时间不一致
        if (this.systemTime) {
          curTime = new Date(parseInt(this.systemTime, 10));
        }
        if (curTime.getDate() === lessonTime.getDate()) {
          lesson[i].day = '今天';
          lesson[i].hour = tempHour < 10 ? '0' + tempHour : tempHour;
          lesson[i].minute = tempMinute < 10 ? '0' + tempMinute : tempMinute;
        } else if (lessonTime.getDate() === (parseInt(curTime.getDate(), 10) + 1)) {
          lesson[i].day = '明天';
          lesson[i].hour = tempHour < 10 ? '0' + tempHour : tempHour;
          lesson[i].minute = tempMinute < 10 ? '0' + tempMinute : tempMinute;
        } else {
          let tempMonth = lessonTime.getMonth() + 1;
          let tempDay = lessonTime.getDate();
          let tempHour = lessonTime.getHours();
          let tempMinute = lessonTime.getMinutes();
          lesson[i].day = (tempMonth < 10 ? '0' + tempMonth : tempMonth) + '.' + (tempDay < 10 ? '0' + tempDay : tempDay);
          lesson[i].hour = tempHour < 10 ? '0' + tempHour : tempHour;
          lesson[i].minute = tempMinute < 10 ? '0' + tempMinute : tempMinute;
        }
        lesson[i].hasAttach = (lesson[i].attachments && lesson[i].attachments.length > 0);

        if (lesson[i].status === 2) {
          if (lesson[i].roomInfo && lesson[i].roomInfo.roomAttachment && lesson[i].roomInfo.roomAttachment.length > 0) {
            // 结束有回放
            lesson[i].status = 2;
          } else {
            // 结束无回放
            lesson[i].status = 3;
          }
        }
      }
      return lesson;
    }
  }
}
</script>

<style scoped>

</style>
