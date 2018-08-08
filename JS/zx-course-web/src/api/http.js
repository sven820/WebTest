import axios from 'axios'
import router from '../router'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.BASE_PATH;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (!config.params) {
      config.url = config.url + '?t=' + new Date().getTime();
    } else if (!config.params.t) {
      config.params.t = new Date().getTime();
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    config.headers.Authorization = 'true';
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.headers.sessionstatus === 'timeout') {
      router.replace({
        path: '/login'
      })
    }
    if (!response.data.hasOwnProperty('errorCode')) {
      let url = response.config.url;
      if (url.indexOf('/proxy') > -1) {
        url = url.replace(/\/proxy/, '');
        url = 'http://localhost:8086' + url;
      }
      let msg = url + ': Must Be Packaged In ResultJSON';
      return Promise.reject(msg);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  });

export default axios;
