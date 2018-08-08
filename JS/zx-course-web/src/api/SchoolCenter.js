import axios from './http'

export default {
  // 校本页面初始化
  initPage (params) {
    return axios.post('/student/schoolCenter', params).then((response) => {
      return response.data.result;
    })
  }
}
