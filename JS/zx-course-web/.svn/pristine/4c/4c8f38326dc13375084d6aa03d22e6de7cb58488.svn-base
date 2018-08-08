<template>
<div id="calendar" class="sc-calendar" ><div v-html="innerHTML"></div>
  <div class="sc-header">
    <div class="sc-actions">
      <div class="sc-mleft" @click="preHandle()">&lsaquo;</div>{{year}}年{{month}}月<div @click="nextHandle()" class="sc-mright">&rsaquo;</div>
    </div>
  </div>
  <div class="sc-body">
    <div class="sc-week">
      <div class="sc-week-item">一</div><div class="sc-week-item">二</div><div class="sc-week-item">三</div><div class="sc-week-item">四</div>
      <div class="sc-week-item">五</div><div class="sc-week-item">六</div><div class="sc-week-item">日</div>
    </div>
    <div class="sc-days">
      <div class="sc-item sc-othermenth" v-if="preDates && preDates.length" v-for="(day, index) in preDates" :key="'p'+index" title="">
        <div class="day">{{day}}</div>
      </div>
      <div class="sc-item" @click="btnChoose(index + 1)" :class="{'sc-choose': day.status === 1 || day.status === 2 ? true : false, 'sc-today': day.status === 2 || day.status === 3 ? true : false}" v-if="currDates && currDates.length" v-for="(day, index) in currDates" :key="'c'+index" title="">
        <div class="day">{{index + 1}}</div>
      </div>
      <div class="sc-item sc-othermenth" v-if="nextDates && nextDates.length" v-for="(day, index) in nextDates" :key="'n'+index" title="">
        <div class="day">{{day}}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ['timeList'],
  name: 'Calendar',
  data () {
    return {
      pocketBasePath: process.env.POCKET_BASE_PATH,
      lunarInfo: [],
      nStr1: [],
      innerHTML: '',
      year: 0,
      month: 0,
      date: 0,
      preDates: [],
      currDates: [],
      nextDates: [],
      selectedDate: {}
    }
  },
  mounted () {
    this.initView();
  },
  methods: {
    // 判断是否是闰年
    isLeapYear: function (year) {
      return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
    },

    // 获取月份天数
    getDaysInMonth: function (year, month) {
      return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
    },

    // 月份向前翻页
    preHandle: function () {
      let time = new Date(this.year, this.month - 2, this.date);
      this.initView(time);
      this.$emit('update:time', time.getTime());
      this.$emit('initmonth');
    },

    // 月份向后翻页
    nextHandle: function () {
      let time = new Date(this.year, this.month, this.date);
      this.initView(time);
      this.$emit('update:time', time.getTime);
      this.$emit('initmonth');
    },

    // 日期点击事件
    btnChoose: function (index) {
      let checkDay = new Date(this.year, this.month - 1, index);
      if (this.selectedDate.status === 2) {
        this.currDates[this.selectedDate.date - 1].status = 1;
      } else if (this.selectedDate.status === 3) {
        this.currDates[this.selectedDate.date - 1].status = 0;
      }
      if (this.currDates[index - 1].status === 0) {
        this.currDates[index - 1].status = 3;
      } else if (this.currDates[index - 1].status === 1) {
        this.currDates[index - 1].status = 2;
      }
      this.selectedDate = this.currDates[index - 1];
      this.$emit('update:checkDay', checkDay.getTime());
      this.$emit('initday');
    },

    // 初始化视图
    initView: function (time) {
      var tDate = null;
      if (time) {
        tDate = new Date(time);
      } else {
        tDate = new Date();
      }
      this.year = tDate.getFullYear();
      this.month = tDate.getMonth() + 1;
      this.date = tDate.getDate();
      var day = new Date(this.year, this.month - 1, 1);
      var week = day.getDay();
      if (week === 0) {
        week = 7;
      }
      // 获取当前月天数
      var days = this.getDaysInMonth(this.year, this.month);
      // 获取上个月天数(考虑当前月是12月份)
      var preDays = 0;
      if (this.month > 1) {
        preDays = this.getDaysInMonth(this.year, this.month - 1);
      } else {
        preDays = this.getDaysInMonth(this.year - 1, 12);
      }
      this.preDates = [];
      this.currDates = [];
      this.nextDates = [];
      for (let i = 0; i < week - 1; i++) {
        this.preDates.push(preDays - week + 1 + i);
      }
      for (let i = 0; i < days; i++) {
        console.info('this.timeList:' + this.timeList);
        // obj.status表示每一个日期展示状态 0:表示无任何变化状态；1：有课程的状态；2.表示有课程且选中的状态；3.没有课程但是选中的状态
        let obj = {};
        obj.date = i + 1;
        obj.status = 0;
        let today = new Date().getDate();
        if (this.timeList && this.timeList.length) {
          for (let j = 0; j < this.timeList.length; j++) {
            if (i === this.timeList[j] && i === today) {
              obj.status = 2;
              this.selectedDate = obj;
              break;
            } else if (i === this.timeList[j]) {
              obj.status = 1;
            }
          }
        }
        this.currDates.push(obj);
      }
      let totalCount = 35;
      if ((this.preDates.length + this.currDates.length) > 35) {
        totalCount = 42;
      }
      for (let i = 0; i < totalCount - week - days + 1; i++) {
        this.nextDates.push(i + 1);
      }
    }

  },
  filters: {

  }
}
</script>
<style src='@/assets/css/old/commom.css'>
</style>
<style src='@/assets/components/zhixue/calendar/css/calendar.css'>
</style>
