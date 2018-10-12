<template>
    <el-form-item label="区域选择">
        <el-select v-model="province" @change="handleProvince" placeholder="选择省" style="width:150px;">
            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>  
        <el-select v-model="city" @change="handleCity" placeholder="选择市" style="width:150px;">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>      
        <el-select v-model="area" @change="handleArea" placeholder="选择区" style="width:150px;">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>                                     
    </el-form-item>       
</template>
<script>
import service from "@/api";
export default {
  name: "",
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
      this.city = null;
      this.area = null;
      this.queryRegion(value, 1);
      this.handleEmit(value, 0); //0查省份
    },
    handleCity(value) {
      this.area = null;
      this.queryRegion(value, 2);
      this.handleEmit(value, 1); //1查市级
    },
    handleArea(value) {
      this.handleEmit(value, 2); //2查区级
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
