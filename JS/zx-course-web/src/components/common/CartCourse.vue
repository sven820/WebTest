<template>
  <div>
    <ul>
      <li v-for="item in courseCartList" :key="item.courseId" class="clearfix" :class="cartType==='common'?'common-item-top':''">
        <div v-if="cartType==='disabled'"><p><span class="disabledCourse">&nbsp;失效&nbsp;</span></p></div>
        <div v-else>
          <div v-if="!item.saleTime">
            <a :class="isCheck(item.courseId)?'cart_link_check':'cart_link_uncheck'" href="javascript:;" @click="checkOne(item.courseId)"></a>
          </div>
          <p v-else><span class="warm_up">&nbsp;预热&nbsp;</span></p>
        </div>
        <div class="course_cart_info" style="height: 156px;">
          <div class="course_banner fl">
            <a v-if="!item.coursePicture" target="_blank" :href="'/course/#/courseDetail?courseId='+item.courseId+'&source=5'">
              <img src="@/assets/images/old/video_default_koudai.jpg">
            </a>
            <a v-else target="_blank" :href="'/course/#/courseDetail?courseId='+item.courseId+'&source=5'">
              <img :src="item.coursePicture">
            </a>
          </div>
          <div class="course_info">
            <p><a target="_blank" :href="'/course/#/courseDetail?courseId='+item.courseId+'&source=5'" style="color: #222222">{{item.courseName}}</a></p>
            <p>开课时间：{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</p>
            <p>年级：{{item.gradeName}} &nbsp; 学科：{{item.subjectName}} &nbsp; <span v-if="item.lessionCount>1">课程次数：{{item.lessionCount}}次</span></p>
          </div>
        </div>
        <div style="font-size: 18px;color: #fa7267;">
          <span>¥</span><span>{{item.discountPrice/100}}</span>
        </div>
        <div>
          <div style="margin-left:40px;width: 20px;height:20px;">
            <a href="javascript:;">
              <img src="@/assets/images/old/cancle_cart.png" style="width: 20px;height: 20px;cursor:pointer;" @click="deleteOneCourse(item.courseId)">
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService';
import {formatDate} from '@/utils/FormatDate';
export default {
  props: {
    courseCartList: Array,
    cartType: {
      type: String,
      default: 'common'
    },
    checkedCourseIds: Array,
    checkCourseId: String
  },
  name: 'CartCourse',
  data () {
    return {
      pocketBasePath: process.env.POCKET_BASE_PATH,
      WEB_MODULE: global.WEB_MODULE,
      WEB_OPCODE: global.WEB_OPCODE
    }
  },
  created () {
  },
  filters: {
    formatDate (time) {
      if (!time) {
        return '';
      }
      return formatDate(new Date(time), 'yyyy.MM.dd');
    }
  },
  methods: {
    promptMessage (txt, type) {
      this.$message({
        message: txt,
        type: type,
        duration: 1000,
        customClass: 'vertical-center'
      });
    },
    isCheck (courseId) {
      return this.checkedCourseIds.indexOf(courseId) >= 0;
    },
    checkOne (courseId) {
      console.log('child:' + courseId);
      // 更新选中的 courseId
      this.$emit('update:checkCourseId', courseId);
      // 触发单选事件
      this.$emit('check-one');
    },
    deleteOneCourse (courseId) {
      myCourseService.removeCartCourse({
        courseId: courseId
      }).then((response) => {
        if (response.errorCode === 0) {
          this.promptMessage('移除成功！', 'success');
          // window.location.reload();
          this.$emit('delete-one');
        } else {
          this.promptMessage('移除失败，请稍后再试！', 'error');
        }
      });
    }
  }
}
</script>
<style scoped>
.common-item-top{
  border-top: 1px solid #dbdbdb;
}
</style>
<style scoped src="@/assets/css/old/my_cart.css"></style>
<style scoped src="@/assets/css/old/new_my_course.css"></style>
