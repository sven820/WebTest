export function toDecimal (x) {
  let f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
}

/**
 * 计算价格
 * @param courseList 课程列表
 * @param saleMap<courseId,Activity>
 * @param voucherMap<courseId,List<Voucher>> => voucherMap<courseId,Voucher>
 * @param userType <activityId,type:string>type 0：新用户，1：老用户，2：班课用户
 * @returns {{}}
 */
export function getOrderPrice (courseList, saleMap, voucherMap, userType) {
  // 活动详情，<activityId,ActivityData>
  let activityMap = {};
  // 活动对应课程，<activityId,List<Course>>或者<courseId,List<Course>>
  let activityArray = {};
  // 分组同类活动
  for (let i = 0; i < courseList.length; i++) {
    let courseId = courseList[i].id;
    // 课程活动存在
    if (saleMap && saleMap[courseId] && saleMap[courseId].saleDiscount) {
      let activityId = saleMap[courseId].id;
      // 缓存活动
      activityMap[activityId] = saleMap[courseId].saleDiscount;
      if (!activityArray[activityId]) {
        activityArray[activityId] = [];
      }
      activityArray[activityId].push(courseList[i]);
    } else {
      // 未参加活动课程
      activityArray[courseId] = [];
      activityArray[courseId].push(courseList[i]);
    }
  }
  let priceMap = {};
  for (let id in activityArray) {
    let saleDiscount = activityMap[id];
    // 订单总金额
    let price = 0;
    // 代金券优惠价格
    let reduceVoucherPrice = 0;
    // 折扣抵用价格
    let reduceDiscount = 0;
    // 每门课程优惠的价格（仅仅适用暑秋联报名）
    let reduceCourseMap = {};
    for (let j = 0; j < activityArray[id].length; j++) {
      // let coursePrice = activityArray[i][j].discountPrice;
      price += activityArray[id][j].discountPrice;
    }
    // 声明
    let discountData = [];
    let type = 0;
    if (saleDiscount && saleDiscount.discountInfo && saleDiscount.discountInfo.length > 0) {
      switch (saleDiscount.userType) {
        case 0:
          discountData = saleDiscount.discountInfo;
          // step 1：先进行排序，确保满减额度最大始终在前面
          discountData = discountData.sort(sortPriceByCount);
          if (saleDiscount.type === 'fullReduce') {
            for (let k = 0; k < discountData.length; k++) {
              // 满减，当前活动课程总价达到满减条件
              if (price >= discountData[k].count) {
                // 找到满减额度最大
                reduceDiscount = discountData[k].discount;
                break;
              }
            }
          } else if (saleDiscount.type === 'discount') {
            // 打折
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                reduceDiscount = price * ((100 - discountData[k].discount) / 100);
                break;
              }
            }
          } else if (saleDiscount.type === 'reduce') {
            // 立减
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                reduceDiscount = discountData[k].discount;
                break;
              }
            }
          } else if (saleDiscount.type === 'subscribeMain') {
            // 联报优惠
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                for (let j = 0; j < activityArray[id].length; j++) {
                  let coursePrice = activityArray[id][j].discountPrice;
                  let sangleCourseId = activityArray[id][j].id;
                  let sangleReduce = 0;
                  if (coursePrice > discountData[k].discount) {
                    sangleReduce = discountData[k].discount;
                  } else {
                    sangleReduce = coursePrice;
                  }
                  reduceDiscount += sangleReduce;
                  reduceCourseMap[sangleCourseId] = sangleReduce;
                }
                break;
              }
            }
          }
          break;
        case 1:
          // 区分新老用户
          // let type = 0;
          if (userType && userType[id] && userType[id] === '1') {
            type = 1;
          }
          // let discountData = [];
          for (let k = 0; k < saleDiscount.discountInfo.length; k++) {
            if (type === 1 && saleDiscount.discountInfo[k].type === 1) {
              discountData.push(saleDiscount.discountInfo[k]);
            } else if (type === 0 && saleDiscount.discountInfo[k].type === 0) {
              discountData.push(saleDiscount.discountInfo[k]);
            }
          }
          discountData = discountData.sort(sortPriceByCount);
          if (saleDiscount.type === 'discount') {
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                // 打折
                reduceDiscount = price * ((100 - discountData[k].discount) / 100);
                break;
              }
            }
          } else if (saleDiscount.type === 'reduce') {
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                // 立减
                reduceDiscount = discountData[k].discount;
                break;
              }
            }
          } else if (saleDiscount.type === 'fullReduce') {
            for (let k = 0; k < discountData.length; k++) {
              // 满减，当前活动课程总价达到满减条件
              if (price >= discountData[k].count) {
                // 找到满减额度最大
                reduceDiscount = discountData[k].discount;
                break;
              }
            }
          } else if (saleDiscount.type === 'subscribeMain') {
            // 原代码少了for循环，这里加上
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                for (let j = 0; j < activityArray[id].length; j++) {
                  let coursePrice = activityArray[id][j].discountPrice;
                  let sangleCourseId = activityArray[id][j].id;
                  let sangleReduce = 0;
                  if (coursePrice > discountData[k].discount) {
                    sangleReduce = discountData[k].discount;
                  } else {
                    sangleReduce = coursePrice;
                  }
                  reduceDiscount += sangleReduce;
                  reduceCourseMap[sangleCourseId] = sangleReduce;
                }
                break;
              }
            }
          }
          break;
        case 2:
          // 区分班课用户
          // let type = 0;
          if (userType && userType[id] && userType[id] === '1') {
            type = 1;
          }
          // let discountData = [];
          for (let k = 0; k < saleDiscount.discountInfo.length; k++) {
            if (type === 1 && saleDiscount.discountInfo[k].type === 1) {
              discountData.push(saleDiscount.discountInfo[k]);
            } else if (type === 0 && saleDiscount.discountInfo[k].type === 0) {
              discountData.push(saleDiscount.discountInfo[k]);
            }
          }
          discountData = discountData.sort(sortPriceByCount);
          if (saleDiscount.type === 'discount') {
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                // 打折
                reduceDiscount = price * ((100 - discountData[k].discount) / 100);
                break;
              }
            }
          } else if (saleDiscount.type === 'reduce') {
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                // 立减
                reduceDiscount = discountData[k].discount;
                break;
              }
            }
          } else if (saleDiscount.type === 'fullReduce') {
            for (let k = 0; k < discountData.length; k++) {
              // 满减，当前活动课程总价达到满减条件
              if (price >= discountData[k].count) {
                // 找到满减额度最大
                reduceDiscount = discountData[k].discount;
                break;
              }
            }
          } else if (saleDiscount.type === 'subscribeMain') {
            // 联报优惠
            for (let k = 0; k < discountData.length; k++) {
              if ((activityArray[id].length - discountData[k].count) >= 0) {
                for (let j = 0; j < activityArray[id].length; j++) {
                  let coursePrice = activityArray[id][j].discountPrice;
                  let sangleCourseId = activityArray[id][j].id;
                  let sangleReduce = 0;
                  if (coursePrice > discountData[k].discount) {
                    sangleReduce = discountData[k].discount;
                  } else {
                    sangleReduce = coursePrice;
                  }
                  reduceDiscount += sangleReduce;
                  reduceCourseMap[sangleCourseId] = sangleReduce;
                }
                break;
              }
            }
          }
          break;
        default:
          reduceDiscount = 0;
          break;
      }
    }
    // 计算代金券价格
    for (let j = 0; j < activityArray[id].length; j++) {
      // 计算价格
      let courseId = activityArray[id][j].id;
      let coursePrice = activityArray[id][j].discountPrice;
      // 查询是否使用代金券
      let voucher = voucherMap[courseId];
      if (saleDiscount) {
        // 存在优惠活动
        if (saleDiscount.ableVoucher && voucher) {
          // 允许使用代金券，并且代金券存在
          if (voucher.endTime > new Date().getTime()) {
            let reducePriceTemp = 0;
            if (reduceCourseMap[courseId]) {
              reducePriceTemp = coursePrice - Math.round(reduceCourseMap[courseId]);
            } else {
              let rate = coursePrice / price;
              reducePriceTemp = (coursePrice - (Math.round(reduceDiscount * rate)));
            }
            let voucherPrice = voucher.price * 100;
            if (reducePriceTemp > voucherPrice) {
              reduceVoucherPrice += voucherPrice;
            } else {
              reduceVoucherPrice += reducePriceTemp;
            }
          }
        }
      } else {
        // 不存在优惠活动
        if (voucher) {
          // 使用代金券
          if (voucher.endTime > new Date().getTime()) {
            let voucherPrice = voucher.price * 100;
            if (coursePrice > voucherPrice) {
              reduceVoucherPrice += voucherPrice;
            } else {
              reduceVoucherPrice += coursePrice;
            }
          }
        }
      }
    }
    let reducePrice = price - Math.round(reduceDiscount) - Math.round(reduceVoucherPrice);
    priceMap[id] = {
      /**
         * 课程总价
         */
      price: price / 100,
      /**
         * 课程实付价格
         */
      reducePrice: reducePrice > 0 ? reducePrice / 100 : 0,
      /**
         * 课程优惠价格
         */
      reduceDiscount: reduceDiscount / 100,
      /**
         * 课程使用代金券价格
         */
      reduceVoucherPrice: reduceVoucherPrice / 100
    }
  }
  return priceMap;
}

/**
 * 根据满减价格排序，大到小，例如[count:200,discount:20,count:100,discount:10]
 */
function sortPriceByCount (discountObjOne, discountObjTwo) {
  if (discountObjOne['count'] > discountObjTwo['count']) {
    return -1;
  } else if (discountObjOne['count'] < discountObjTwo['count']) {
    return 1
  } else {
    return 0;
  }
}
