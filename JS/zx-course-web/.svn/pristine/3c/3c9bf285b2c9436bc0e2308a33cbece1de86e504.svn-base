<template>
  <div>
    <p style="margin-left:18px;margin-top:28px;font-size:16px">我的收货地址</p>
    <div style="color:#efefef;border-top: 1px solid;margin:20px 0 27px 18px"></div>
    <p style="margin-left:18px;color:#0dc2b3">新增收货地址</p>
    <div class="address-form">
      <div class="suffix">
        <span class="left-title">地区<i class="red">*</i></span>
        <el-select width v-model="value1" placeholder="请选择省" @change="handleItemChange">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-show="isCityShow"  v-model="value2" placeholder="请选择市" @change="handleItemChange">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-show="isDistrictShow"  v-model="value3" placeholder="请选择区">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="suffix">
        <span class="left-title">街道地址<i class="red">*</i></span>
        <el-input v-model="detail" type="textarea" placeholder="请输入街道地址" resize="none"></el-input>
      </div>
      <div class="suffix">
        <span class="left-title">收货人姓名<i class="red">*</i></span>
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
      </div>
      <div class="suffix">
        <span class="left-title">手机号码<i class="red">*</i></span>
        <el-input v-model="mobile" placeholder="请输入手机号" maxlength="11"></el-input>
      </div>
      <div class="suffix">
        <span class="left-title"></span>
        <a :class="isSetDefault? 'default_address_check' : 'default_address_not_check'" @click="setDefault">设置为默认收货地址</a>
      </div>
      <div class="suffix">
        <span class="left-title"></span>
        <a href="javascript:" class="address_save" @click="saveAddress">保存</a>
      </div>
    </div>
    <p v-show="!isVistor && userAddresses && userAddresses.length > 0" style="color:#0dc2b3;margin:48px 0 24px 18px">已保存的收货地址</p>
    <table v-show="!isVistor && userAddresses && userAddresses.length > 0" class="address-table">
      <tbody>
        <tr>
          <th width="100px">收货人</th>
          <th width="180px">地区</th>
          <th width="200px">街道地址</th>
          <th width="120px">手机号码</th>
          <th width="100px">操作</th>
          <th width="100px"></th>
        </tr>
        <tr :key="add.id" v-for="add in userAddresses">
          <td class="tc">
            {{add.receiver}}
          </td>
          <td style="text-align:left" :title="add.provinceName + ' ' + add.cityName + ' ' + add.districtName">
            {{add.provinceName}} {{add.cityName}} {{add.districtName}}
          </td>
          <td :title="add.address">
            {{add.address}}
          </td>
          <td :title="add.mobile" class="tc">
            <template v-if="add.mobile">
              {{add.mobile.substr(0,3)}}****{{add.mobile.substr(-4)}}
            </template>
            <template v-else>-</template>
          </td>
          <td class="tc common-col">
            <a class="btn" href="javascript:" @click="modifyAddress(add.id)">修改</a> |
            <a class="btn" href="javascript:" @click="delAddress(add.id)">删除</a>
          </td>
          <td class="tc">
            <a v-if="add.isDefault" class="set_address_default">默认地址</a>
            <a v-else href="javascript:" class="default_address" @click="setDefaultAddress(add.id)">设为默认</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import store from '../../vuex/store'
import myCourseService from '@/api/MyCourseService'
export default {
  name: 'myAddress',
  data () {
    return {
      id: '',
      options1: [],
      options2: [],
      options3: [],
      value1: '',
      value2: '',
      value3: '',
      detail: '',
      name: '',
      mobile: '',
      isVistor: false,
      userAddresses: [],
      isSetDefault: false,
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      distinctId: '',
      distinctName: '',
      isCityShow: true,
      isDistrictShow: true
    }
  },
  components: {
  },
  created () {
    this.myAddress();
    this.getProvinces();
  },
  watch: {
    $route () {
      this.id = this.$route.query.id;
      if (this.id) {
        this.getAddressById(this.id);
      }
    }
  },
  mounted () {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getAddressById(this.id);
    }
  },
  methods: {
    myAddress () {
      myCourseService.myAddress().then((response) => {
        this.userAddresses = response.userAddresses || [];
        this.isVistor = response.isVistor;
      })
    },
    getProvinces () {
      myCourseService.getProvinces().then((response) => {
        this.options1 = this.dealAddress(response);
      })
    },
    getAreas (areaCode) {
      myCourseService.getAreas(areaCode).then((response) => {
        if (response && response.length) {
          let signCode = areaCode.substr(2, 4);
          if (signCode === '0000') {
            this.options2 = this.dealAddress(response);
            this.options3 = [];
            this.value2 = '请选择市';
            this.value3 = '请选择区';
            this.isCityShow = true;
            this.isDistrictShow = true;
          } else {
            this.options3 = this.dealAddress(response);
            this.value3 = '请选择区';
            this.isDistrictShow = true;
          }
        } else {
          let signCode = areaCode.substr(2, 4);
          if (signCode === '0000') {
            this.options2 = [];
            this.options3 = [];
            this.isCityShow = false;
            this.isDistrictShow = false;
          } else {
            this.options3 = [];
            this.isDistrictShow = false;
          }
        }
      })
    },
    handleItemChange (val) {
      this.getAreas(val);
    },
    selectedArea () {
      for (let i = 0, l = this.options1.length; i < l; i++) {
        if (this.value1 === this.options1[i].value) {
          this.provinceId = this.options1[i].id;
          this.provinceName = this.options1[i].label;
          break;
        }
      }
      for (let i = 0, l = this.options2.length; i < l; i++) {
        if (this.value2 === this.options2[i].value) {
          this.cityId = this.options2[i].id;
          this.cityName = this.options2[i].label;
          break;
        }
      }
      for (let i = 0, l = this.options3.length; i < l; i++) {
        if (this.value3 === this.options3[i].value) {
          this.distinctId = this.options3[i].id;
          this.distinctName = this.options3[i].label;
          break;
        }
      }
    },
    dealAddress (add) {
      let address = [];
      for (let i = 0, l = add.length; i < l; i++) {
        let obj = {
          id: add[i].areaId || '',
          value: add[i].areaCode || '',
          label: add[i].areaName || ''
        };
        address.push(obj);
      }
      return address;
    },
    saveAddress () {
      if (this.isVistor) {
        this.promptMessage('游客不支持收货地址管理哦，请先登录~', 'error');
        return false;
      }
      if (!this.id && this.userAddresses.length >= 5) {
        this.promptMessage('收货地址数量已达上限~', 'error');
        return false;
      }
      if (!this.value1) {
        this.promptMessage('请选择地区~', 'error');
        return false;
      }
      if (this.isCityShow) {
        if (!this.value2 || this.value2 === '请选择市') {
          this.promptMessage('请选择地区~', 'error');
          return false;
        }
      }
      if (this.isDistrictShow) {
        if (!this.value3 || this.value3 === '请选择区') {
          this.promptMessage('请选择地区~', 'error');
          return false;
        }
      }
      if (!this.detail) {
        this.promptMessage('请填写街道地址~', 'error');
        return false;
      }
      if (this.getStringLength(this.detail) > 100) {
        this.promptMessage('街道地址字数过长~', 'error');
        return false;
      } else if (this.getStringLength(this.detail) < 10) {
        this.promptMessage('街道地址字数过短~', 'error');
        return false;
      }
      if (!this.name) {
        this.promptMessage('请填写收货人姓名~', 'error');
        return false;
      }
      if (this.getStringLength(this.name) > 100) {
        this.promptMessage('收货人姓名字数过长~', 'error');
        return false;
      }
      if (!this.mobile) {
        this.promptMessage('请填写手机号码~', 'error');
        return false;
      }
      this.mobile = this.mobile.replace(/[^\d]/g, '');
      if (this.mobile.length < 11 || this.mobile.substr(0, 1) !== '1') {
        this.promptMessage('请填写正确的手机号码~', 'error');
        return false;
      }
      this.selectedArea();
      let params = {
        id: this.id,
        address: this.detail,
        provinceId: this.provinceId,
        provinceName: this.provinceName,
        cityId: this.isCityShow ? this.cityId : null,
        cityName: this.isCityShow ? this.cityName : null,
        distinctId: this.isDistrictShow ? this.distinctId : null,
        distinctName: this.isDistrictShow ? this.distinctName : null,
        isDefault: this.isSetDefault,
        mobile: this.mobile,
        receiver: this.name
      };
      let note = this.id ? '修改' : '添加';
      myCourseService.saveAddress(params).then((response) => {
        if (response === 'success') {
          this.promptMessage(note + '成功~', 'success');
          setTimeout(() => {
            if (this.id) {
              this.$router.push({
                path: 'myAddress'
              });
              window.location.reload();
            } else {
              window.location.reload();
            }
          }, 1000);
        } else {
          this.promptMessage(note + '失败，请稍后再试~', 'error');
        }
      })
    },
    modifyAddress (id) {
      this.$router.push({
        path: 'myAddress',
        query: {
          id: id,
          timestamp: new Date().getTime()
        }
      });
    },
    delAddress (id) {
      myCourseService.delAddress(id).then((response) => {
        if (response === 'success') {
          this.promptMessage('删除成功~', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.promptMessage('删除失败，请稍后再试~', 'error');
        }
      })
    },
    setDefaultAddress (id) {
      myCourseService.setDefaultAddress(id).then((response) => {
        if (response === 'success') {
          this.promptMessage('设置成功~', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.promptMessage('设置失败，请稍后再试~', 'error');
        }
      })
    },
    promptMessage (txt, type) {
      this.$message({
        message: txt,
        type: type,
        duration: 1000,
        customClass: 'vertical-center'
      });
    },
    setDefault () {
      this.isSetDefault = !this.isSetDefault;
    },
    getAddressById (id) {
      myCourseService.getAddressById(id).then((response) => {
        this.provinceId = response.provinceId;
        this.provinceName = response.provinceName;
        this.cityId = response.cityId;
        this.cityName = response.cityName;
        this.distinctId = response.districtId;
        this.distinctName = response.districtName;
        this.isSetDefault = response.isDefault;
        this.mobile = response.mobile;
        this.detail = response.address;
        this.name = response.receiver;
        this.value1 = this.provinceName;
        if (response.cityName) {
          this.value2 = response.cityName;
        }
        if (response.districtName) {
          this.value3 = response.districtName;
        }
        this.initArea(this.provinceId + '', this.cityId + '', this.distinctId + '');
      })
    },
    initArea (provinceId, cityId, distinctId) {
      myCourseService.getProvinces().then((provinces) => {
        if (provinces && provinces.length) {
          let provincesArr = provinces || [];
          for (let i = 0, l0 = provincesArr.length; i < l0; i++) {
            if (provincesArr[i].areaId === provinceId) {
              this.value1 = provincesArr[i].areaCode;
              break;
            }
          }
          myCourseService.getAreas(this.value1).then((cities) => {
            if (cities && cities.length) {
              this.isCityShow = true;
              this.options2 = this.dealAddress(cities);
              let citiesArr = cities || [];
              for (let j = 0, l1 = citiesArr.length; j < l1; j++) {
                if (citiesArr[j].areaId === cityId) {
                  this.value2 = citiesArr[j].areaCode;
                  break;
                }
              }
              myCourseService.getAreas(this.value2).then((distincts) => {
                if (distincts && distincts.length) {
                  this.isDistrictShow = true;
                  this.options3 = this.dealAddress(distincts);
                  let distinctsArr = distincts || [];
                  for (let k = 0, l2 = distinctsArr.length; k < l2; k++) {
                    if (distinctsArr[k].areaId === distinctId) {
                      this.value3 = distinctsArr[k].areaCode;
                      break;
                    }
                  }
                } else {
                  this.options3 = [];
                  this.isDistrictShow = false;
                }
              });
            } else {
              this.options2 = []
              this.options3 = [];
              this.isCityShow = false;
              this.isDistrictShow = false;
            }
          });
        }
      });
    },
    getStringLength (val) {
      if (!val) {
        return 0;
      }
      var chineseRex = /^[\u4e00-\u9fa5]{0,}$/;
      let valueLength = 0;
      for (let i = 0; i < val.length; i++) {
        let temp = val[i];
        if (chineseRex.test(temp)) {
          valueLength += 2;
        } else {
          valueLength += 1;
        }
      }
      return valueLength;
    }
  }
}
</script>

<style scoped>
.left-title{
  display: inline-block;
  width: 80px;
  line-height: 40px;
  text-align: right;
  vertical-align: top;
  margin-right: 10px;
}
.red{
  color: red;
}
.address-form{
  margin-left: 20px;
}
.suffix{
  margin-top: 25px;
}
.el-select{
  width: 164px;
}
.el-textarea,
.el-input{
  width: 500px;
}
.address-table{
  margin-left: 18px;
  width: 880px;
  margin-bottom: 45px;
  table-layout: fixed;
}
.address-table th,
.address-table td{
  height: 40px;
  border: 1px solid #f4f4f4;
}
.address-table th{
  background: #f9f9f9;
  text-align: center;
  font-weight: bold;
}
.address-table td{
  padding: 0 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.btn{
  color: #0dc2b3;
}
.common-col{
  color: #0dc2b3;
}
</style>
