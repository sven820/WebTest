import axios from './http'

export default {
  // 获取当前用户信息
  getCurrentUser () {
    return axios.get('/getCurrentUser', {
    }).then((response) => {
      return response.data.result;
    })
  },
  // 是否为定制校
  isCustom () {
    return axios.get('/online/isCustom', {
    }).then((response) => {
      return response.data.result;
    })
  },
  /**
   * 设置本地分页session缓存信息
   * @param {String} key
   * @param {Object} condition
   */
  setSelectorCondition (key, condition) {
    if (condition) {
      sessionStorage.setItem(`paper_condition_${key}`, JSON.stringify(condition));
    }
  },
  /**
     * 获取本地分页session缓存信息
     * @param key
     */
  getSelectorCondition (key) {
    try {
      let cache = sessionStorage.getItem(`paper_condition_${key}`);
      if (cache) {
        return JSON.parse(cache);
      }
      return null;
    } catch (e) {
      return null;
    }
  },
  // 根据id获取课程信息
  getCourseById (id) {
    return axios.get('/online/getCourseById', {
      params: {
        id: id
      }
    }).then((response) => {
      return response.data.result;
    })
  }
}
