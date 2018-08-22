<template>
  <div>
    <el-select v-model="province" placeholder="请选择省" @change="handleProvince">
        <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>                    
    </el-select>    
    <el-select v-model="city" placeholder="请选择市" @change="handleCity">
        <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>                    
    </el-select>  
    <el-select v-model="area" placeholder="请选择区" @change="handleArea">
        <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>                    
    </el-select>       
  </div>  
</template>
<script>
import { queryRegion } from "@/api/school";
export default {
  name: "region",
  props: {
    trigger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      region: {
        queryId: 0,
        queryType: 0
      },
      province: "",
      city: "",
      area: "",
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  methods: {
    handleProvince(value) {
      console.log(value);
      this.region.queryId = value;
      this.region.queryType = 1;
      this.city = null;
      this.area = null;
      this.distpicker(this.region);
    },
    handleCity(value) {
      this.region.queryId = value;
      this.region.queryType = 2;
      this.area = null;
      this.distpicker(this.region);
    },
    handleArea(value) {
      this.region.queryId = value;
      this.region.queryType = 3;
      this.distpicker(this.region);
    },
    //统一查询
    distpicker(params = {}) {
      queryRegion(params).then(res => {
        if (res.errorCode === 0) {
          if (params.queryType === 0) {
            this.provinceList = res.data;
          }
          if (params.queryType === 1) {
            this.cityList = res.data;
          }
          if (params.queryType === 2) {
            this.areaList = res.data;
          }
          if (params.queryType === 3) {
            if (this.trigger) {
              this.$emit("change", res.data);
            }else {
              this.$emit("change", this.area);
            }
          }
        }
      });
    }
  },
  mounted() {
    this.distpicker(this.region);
  }
};
</script>
<style lang="less" scoped>
</style>
