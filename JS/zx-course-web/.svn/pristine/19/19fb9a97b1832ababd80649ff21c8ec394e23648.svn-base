export default {

  /**
     * 设置log
     * @param module
     * @param opCode
     * @param userId
     * @param otherInfos
     */
  setLog: function (module, opCode, userId, otherInfos) {
    window.userActionLog4Cross(module, opCode, userId, otherInfos);
  },

  /**
   * 格式化时间
   */
  formatTimeToStr: function (beginTime, endTime) {
    beginTime = new Date(beginTime);
    endTime = new Date(endTime);
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();

    var bYear = beginTime.getFullYear();
    var bMonth = beginTime.getMonth() + 1;
    var bDate = beginTime.getDate();

    var eYear = endTime.getFullYear();
    var eMonth = endTime.getMonth() + 1;
    var eDate = endTime.getDate();

    var str1;
    var str2;

    if (bYear !== eYear) {
      str1 = formatDate(beginTime, 'yy年MM月dd日');
      str2 = formatDate(endTime, 'yy年MM月dd日');
    } else {
      // 1.非今年
      if (bYear !== nowYear) {
        if ((bYear + bMonth + bDate) === (eYear + eMonth + eDate)) { // 某一天
          str1 = formatDate(beginTime, 'yy年MM月dd日 hh:mm');
          str2 = formatDate(endTime, 'hh:mm');
        } else { // 某几天
          str1 = formatDate(beginTime, 'yy年MM月dd日');
          str2 = formatDate(endTime, 'MM月dd日');
        }
      } else { // 今年
        if (bYear === eYear && bMonth === eMonth && bDate === eDate) { // 同一天
          if (bYear === nowYear && bMonth === nowMonth && bDate === nowDate) { // 今天
            str1 = formatDate(beginTime, '今天 hh:mm');
            str2 = formatDate(endTime, 'hh:mm');
          } else if (bYear === nowYear && bMonth === nowMonth && bDate === (nowDate + 1)) { // 明天
            str1 = formatDate(beginTime, '明天 hh:mm');
            str2 = formatDate(endTime, 'hh:mm');
          } else { // 其他
            str1 = formatDate(beginTime, 'MM月dd日 hh:mm');
            str2 = formatDate(endTime, 'hh:mm');
          }
        } else { // 某几天
          str1 = formatDate(beginTime, 'MM月dd日');
          str2 = formatDate(endTime, 'MM月dd日');
        }
      }
    }
    return [str1, str2];
  },
  formatDate: formatDate,

  /**
   * 自动滚动到顶部
   */
  autoScrollTop: function () {
    if (document.documentElement && document.documentElement.scrollTop) {
      document.documentElement.scrollTop = 0;
    } else {
      document.body.scrollTop = 0;
    }
  }
}

function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
