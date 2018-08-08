
<template>
  <dl class="bd min-height">
      <!--课程大纲-->
      <dd>
          <ul class="outline-list mt10"  v-if="lessions.length!==0">
              <li class="clearfix" v-for="(item,index) in lessions" :key="item.id">
                  <div class="fl tit" :title="item.title">{{index+1}}.  {{item.title}}</div>
                  <div class="renew  fr"  v-if="item.status===0">已更新</div>
                  <div class="renew dis fr"  v-if="item.status===1">未更新</div>
                  <div class="time fr">{{item.beginTime | formatDate}}</div>
                  <div class="name fr">{{item.teacherName}}</div>
              </li>
          </ul>
          <div v-else>
            <ul  class="none-img"></ul>
            <p class="none-text">抱歉 暂无课程大纲哦~</p>
          </div>
      </dd>
    </dl>
</template>

<script>
import {formatDate} from '@/utils/FormatDate'
export default {
  props: ['lessions'],
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<style scoped src="@/assets/components/coursedetail/css/coursedetail.css">

</style>
