import axios from './http'
// import store from '../vuex/store'

export default {
  // 马上报名
  joinCourse (courseId) {
    return axios.get('/online/joinCourse', {
      params: {
        courseId: courseId
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 全部报名
  joinAllCourse (params) {
    return axios.post('/goods/getGoodsTag', params).then((response) => {
      return response.data;
    })ZXApp
  },
  // 添加购物车
  addToCart (courseId) {
    return axios.get('/online/addToCart', {
      params: {
        courseId: courseId
      }
    }).then((response) => {
      return response.data;
    })
  },
  // 从购物车移除
  removeCart (courseId) {
    return axios.get('/online/removeCart', {
      params: {
        courseId: courseId
      }
    }).then((response) => {
      return response.data;
    })
  },
  // 获得课程详情
  getCourseDetail (courseId) {
    return axios.get('/online/courseDetail', {
      params: {
        courseId: courseId
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 初始化教师评价模块
  initTeacherApprise (params) {
    return axios.post('/online/getLessionAppraisePager', params).then((response) => {
      return response.data.result;
    })
  }
}
