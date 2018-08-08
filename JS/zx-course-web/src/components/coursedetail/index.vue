<template>
<div>
   <div class="course-warp background-all">
    <div class="cus-content clearfix" v-if="course && course.name">
      <div class="cus-content-main fl">
          <div class="course-ifr-top clearfix">
              <div class="buy  clearfix">
                  <div class="fl  course-introduce">
                      <div class="name clearfix">
                          <span>{{pName}}</span>&#12288;{{course.name}}
                      </div>
                      <div class="ifr">
                          <p class="course-beats" :class="{isdisplay:this.course.modeType!==2||this.lessions.length===0}">课程节数:{{this.lessions.length}}节</p>
                          <p>时间：{{formatRangeTime(course.beginTime,course.endTime)}}</p>
                          <p v-if="course.gradeName==='不限'">适合所有年级<span class="line"></span>
                          <span v-if="course.currentPress">{{course.currentPress}}</span>
                          <span v-else>适用各教材版本</span></p>
                          <p v-else>适合{{course.gradeName}}<span class="line"></span>
                          <span v-if="course.currentPress">{{course.currentPress}}</span>
                          <span v-else>适用各教材版本</span></p>
                      </div>
                      <div class="teacher clearfix">
                          <div class="fl teacher-pane" v-for="item in course.lectures" :key="item.id">
                              <img :src='defaultHeadImg' v-if="item.avatar===null">
                              <img :src='item.avatar' v-else>
                              <p>{{item.name}}</p>
                          </div>
                      </div>
                  </div>
                  <div class="fr join">
                      <p v-if="isExistActivity===1&&this.activityType==='subscribeMain'">
                        <span class="platform" :class="{isdisplay:this.course.modeType!==2}">平台使用费</span>
                        <span v-if="course.discountPrice!==finalPrice1">原价:</span>
                        <span class="cost-price" v-if="course.discountPrice!==finalPrice1">¥{{course.discountPrice | keepTwoAndPositive}}</span>
                        <span class="current-price"><i>¥</i>{{finalPrice1 | keepTwoAndPositive}}</span></p>
                      <p v-else-if="isExistActivity===1">
                        <span class="platform" :class="{isdisplay:this.course.modeType!==2}">平台使用费</span>
                        <span v-if="this.totalPrice!==this.payPrice">原价:</span>
                        <span class="cost-price" v-if="this.totalPrice!==this.payPrice">¥{{this.totalPrice | keepTwo}}</span>
                        <span class="current-price"><i>¥</i>{{this.payPrice | keepTwo}}</span></p>
                      <p v-else>
                        <span class="platform" :class="{isdisplay:this.course.modeType!==2}">平台使用费</span>
                        <span v-if="this.course.price!==this.course.discountPrice">原价:</span>
                        <span class="cost-price" v-if="this.course.price!==this.course.discountPrice">¥{{course.price | keepTwoAndPositive}}</span>
                        <span class="current-price"><i>¥</i>{{course.discountPrice | keepTwoAndPositive}}</span></p>
                      <div>
                        <span class="sale-limit" v-if="course.maxJoinCount!==0&&(course.maxJoinCount!==-1&&course.maxJoinCount!==0&&course.maxJoinCount <=course.buyCount)">限售{{course.maxJoinCount}}人</span>
                        <span v-if="isOnSale===0">0人已报名</span>
                        <span v-else v-show="!(course.maxJoinCount!==-1&&course.maxJoinCount!==0&&course.maxJoinCount <=course.buyCount)">{{course.buyCount}}人已报名</span>
                      </div>

                      <!--不在购物车-->
                      <div class="clearfix" v-if="isCourseInCart===0">
                          <div v-if="this.buy==='true'">
                              <div v-if="course.mergeStatus===2" class="btn-join">
                                <a :href="pocketBasePath + '/online/myCourse?index=1&size=10'" class="study-color" style="cursor:pointer" >去学习</a>
                              </div>
                              <div v-else class="btn-join">
                                <a :href="pocketBasePath + '/online/turnToStudy?courseId=' + course.id" target="_blank" class="study-color" style="cursor:pointer">去学习</a>
                              </div>
                            </div>
                            <div  v-else>
                              <div v-if="course.maxJoinCount===-1" class="btn-join-no">售卖时间未到</div>
                              <div v-else-if="course.maxJoinCount===0||course.maxJoinCount > course.buyCount">
                                      <div v-if="course.discountPrice===0">
                                        <div v-if="isOnSale===0" class="btn-join-no">课程未开售</div>
                                        <div v-else>
                                          <div  @click="joinCourse(course.id)" class="btn-join" style="cursor:pointer">马上报名</div>
                                        </div>
                                      </div>
                                      <div v-else>
                                        <div v-if="isOnSale===0" class="btn-join-no">课程未开售</div>
                                        <div @click="payImmediately(course.id)" v-if="isOnSale===1" class="btn-join" style="cursor:pointer">立即报名</div>
                                      </div>
                              </div>
                              <div v-else>
                                <div class="btn-join-no">名额已满</div>
                              </div>
                            </div>
                            <!-- 购物车按钮 -->
                          <div class="shopping-cart fr"
                          :class="{isdisplay:!((isExistActivity!==1||!(isExistActivity===1&&this.activityType==='subscribeMain'&&this.activityType!==null))
                          &&this.buy!=='true'&&course.discountPrice!==0&&isOnSale===1)
                          ||!(course.maxJoinCount===-1||(course.maxJoinCount === 0 || course.maxJoinCount > course.buyCount))}">
                              <a href="javascript:void(0)" class="icon cur"  @click="addToCart(course.id)"></a>

                          </div>
                      </div>
                      <!--已在购物车-->
                      <div class="clearfix" v-if="isCourseInCart===1">
                        <div v-if="this.buy==='true'">
                            <div v-if="course.mergeStatus===2" class="btn-join">
                              <a :href="pocketBasePath + '/online/myCourse?index=1&size=10'" class="study-color" style="cursor:pointer">去学习</a>
                            </div>
                            <div v-else class="btn-join">
                              <a :href="pocketBasePath + '/online/turnToStudy?courseId=' + course.id" target="_blank" class="study-color" style="cursor:pointer">去学习</a>
                            </div>
                          </div>
                          <div  v-else>
                            <div v-if="course.maxJoinCount===-1" class="btn-join-no">售卖时间未到</div>
                            <div v-else-if="course.maxJoinCount===0||course.maxJoinCount > course.buyCount">
                                <div v-if="course.discountPrice===0">
                                  <div v-if="isOnSale===0" class="btn-join-no">课程未开售</div>
                                  <div v-else>
                                    <div  @click="joinCourse(course.id)" class="btn-join" style="cursor:pointer">马上报名</div>
                                  </div>
                                </div>
                                <div v-else>
                                  <div v-if="isOnSale===0" class="btn-join-no">课程未开售</div>
                                  <div @click="payImmediately(course.id)" v-if="isOnSale===1" class="btn-join" style="cursor:pointer">立即报名</div>
                                </div>
                            </div>
                            <div v-else>
                              <div class="btn-join-no">名额已满</div>
                            </div>
                          </div>
                           <!-- 购物车按钮 -->
                          <div class="shopping-cart fr"
                          :class="{isdisplay:!((isExistActivity!==1||!(isExistActivity===1&&this.activityType==='subscribeMain'&&this.activityType!==null))
                          &&this.buy!=='true'&&course.discountPrice!==0&&isOnSale===1)
                          ||!(course.maxJoinCount===-1||(course.maxJoinCount === 0 || course.maxJoinCount > course.buyCount))}">
                              <a href="javascript:void(0)" class="icon" @click="inCartTip()"></a>
                            <div class="box" :class="{isVisibility:isCartipOn}">
                              <p>已加入购物车</p>
                              <p> 快去结算吧</p>
                            </div>
                          </div>
                      </div>
                      <!-- <div class="shopping-cart-tip" :class="{isVisibility:isCartipOn}">已成功加入购物车</div> -->
                  </div>
              </div>
              <div class="buy-union" :class="{isdisplay:!isExistActivity}" v-if="isExistActivity===1&&this.activityType==='subscribeMain'&&this.buy!=='true'">
                  <p class="tit"><span></span>暑秋联报更优惠</p>
                  <ul class="buy-union-ul">
                      <li class="clearfix"  v-for="item of relationedCourses" :key="item.id" style="cursor:pointer">
                          <div class="course-isselected-img" v-if="selecteds.indexOf(item.id)>-1" @click="chooseAllayCourse(item.id)"/>
                          <div  class="course-isnotselected-img" v-else style="cursor:pointer" @click="chooseAllayCourse(item.id)"/>
                          <div class="show-box" @click="toCourseDetail(item.id)">
                              <div class="fl">
                                  <p class="name" style="cursor:pointer">{{item.name}}</p>
                                  <p class="sub-ifr">{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}<span class="ml20">
                                    授课老师：<span v-for="pojo of item.lectures" :key="pojo.id">{{pojo.name}} </span>等</span></p>
                              </div>
                              <div class="fr price">
                                  <span>¥</span>{{item.discountPrice | keepTwoAndPositive}}
                              </div>
                          </div>
                      </li>
                  </ul>
                  <div class="total-ifr clearfix">
                      <a href="javascript:void(0)" class="fr btn-sign"  @click="joinAllCourse(course.id,selecteds)" style="cursor:pointer">全部报名</a>
                      <div class="fr">
                          <p class="total-price"><span class="name">联报总价：</span><span>¥</span><b>{{finalPrice2 | keepTwoAndPositive}}</b></p>
                          <p class="sale">已优惠：¥{{totalDiscount | keepTwoAndPositive}}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="course-ifr-tab">
            <div id="courseNav" class="course-nav">
              <div class="hd clearfix"  :class="isCourseNav? 'fixed' : ''">
                  <ul class="clearfix fl">
                      <li :class="{cur:isChoosed===1}" @click="toggleTab('courseIntro')">课程简介</li>
                      <li :class="{cur:isChoosed===2}" @click="toggleTab('courseOutline')">课程大纲</li>
                      <li :class="{cur:isChoosed===3}" @click="toggleTab('teacherIntro')">名师简介</li>
                      <li :class="{cur:isChoosed===4}" @click="toggleTab('courseEval')">课程评价</li>
                  </ul>
                  <div class="fr tab-bar" style="float:none"  :class="{isdisplay:isNavDisplay}">
                    <div v-if="this.buy==='true'">
                      <div v-if="course.mergeStatus===2" class="btn-sign fr">
                        <a :href="pocketBasePath + '/online/myCourse?index=1&size=10'" class="study-color" style="cursor:pointer">去学习</a>
                      </div>
                      <div v-else class="btn-sign fr">
                         <a :href="pocketBasePath + '/online/turnToStudy?courseId=' + course.id" target="_blank" class="study-color" style="cursor:pointer">去学习</a>
                      </div>
                    </div>
                    <div  v-else>
                      <div v-if="course.maxJoinCount===-1" class="btn-no fr">售卖时间未到</div>
                      <div v-else-if="course.maxJoinCount===0||course.maxJoinCount > course.buyCount">
                        <div v-if="course.discountPrice===0">
                          <div v-if="isOnSale===0" class="btn-no fr">课程未开售</div>
                          <div v-else>
                          <div  @click="joinCourse(course.id)" class="btn-sign fr" style="cursor:pointer">马上报名</div>
                          </div>
                        </div>
                        <div v-else>
                          <div v-if="isOnSale===0" class="btn-no fr">课程未开售</div>
                          <div @click="payImmediately(course.id)" v-if="isOnSale===1" class="btn-sign fr" style="cursor:pointer">立即报名</div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="btn-no fr">名额已满</div>
                      </div>
                    </div>
                     <!-- 当状态是立即报名时才显示购物车按钮 -->
                      <div v-if="isCourseInCart===0" @click="addToCart(course.id)"
                      :class="{isVisibility:!((isExistActivity!==1||!(isExistActivity===1&&this.activityType==='subscribeMain'&&this.activityType!==null))
                      &&this.buy!=='true'&&course.discountPrice!==0&&isOnSale===1)
                      ||!(course.maxJoinCount===-1||(course.maxJoinCount === 0 || course.maxJoinCount > course.buyCount))}">
                          <div class="cart-img-null" style="cursor:pointer"/>
                      </div>
                      <div  v-if="isCourseInCart===1"
                      :class="{isVisibility:!((isExistActivity!==1||!(isExistActivity===1&&this.activityType==='subscribeMain'&&this.activityType!==null))
                      &&this.buy!=='true'&&course.discountPrice!==0&&isOnSale===1)
                      ||!(course.maxJoinCount===-1||(course.maxJoinCount === 0 || course.maxJoinCount > course.buyCount))}">
                          <div class="cart-img-full" style="cursor:pointer"/>
                      </div>
                      <span class="fr current-price"  v-if="isExistActivity===1&&this.activityType==='subscribeMain'">¥<b>{{finalPrice1 | keepTwoAndPositive}}</b></span>
                      <span class="fr current-price" v-else-if="isExistActivity===1">¥<b>{{this.payPrice | keepTwo}}</b></span>
                      <span class="fr current-price" v-else>¥<b>{{ course.discountPrice | keepTwoAndPositive}}</b></span>
                      <span class="fr cost-price" v-show="finalPrice1!==this.course.discountPrice" v-if="isExistActivity===1&&this.activityType==='subscribeMain'">¥{{ course.discountPrice| keepTwoAndPositive}}</span>
                      <span class="fr cost-price" v-show="this.payPrice!==this.totalPrice" v-else-if="isExistActivity===1">¥{{this.totalPrice | keepTwo}}</span>
                      <span class="fr cost-price" v-show="course.discountPrice!==course.price" v-else>¥{{ course.price| keepTwoAndPositive}}</span>
                  </div>
              </div>
            </div>
          <!-- 子组件，显示不同的 tab
                is 特性动态绑定子组件
                keep-alive 将切换出去的组件保留在内存中 -->
                <courseIntro :is="currentTab" :course="course" :lessions="lessions"
                :teacherList="teacherList" :customerEvalList="customerEvalList"
                :current="current" :pageSize="pageSize" :total="total"
                :isCustomerEvalList="isCustomerEvalList" :teacherInfos="teacherInfos" keep-alive></courseIntro>
          </div>
      </div>
      <div id="rightNav" class="right-nav fr clearfix">
      <div class="lecture-notes fr" :class="isRightNav? 'fixed' : ''">
          <p class="tit">报课须知</p>
          <div class="problem">如何上课</div>
          <div class="explain">开课时间前15分钟从“我的课程”进入教室，课后无限次观看回放。</div>
          <div class="problem">付款退款方式</div>
          <div class="explain">暂不支持在网页端直接退款，如有需要可联系助教老师或拨打客服热线。</div>
          <div class="problem">遇到问题怎么办</div>
          <div class="explain">
              <p>在线咨询：<a target="_blank" @click="courseConsultBury()" href="http://wpa.qq.com/msgrd?v=3&amp;uin=3316432895&amp;site=qq&amp;menu=yes">课程咨询</a></p>
              <p>人工客服电话：4000-199-199</p>
              <p>在线及人工服务时间：</p>
              <p>周一至周五：10:00-22:00</p>
              <p>周末及节假日：8:00-22:00</p>
          </div>
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
</div>
</template>

<script>
import defaultHeadImg from '@/assets/components/coursedetail/images/defaulthead.png'
import courseDetailService from '@/api/CourseDetailService'
import commonUtils from '../../utils/CommonUtils'
import store from '../../vuex/store'
import {toDecimal, getOrderPrice} from '@/utils/Discount'
import {formatDate} from '@/utils/FormatDate'
// 引入子组件
import courseIntro from '@/components/coursedetail/courseintro.vue';
import courseOutline from '@/components/coursedetail/courseoutline.vue';
import teacherIntro from '@/components/coursedetail/teacherintro.vue';
import courseEval from '@/components/coursedetail/courseeval.vue';
export default {
  components: {
    courseIntro,
    courseOutline,
    teacherIntro,
    courseEval
  },
  data () {
    return {
      // 默认教师头像
      defaultHeadImg: defaultHeadImg,
      // tab属性
      currentTab: 'courseIntro',
      // 课程属性
      property: '',
      // 判断参数
      buy: false,
      isChoosed: 1,
      isCourseNav: false,
      isNavDisplay: true,
      isRightNav: false,
      isConsume: false,
      isOnSale: 1,
      isVisitor: true,
      isCourseInCart: 0,
      isCartipOn: true,
      isExistActivity: 1,
      // 初始化课程参数
      pName: '',
      course: {},
      relationedCourses: [],
      lessions: [],
      teacherList: [],
      teacherInfos: '',
      customerEvalList: [],
      discountInfo: [],
      // 活动类型
      activityType: '',
      // 计算活动价格参数
      finalPrice1: 0,
      finalPrice2: 0,
      selecteds: [],
      toallPrice: 0,
      totalDiscount: 0,
      // 课程评价分数参数
      total: 0,
      pageSize: 3,
      current: 1,
      isInitPageInfo: false,
      isCustomerEvalList: true,
      // 埋点参数
      pocketBasePath: process.env.POCKET_BASE_PATH,
      WEB_MODULE: global.WEB_MODULE,
      WEB_OPCODE: global.WEB_OPCODE,
      source: '',
      courseId: '',
      courseList: [],
      // 计算价格参数
      discountActivity: {},
      activityUserType: {},
      activity: {},
      userType: '',
      totalPrice: 0,
      payPrice: 0,
      activityPrice: 0
    }
  },
  watch: {
    $route () {
      this.id = this.$route.query.courseId;
      this.buy = false;
      this.course = null;
      this.relationedCourses = [];
      this.teacherList = [];
      this.discountInfo = [];
      this.customerEvalList = [];
      this.selecteds = [];
      if (this.id) {
        this.getCourseDetail(this.id);
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.courseId = this.$route.query.courseId;
    this.source = this.$route.query.source;
  },
  mounted () {
    this.setMinHeight();
    this.id = this.$route.query.courseId;
    if (this.id) {
      this.getCourseDetail(this.id);
    }
    // 页面置顶
    document.documentElement.scrollTop = 0;
    // 增加埋点
    var paramsLog = {};
    paramsLog.source = this.source;
    paramsLog.courseId = this.courseId;
    commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL, store.state.currentUser.id, paramsLog);
  },
  methods: {
    formatRangeTime: function (beginTime, endTime) {
      return commonUtils.formatTimeToStr(beginTime, endTime).join('-');
    },
    /**
     * 滚动条滚动事件
     */
    handleScroll () {
      // 导航条固定
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var courseNav = document.querySelector('#courseNav');
      if (courseNav) {
        var offsetTop = courseNav.offsetTop;
        if (scrollTop > offsetTop) {
          this.isCourseNav = true;
          this.isNavDisplay = false;
        } else {
          this.isCourseNav = false;
          this.isNavDisplay = true;
        }
      }

      // 右侧报名须知固定
      var rightNav = document.querySelector('#rightNav');
      if (rightNav) {
        var rightOffsetTop = rightNav.offsetTop;
        if (scrollTop > rightOffsetTop) {
          this.isRightNav = true;
        } else {
          this.isRightNav = false;
        }
      }
    },
    getCourseDetail: function (courseId) {
      courseDetailService.getCourseDetail(courseId).then((response) => {
        if (response.pName === '体验课' || response.pName === '公开课') {
          this.pName = '体验课'
        };
        if (response.pName === '长期班课') {
          this.pName = '系统班'
        };
        if (response.pName === '专题课') {
          this.pName = '专题课'
        };
        this.course = response.course;
        this.isExistActivity = response.isExistActivity;
        this.isCourseInCart = response.isCourseInCart;
        this.isConsume = response.isConsume;
        this.isOnSale = response.isOnSale;
        this.isVisitor = response.isVisitor;
        if (response.course.otherInfo !== '') {
          let otherInfo = JSON.parse(response.course.otherInfo);
          this.course.currentPress = otherInfo.currentPress;
        }
        if (response.teacherIntroduce && response.teacherIntroduce !== 'null') {
          let teacherIntroduce = JSON.parse(response.teacherIntroduce);
          teacherIntroduce.forEach(element => {
            if (element.desc) {
              element.desc = JSON.parse(element.desc);
              this.teacherList.push(element);
            }
          });
        }
        this.teacherInfos = response.teacherInfos;
        if (response.relationedCourses) {
          let relationedCourses = response.relationedCourses;
          relationedCourses.forEach(element => {
            element.isSelected = false;
            this.relationedCourses.push(element);
          });
        }
        let coursePeriods = response.mergeCourses;
        coursePeriods.forEach(element => {
          if (element.periods !== null) {
            element.periods.forEach(element2 => {
              if (element2.lessions !== null) {
                element2.lessions.forEach(element3 => {
                  this.lessions.push(element3);
                });
              }
            });
          }
        });
        if (response.activity !== undefined) {
          let discountInfo = response.activity.saleDiscount.discountInfo;
          this.activityType = response.activity.saleDiscount.type;
          this.activity = response.activity;
          this.userType = response.activity.saleDiscount.userType + '';
          if (response.activity.saleDiscount && discountInfo && discountInfo.length > 0) {
            if (this.isExistActivity === 1 && this.activityType === 'subscribeMain') {
              for (let index = 0; index < discountInfo.length; index++) {
                const element = discountInfo[index];
                if (response.isConsume && element.type === 1) {
                  this.discountInfo.push(element);
                }
                if (!response.isConsume && element.type === 0) {
                  this.discountInfo.push(element);
                }
              }
              // 不参加活动时的课程价格
              for (let index = 0; index < this.discountInfo.length; index++) {
                const element = this.discountInfo[index];
                if (element.count === 1) {
                  if (this.course.discountPrice < element.discount) {
                    this.totalDiscount = this.course.discountPrice;
                    this.finalPrice1 = 0;
                    this.toallPrice = this.course.discountPrice;
                  } else {
                    this.finalPrice1 = this.course.discountPrice - element.discount;
                    this.totalDiscount = element.discount;
                    this.toallPrice = this.course.discountPrice;
                  }
                }
              }
              this.finalPrice2 = this.finalPrice1;
            }
          }
          // 计算活动价格
          this.courseList.push(this.course);
          this.discountActivity[this.course.id] = this.activity;
          this.activityUserType[this.activity.id] = this.isConsume ? '1' : '0';
          let priceMap = getOrderPrice(this.courseList, this.discountActivity, {}, this.activityUserType);
          let price = 0;
          let reducePrice = 0;
          let reduceDiscount = 0;
          for (let id in priceMap) {
            price += priceMap[id].price;
            reducePrice += priceMap[id].reducePrice;
            reduceDiscount += priceMap[id].reduceDiscount;
          };
          this.totalPrice = toDecimal(price);
          this.payPrice = toDecimal(reducePrice);
          this.activityPrice = toDecimal(reduceDiscount);
        }
        let params = {
          'index': 1,
          'teacherInfos': this.teacherInfos
        };
        this.initTeacherApprise(params);
        if (response.buy === 'true') {
          this.buy = response.buy;
        }
      });
    },
    // 初始化课程评价
    initTeacherApprise: function (params) {
      courseDetailService.initTeacherApprise(params).then((response) => {
        if (response.lessionAppraisePager !== null) {
          let customerEvalList = response.lessionAppraisePager.list;
          this.customerEvalList = customerEvalList;
          let pageInfo = response.pageInfo;
          if (!this.isInitPageInfo) {
            this.total = pageInfo.totalCount;
            this.pageSize = pageInfo.pageSize;
            this.current = pageInfo.firstPage;
            this.isInitPageInfo = true;
          }
          // 如果用户评价列表为空分页条隐藏
          if (customerEvalList.length > 0) {
            this.isCustomerEvalList = false;
          }
        }
      })
    },
    // 马上报名
    joinCourse: function (courseId) {
      if (this.isVisitor === true) {
        this.promptMessage('游客不支持报名课程哦，请先登录！', 'error');
        return false;
      }
      courseDetailService.joinCourse(courseId).then((response) => {
        if (response.inviteId && response.inviteId.length > 0) {
          window.location.reload();
        } else {
          this.promptMessage('报名失败~', 'error');
        }
      });
      // 增加埋点
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = courseId;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_BUY, store.state.currentUser.id, paramsLog);
    },
    // 立即报名
    payImmediately: function (courseId) {
      if (this.isVisitor === true) {
        this.promptMessage('游客不支持报名课程哦，请先登录！', 'error');
        return false;
      }
      this.$router.push({
        path: 'pay/index',
        query: {
          courseId: courseId,
          source: this.source
        }
      });
      // 增加埋点
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = courseId;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_BUY, store.state.currentUser.id, paramsLog);
    },
    // 全部报名
    joinAllCourse: function (id, selecteds) {
      // 游客不允许全部报名
      if (this.isVisitor === true) {
        this.promptMessage('游客不支持报名课程哦，请先登录！', 'error');
        return false;
      }
      selecteds.push(id);
      // 增加埋点
      let courseids = [];
      courseids.push(id);
      for (let i = 0; i < selecteds.length - 1; i++) {
        const element = selecteds[i];
        courseids.push(element);
      }
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = courseids.join(',');
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_LB_BUY, store.state.currentUser.id, paramsLog);
      let params = {
        'courseIds': JSON.stringify(selecteds)
      };
      courseDetailService.joinAllCourse(params).then((response) => {
        if (response.errorCode === 0) {
          this.$router.push({
            path: 'pay/index',
            query: {
              tag: response.result.tag,
              source: this.source
            }
          });
        } else {
          this.promptMessage('报名失败~', 'error');
        }
      })
    },
    addToCart: function (id) {
      // 游客不允许加入购物车
      if (this.isVisitor === true) {
        this.promptMessage('游客不支持课程加入选课单哦，请先登录！', 'error');
        return false;
      }
      courseDetailService.addToCart(id).then((response) => {
        if (response.errorCode === 0) {
          this.isCourseInCart = 1;
          this.promptMessage('添加购物车成功~', 'success');
        } else {
          this.promptMessage('添加购物车失败~', 'error');
        }
      })
      // 增加埋点
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = id;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_CART, store.state.currentUser.id, paramsLog);
    },
    inCartTip: function () {
      this.isCartipOn = false;
      setTimeout(() => {
        this.isCartipOn = true;
      }, 2000);
    },
    removeCart: function (id) {
      courseDetailService.removeCart(id).then((response) => {
        if (response.errorCode === 0) {
          this.promptMessage('从购物车移除成功~', 'success');
          this.isCourseInCart = 0;
        } else {
          this.promptMessage('从购物车移除失败~', 'error');
        }
      })
      this.isCourseInCart = 0;
    },
    chooseAllayCourse: function (id) {
      // 和其他课程联报时计算总价
      for (const key in this.relationedCourses) {
        let relationedCourse = this.relationedCourses[key];
        if (relationedCourse.id === id) {
          relationedCourse.isSelected = !relationedCourse.isSelected;
          if (!relationedCourse.isSelected) {
            for (let i = 0; i < this.selecteds.length; i++) {
              if (this.selecteds[i] === id) {
                this.selecteds.splice(i, 1);
                this.toallPrice -= relationedCourse.discountPrice;
              }
            }
          } else {
            this.selecteds.push(id);
            this.toallPrice += relationedCourse.discountPrice;
          }
        }
      }
      // 和其他课程联报时计算折扣
      for (let index = 0; index < this.discountInfo.length; index++) {
        const element = this.discountInfo[index];
        if (this.selecteds.length > 0 && element.count === 2) {
          // 联报
          // 初始化折扣，重新计算每门课的折扣比例
          if (this.course.discountPrice < element.discount) {
            this.totalDiscount = this.course.discountPrice;
          } else {
            this.totalDiscount = element.discount;
          }
          let coursesArr = [];
          let relArr = this.relationedCourses;
          for (let index = 0; index < relArr.length; index++) {
            if (this.selecteds.indexOf(relArr[index].id) > -1) {
              coursesArr.push(relArr[index]);
            }
          }
          for (let index = 0; index < coursesArr.length; index++) {
            if (coursesArr[index].discountPrice < element.discount) {
              this.totalDiscount += coursesArr[index].discountPrice;
            } else {
              this.totalDiscount += element.discount;
            }
          }
        }
        if (this.selecteds.length === 0 && element.count === 1) {
          if (this.course.discountPrice < element.discount) {
            this.totalDiscount = this.course.discountPrice;
          } else {
            this.totalDiscount = element.discount;
          }
        }
      }
      this.finalPrice2 = this.toallPrice - this.totalDiscount;
    },
    // tab切换
    toggleTab: function (tab) {
      this.currentTab = tab; // tab 为当前触发标签页的组件名
      if (tab === 'courseIntro') {
        this.isChoosed = 1;
        this.property = 'kcjj'
      } else if (tab === 'courseOutline') {
        this.isChoosed = 2;
        this.property = 'kcdg'
      } else if (tab === 'teacherIntro') {
        this.isChoosed = 3;
        this.property = 'msjj'
      } else if (tab === 'courseEval') {
        this.isChoosed = 4;
        this.property = 'kcpj'
      }
      // 增加埋点
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = this.courseId;
      paramsLog.property = this.property;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_TAB, store.state.currentUser.id, paramsLog);
    },
    promptMessage (txt, type) {
      this.$message({
        message: txt,
        type: type,
        duration: 1000,
        customClass: 'vertical-center'
      });
    },
    // 课程咨询埋点
    courseConsultBury: function () {
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = this.courseId;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_ABOUT, store.state.currentUser.id, paramsLog);
    },
    // 暑秋连报课程详情
    toCourseDetail: function (courseId) {
      this.$router.push({
        path: '/courseDetail',
        query: {
          courseId: courseId
        }
      });
      var paramsLog = {};
      paramsLog.source = this.source;
      paramsLog.courseId = this.courseId;
      commonUtils.setLog(this.WEB_MODULE, this.WEB_OPCODE.DETAIL_LB_CARD, store.state.currentUser.id, paramsLog);
    },
    setMinHeight () {
      if (document.querySelector('.course-warp')) {
        let height = document.documentElement.clientHeight - 228;
        document.querySelector('.course-warp').style.minHeight = height + 'px';
      }
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    keepTwoAndPositive: function (value) {
      value = Number(value);
      if (value < 0) {
        value = 0;
      }
      return (value / 100).toFixed(2);
    },
    keepTwo: function (value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped src="@/assets/components/coursedetail/css/coursedetail.css">
</style>
