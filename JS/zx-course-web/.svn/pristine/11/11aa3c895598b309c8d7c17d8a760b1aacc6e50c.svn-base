import axios from './http'
// import store from '../vuex/store'

export default {

  /**
   * 获取首页参数，banner等
   */
  getCourseHomeData () {
    return axios.get('/online/getCourseHomeData', {
    }).then((response) => {
      return response.data;
    })
  },

  /**
   * 根据年级获取首页分类
   */
  getCourseCategory (gradeCode) {
    return axios.get('/online/getCourseCategory', {
      params: {
        gradeCode: gradeCode
      }
    }).then((response) => {
      return response.data;
    })
  },

  /**
   * 获取推荐课程
   * @param {String} gradeCode 年级
   * @param {String} subjectCode 学科
   * @param {Number} categoryId 课程分类ID
   * @param {Number} pageIndex 分页参数
   * @param {Number} pageSize 分页参数
   */
  getCourseRecommentData (gradeCode, subjectCode, categoryId, pageIndex, pageSize) {
    return axios.get('/online/getCourseRecommentData', {
      params: {
        gradeCode: gradeCode,
        subjectCode: subjectCode,
        categoryId: categoryId,
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }).then((response) => {
      return response.data;
    })
  }
}
