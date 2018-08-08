
<template>
  <dl class="bd min-height">
      <!--名师简介-->
      <dd>
          <ul class="teacher-introduce" v-if="this.teacherList.length!==0">
              <li  v-for="(item,index) of this.teacherList" :key="index">
                  <div class="clearfix">
                      <div class="name">{{item.name}}</div>
                      <div class="praise-rate" v-if="item.desc.apprise">好评率：{{item.desc.apprise}}%</div>
                      <div class="praise-rate" v-else>好评率：98%</div>
                  </div>
                  <div class="box">
                    <div v-if="item.desc.education&&item.desc.education.length!==0">
                      <p class="tag">教学经历</p>
                      <p v-for="(pojo,index) in item.desc.education" :key="index">
                        {{pojo.time}}&#12288;{{pojo.content}}</p>
                    </div>
                    <div v-if="item.desc.introduce">
                      <p class="tag">个人介绍</p>
                      <p v-html="item.desc.introduce"></p>
                    </div>
                  </div>
              </li>
          </ul>
          <div v-else>
            <ul  class="none-img"></ul>
            <p class="none-text">抱歉 暂无名师简介哦~</p>
          </div>
      </dd>
  </dl>
</template>

<script>
export default {
  props: ['teacherList']
}
</script>

<style scoped src="@/assets/components/coursedetail/css/coursedetail.css">

</style>
