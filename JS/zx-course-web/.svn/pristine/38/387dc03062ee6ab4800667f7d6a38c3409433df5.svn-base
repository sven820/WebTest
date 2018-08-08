import axios from './http'
// import store from '../vuex/store'

export default {

  // 初始化日历，获取有课程的日期
  initCourseCalendar (courseDate) {
    return axios.get('/online/initCalendar', {
      params: {
        courseDate: courseDate
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 进入直播间，客户端启动
  handleJoinRoom (url) {
    return axios.get(url, {
      params: {
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 获取课程日历
  getCourseCalendar (courseDate) {
    return axios.get('/online/getCourseCalendar', {
      params: {
        courseDate: courseDate
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 获取课程章节
  getCourseChapter (courseId) {
    return axios.get('/online/getCourseChapter', {
      params: {
        courseId: courseId
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 获取待上课程/已上课程学科Tab
  getStudySubjects (status) {
    return axios.get('/online/getStudySubjects', {
      params: {
        status: status
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 获取待上课程/已上课程
  getStudyCourses (index, size, status) {
    return axios.get('/online/getStudyCourses', {
      params: {
        pageIndex: index,
        pageSize: size,
        status: status
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 获取今日课程
  getTodayCourses () {
    return axios.get('/online/getTodayCourses', {
      params: {
      }
    }).then((response) => {
      return response.data.result;
    })
  },

  // 获取用户基本信息
  getCurrentUserInfo () {
    return axios.get('/student/get/userInfo', {
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取直播助手下载链接
  getDownloadUrl () {
    return axios.get('/online/getDownloadUrl', {
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取课程列表
  getCourseList (index, size) {
    return axios.get('/online/getCourseList', {
      params: {
        index: index,
        size: size
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取一周内的直播课程
  getOneWeekLiveCourse () {
    return axios.get('/online/myCalendar?_t=' + new Date().getTime(), {
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取我的购买记录
  getMyBuyRecord (index, size) {
    return axios.get('/online/buyRecord', {
      params: {
        pageIndex: index,
        pageSize: size
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 取消订单
  cancelOrder (orderId) {
    return axios.get('/online/cancelOrder', {
      params: {
        orderId: orderId
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 立即支付
  payAhead (courseId) {
    return axios.get('/online/isBuyCourse', {
      params: {
        courseId: courseId
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取代金券
  myVoucher (type) {
    return axios.get('/online/myVoucher', {
      params: {
        type: type
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取我的地址
  myAddress () {
    return axios.get('/online/myAddress', {
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取全省数据列表
  getProvinces () {
    return axios.get('/goods/getProvinces', {
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取地市信息
  getAreas (areaCode) {
    return axios.get('/goods/getAreas', {
      params: {
        areaCode: areaCode
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 保存地址
  saveAddress (params) {
    return axios.post('/online/saveAddress', params).then((response) => {
      return response.data.result;
    })
  },
  // 删除地址
  delAddress (id) {
    return axios.get('/online/delAddress', {
      params: {
        id: id
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 设置默认地址
  setDefaultAddress (id) {
    return axios.get('/online/setDefaultAddress', {
      params: {
        id: id
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 根据id获取地址
  getAddressById (id) {
    return axios.get('/online/getAddressById', {
      params: {
        id: id
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取商品列表
  getGoodsList (params) {
    return axios.post('/goods/goodsList', params).then((response) => {
      return response.data.result;
    })
  },
  // 获取支付页
  getPaymentPage (params) {
    return axios.post('/goods/pay/getPaymentPage', params).then((response) => {
      return response.data.result;
    });
  },
  // 点击弹框支付成功,是否支付成功
  isPaySuccess (params) {
    return axios.post('/goods/pay/isPaySuccess', params).then((response) => {
      return response.data.result;
    });
  },
  // 查询微信支付状态
  weChatOrderQuery (orderId) {
    return axios.get('/goods/pay/weChatOrderQuery?_t=' + new Date().getTime(), {
      params: {
        orderId: orderId
      }
    }).then((response) => {
      return response.data.result;
    })
  },
  // 获取支付参数
  getPaymentParams (params) {
    return axios.get('/goods/pay/getPaymentParams', {
      params: params
    }).then((response) => {
      return response.data.result;
    })
  },
  // 购物车
  myCart () {
    return axios.get('/online/myCart', {}).then((response) => {
      return response.data.result;
    })
  },
  // 购物车删除单个课程
  removeCartCourse (params) {
    return axios.post('/online/removeCart', params).then((response) => {
      return response.data;
    })
  },
  // 购物车批量删除课程
  batchRemoveCart (params) {
    return axios.post('/online/batchRemoveCart', params).then((response) => {
      return response.data;
    })
  },
  // 购物车清除失效课程
  removeDisabledCourse () {
    return axios.post('/online/removeDisabledCourse', {}).then((response) => {
      return response.data;
    })
  }
}
