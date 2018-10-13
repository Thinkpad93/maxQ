<template>
    <el-form-item label="区域选择" prop="regionId" ref="region">
      <el-select :clearable="clear" v-model="province" @change="handleProvince" @clear="handleClear" placeholder="选择省" style="width:150px;">
        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>  
      <el-select :clearable="clear" v-model="city" @change="handleCity" @clear="handleClear" placeholder="选择市" style="width:150px;">
        <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>      
      <el-select :clearable="clear" v-model="area" @change="handleArea" @clear="handleClear" placeholder="选择区" style="width:150px;">
        <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>                                     
    </el-form-item>       
</template>
<script>
import service from "@/api";
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
      province: null,
      city: null,
      area: null,
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  methods: {
    handleProvince(value) {
      //不触发点击清空时的调用
      if (typeof value === "number") {
        this.queryRegion(value, 1);
        this.handleEmit(value, 0); //0查省份
      } else if (typeof value === "string") {
        this.cityList.length = 0;
        this.areaList.length = 0;
      }
      this.city = null;
      this.area = null;
    },
    handleCity(value) {
      if (typeof value === "number") {
        this.queryRegion(value, 2);
        this.handleEmit(value, 1); //1查市级
      } else if (typeof value === "string") {
        this.areaList.length = 0;
      }
      this.area = null;
    },
    handleArea(value) {
      if (typeof value === "number") {
        this.handleEmit(value, 2); //2查区级
      }
    },
    handleClear() {
      console.log("10");
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
