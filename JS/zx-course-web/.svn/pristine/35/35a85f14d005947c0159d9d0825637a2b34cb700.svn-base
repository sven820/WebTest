import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import baseService from '@/api/baseService'
import Login from '@/components/Login'
import Index from '@/components/Index'
import PocketHomeIndex from '@/components/pockethome/Index'
import PocketCourseIndex from '@/components/pockethome/CourseIndex'
import PocketCourseList from '@/components/pockethome/CourseList'
import CartIndex from '@/components/mycart/CartIndex'

// 支付
import Payment from '@/components/payment/Payment'
import PayIndex from '@/components/payment/PayIndex'
import PayJump from '@/components/payment/PayJump'
import PayWechat from '@/components/payment/PayWechat'
import PaySuccess from '@/components/payment/PaySuccess'

// 我的课程
import MyCourseIndex from '@/components/mycourse/Index'
import MyCourse from '@/components/mycourse/MyCourse'
import CourseList from '@/components/mycourse/MyCourseList'
import LiveCalendar from '@/components/mycourse/MyCourseCalendar'
import BuyRecord from '@/components/mycourse/BuyRecord'
import MyVoucher from '@/components/mycourse/MyVoucher'
import MyAddress from '@/components/mycourse/MyAddress'
import MyCourseChapter from '@/components/mycourse/MyCourseChapter'
import MyCalendar from '@/components/common/zhixue/Calendar'
// 课程详情页
import CourseDetail from '@/components/coursedetail/index'
// 校本页面
import SchoolCenter from '@/components/schoolcenter/index'

Vue.use(Router)

const routes = [
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    meta: {
      requireAuth: true
    },
    children: [
      {
        // 课程详情页
        path: 'courseDetail',
        name: 'courseDetail',
        component: CourseDetail,
        meta: {
          requireAuth: true
        }
      },
      {
        // 校本页面
        path: 'schoolCenter',
        name: 'schoolCenter',
        component: SchoolCenter,
        meta: {
          requireAuth: true
        }
      },
      {
        // 全部课程
        path: 'home',
        name: 'pocketHome',
        component: PocketHomeIndex,
        redirect: '/home/index',
        children: [
          {
            // 口袋首页
            path: 'index',
            name: 'pocketIndex',
            component: PocketCourseIndex
          },
          {
            // 口袋首页更多
            path: 'list',
            name: 'pocketlist',
            component: PocketCourseList
          }
        ]
      },
      {
        // 我的购物车
        path: 'myCart',
        name: 'myCart',
        component: CartIndex
      },
      {
        // 支付模块
        path: 'pay',
        name: 'pay',
        component: Payment,
        redirect: '/pay/index',
        children: [
          {
            // 支付页
            path: 'index',
            name: 'PayIndex',
            component: PayIndex
          },
          {
            // 支付跳转页（用于支付宝和银联支付）
            path: 'jump',
            name: 'PayJump',
            component: PayJump
          },
          {
            // 微信支付页
            path: 'wechat',
            name: 'PayWechat',
            component: PayWechat
          },
          {
            // 支付成功页
            path: 'success',
            name: 'PaySuccess',
            component: PaySuccess
          }
        ]
      },
      {
        // 我的课程
        path: 'myCourse',
        name: 'myCourse',
        component: MyCourseIndex,
        redirect: '/myCourse/course',
        children: [
          {
            // 课程
            path: 'course',
            name: 'course',
            component: MyCourse,
            redirect: '/myCourse/course/list',
            children: [
              {
                // 课程列表
                path: 'list',
                name: 'list',
                component: CourseList
              }, {
                path: 'calendar',
                name: 'calendar',
                component: LiveCalendar
              },
              {
                // 直播日历
                // path: 'calendar',
                // name: 'calendar',
                // component: LiveCalendar
                path: 'chapter',
                name: 'chapter',
                component: MyCourseChapter
              }
            ]
          }, {
            // 直播日历
            // path: 'calendar',
            // name: 'calendar',
            // component: LiveCalendar
            path: 'chapter',
            name: 'chapter',
            component: MyCourseChapter
          },
          {
            // 直播日历
            // path: 'calendar',
            // name: 'calendar',
            // component: LiveCalendar
            path: 'calendar',
            name: 'calendar',
            component: MyCalendar
          },
          {
            // 购买记录
            path: 'buyRecord',
            name: 'buyRecord',
            component: BuyRecord
          },
          {
            // 我的优惠券
            path: 'myVoucher',
            name: 'myVoucher',
            component: MyVoucher
          },
          {
            // 我的收获地址
            path: 'myAddress',
            name: 'myAddress',
            component: MyAddress
          }
        ]
      }
    ]
  }
];

const router = new Router({
  linkActiveClass: 'on',
  linkExactActiveClass: 'on',
  routes: routes
});

// 全局路由钩子
router.beforeEach((to, from, next) => {
  // 路由更改 改变title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 判断该路由是否需要登录权限
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.currentUser && store.state.currentUser.id) {
      next();
    } else {
      baseService.getCurrentUser().then((response) => {
        if (response && response.currentUser) {
          store.commit('setCurrentUser', response.currentUser);
          store.commit('setIsVisitor', response.isVisitor);
          next();
        } else {
          next({
            path: '/login'
          })
        }
      });
    }
  } else {
    next();
  }
})

export default router;
