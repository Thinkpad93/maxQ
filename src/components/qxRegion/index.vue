<template>
    <el-form-item label="区域选择" prop="regionId" ref="region">   
      <el-select :clearable="clear" v-model="province" @change="handleProvince" placeholder="选择省" style="width:150px;">
        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>  
      <el-select :clearable="clear" v-model="city" @change="handleCity" placeholder="选择市" style="width:150px;">
        <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>      
      <el-select :clearable="clear" v-model="area" @change="handleArea" placeholder="选择区" style="width:150px;">
        <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>                                     
    </el-form-item>       
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "",
  props: {
    clear: {
      type: Boolean,
      default: true
    },
    propName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      province: "",
      city: "",
      area: "",
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  computed: {
    //...mapState("comm", ["distpickerData"])
  },
  methods: {
    handleProvince(value) {
      //不触发点击清空时的调用
      if (typeof value === "number") {
        this.queryRegion(value, 1); //查省份下的市
        this.handleEmit(value, 0); //0查省份
      } else if (typeof value === "string") {
        this.cityList.length = 0;
        this.areaList.length = 0;
        this.handleEmit("", ""); //如果清空了省，则传空字符串
      }
      this.city = null;
      this.area = null;
    },
    handleCity(value) {
      if (typeof value === "number") {
        this.queryRegion(value, 2); //查市级下的区
        this.handleEmit(value, 1); //查市级
      } else if (typeof value === "string") {
        this.areaList.length = 0;
        this.handleEmit(this.province, 0);
      }
      this.area = null;
    },
    handleArea(value) {
      if (typeof value === "number") {
        this.handleEmit(value, 2); //查区级
      } else if (typeof value === "string") {
        this.handleEmit(this.city, 1);
      }
    },
    //emit
    handleEmit(queryId, queryType) {
      this.$emit("regionChange", queryId, queryType);
    },
    async queryRegion(queryId, queryType) {
      let res = await service.queryRegion({ queryId, queryType });
      if (res.errorCode === 0) {
        if (queryType === 0) {
          this.provinceList = res.data;
        } else if (queryType === 1) {
          this.cityList = res.data;
        } else if (queryType === 2) {
          this.areaList = res.data;
        }
      }
    }
  },
  mounted() {
    this.queryRegion(0, 0);
  }
};
</script>
<style lang="less" scoped>
</style>
