<template>
  <div>
    <el-form :model="addressForm" :rules="addressRules" ref="addressForm">
      <el-row>
        <el-col :span="3" class="tr">
          <label>姓名<span class="red">*</span></label>
        </el-col>
        <el-col :span="20" :offset="1">
          <el-form-item prop="receiver">
            <el-input v-model="addressForm.receiver" placeholder="请输入姓名" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="tr">
          <label class="tr">地区<span class="red">*</span></label>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item prop="provinceCode">
            <el-select v-model="addressForm.provinceCode" placeholder="请选择省" @change="getAreas">
              <el-option v-for="item in provinces" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1" v-if="isCityShow">
          <el-form-item prop="cityCode">
            <el-select v-model="addressForm.cityCode" placeholder="请选择市" @change="getAreas">
              <el-option v-for="item in cities" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item prop="distinctCode" v-if="isDistrictShow">
            <el-select v-model="addressForm.distinctCode" placeholder="请选择区" @change="setDistincts">
              <el-option v-for="item in distincts" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="tr">
          <label class="tr">街道地址<span class="red">*</span></label>
        </el-col>
        <el-col :span="20" :offset="1">
          <el-form-item prop="detail">
            <el-input type="textarea" v-model="addressForm.detail" placeholder="请输入详细地址" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="tr">
          <label class="tr">手机号码<span class="red">*</span></label>
        </el-col>
        <el-col :span="20" :offset="1">
          <el-form-item prop="mobile">
            <el-input v-model="addressForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-form-item>
          <el-button type="primary" @click="saveAddress">保存该地址</el-button>
          <!--<el-button @click="resetAddress">重置</el-button>-->
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import myCourseService from '@/api/MyCourseService'
import store from '../../vuex/store';
export default {
  props: {
    address: Object
  },
  name: 'AddressForm',
  data () {
    let validateMobile = (rule, value, callback) => {
      if (value.length < 11 || value.substr(0, 1) !== '1') {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    };
    return {
      isCityShow: true,
      isDistrictShow: true,
      provinces: [],
      cities: [],
      distincts: [],
      // 地址表单
      addressForm: this.address,
      addressFormInit: {
        id: '',
        receiver: '',
        provinceName: '',
        provinceCode: '',
        provinceId: '',
        cityName: '',
        cityCode: '',
        cityId: '',
        distinctName: '',
        distinctCode: '',
        distinctId: '',
        detail: '',
        mobile: '',
        isDefault: false
      },
      // 地址表单校验规则
      addressRules: {
        receiver: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 50, message: '姓名格式不符', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入地址详情', trigger: 'blur' },
          { min: 5, max: 50, message: '街道地址字数过短', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        provinceCode: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityCode: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        distinctCode: [
          { required: true, message: '请选择区', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getProvinces();
  },
  watch: {
    address: function () {
      this.addressForm = this.address;
      this.init();
    }
  },
  methods: {
    init () {
      if (this.addressForm.id) {
        this.initAreas(this.addressForm.provinceId + '', this.addressForm.cityId + '', this.addressForm.distinctId + '');
      }
      this.resetAddress();
    },
    /* 地址模块 start */
    getProvinces () {
      myCourseService.getProvinces().then((response) => {
        if (response && response.length) {
          this.provinces = response || [];
        }
      });
    },
    initAreas (provinceId, cityId, distinctId) {
      if (this.provinces && this.provinces.length) {
        // 省列表已有数据
        this.initAreas2(provinceId, cityId, distinctId);
      } else {
        // 省列表无数据,接口查询省列表
        myCourseService.getProvinces().then((provinces) => {
          if (provinces && provinces.length) {
            this.provinces = provinces || [];
            this.initAreas2(provinceId, cityId, distinctId);
          }
        });
      }
    },
    initAreas2 (provinceId, cityId, distinctId) {
      for (let i = 0, l0 = this.provinces.length; i < l0; i++) {
        if (this.provinces[i].areaId === provinceId) {
          this.addressForm.provinceCode = this.provinces[i].areaCode;
          break;
        }
      }
      myCourseService.getAreas(this.addressForm.provinceCode).then((cities) => {
        if (cities && cities.length) {
          this.cities = cities || [];
          this.isCityShow = true;
          for (let j = 0, l1 = this.cities.length; j < l1; j++) {
            if (this.cities[j].areaId === cityId) {
              this.addressForm.cityCode = this.cities[j].areaCode;
              break;
            }
          }
          myCourseService.getAreas(this.addressForm.cityCode).then((distincts) => {
            if (distincts && distincts.length) {
              this.distincts = distincts || [];
              this.isDistrictShow = true;
              for (let k = 0, l2 = this.distincts.length; k < l2; k++) {
                if (this.distincts[k].areaId === distinctId) {
                  this.addressForm.distinctCode = this.distincts[k].areaCode;
                  break;
                }
              }
            } else {
              this.distincts = [];
              this.isDistrictShow = false;
            }
          });
        } else {
          this.cities = [];
          this.distincts = [];
          this.isCityShow = false;
          this.isDistrictShow = false;
        }
      });
    },
    getAreas (areaCode) {
      if (areaCode) {
        myCourseService.getAreas(areaCode).then((response) => {
          if (response && response.length) {
            let signCode = areaCode.substr(2, 4);
            if (signCode === '0000') {
              this.cities = response || [];
              this.addressForm.cityCode = '';
              this.addressForm.distinctCode = '';
              this.isCityShow = true;
              this.isDistrictShow = true;
            } else {
              this.distincts = response || [];
              this.addressForm.distinctCode = '';
              this.isDistrictShow = true;
            }
          } else {
            let signCode = areaCode.substr(2, 4);
            if (signCode === '0000') {
              this.cities = [];
              this.distincts = [];
              this.isCityShow = false;
              this.isDistrictShow = false;
            } else {
              this.distincts = [];
              this.isDistrictShow = false;
            }
          }
        });
      }
    },
    setDistincts () {
      // 更新视图
      this.distincts = this.distincts.slice();
    },
    selectedArea () {
      for (let i = 0, l = this.provinces.length; i < l; i++) {
        if (this.addressForm.provinceCode === this.provinces[i].areaCode) {
          this.addressForm.provinceId = this.provinces[i].areaId;
          this.addressForm.provinceName = this.provinces[i].areaName;
          break;
        }
      }
      for (let i = 0, l = this.cities.length; i < l; i++) {
        if (this.addressForm.cityCode === this.cities[i].areaCode) {
          this.addressForm.cityId = this.cities[i].areaId;
          this.addressForm.cityName = this.cities[i].areaName;
          break;
        }
      }
      for (let i = 0, l = this.distincts.length; i < l; i++) {
        if (this.addressForm.distinctCode === this.distincts[i].areaCode) {
          this.addressForm.distinctId = this.distincts[i].areaId;
          this.addressForm.distinctName = this.distincts[i].areaName;
          break;
        }
      }
    },
    resetAddress () {
      if (this.$refs['addressForm']) {
        this.$refs['addressForm'].resetFields();
      }
    },
    saveAddress () {
      this.$refs['addressForm'].validate((valid) => {
        if (valid) {
          this.doSaveAddress();
        } else {
          return false;
        }
      });
    },
    doSaveAddress () {
      if (store.state.isVisitor) {
        this.promptMessage('游客不支持收货地址管理哦，请先登录！', 'error');
        return false;
      }
      this.selectedArea();
      let params = {
        id: this.addressForm.id,
        address: this.addressForm.detail,
        provinceId: this.addressForm.provinceId,
        provinceName: this.addressForm.provinceName,
        cityId: this.addressForm.cityId,
        cityName: this.addressForm.cityName,
        distinctId: this.addressForm.distinctId,
        distinctName: this.addressForm.distinctName,
        isDefault: this.addressForm.isDefault,
        mobile: this.addressForm.mobile,
        receiver: this.addressForm.receiver
      };
      myCourseService.saveAddress(params).then((response) => {
        if (response === 'success') {
          // 触发父组件保存成功事件，关闭对话框
          this.$emit('save-success');
        } else {
          let note = this.addressForm.id ? '修改' : '添加';
          this.promptMessage(note + '失败，请稍后再试~', 'error');
        }
      });
    }
  }
}
</script>
<style scoped>
.red{
  color: red;
}
</style>
