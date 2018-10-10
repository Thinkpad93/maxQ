<template>
   <div class="page">
      <el-form size="small">
        <el-form-item label="区域选择" prop="area">
          <el-select v-model="province" @change="handleProvince">
            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>  
          <el-select v-model="city" @change="handleCity">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>      
          <el-select v-model="area" @change="handleArea">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>                                     
        </el-form-item>
      </el-form>     
      <div class="exception-content">
        <img src="@/assets/empty-content.png" alt="" style="max-width: 260px;">
          <div>
            <h3>页面暂无内容</h3>
            <p>抱歉，页面暂无内容，请看看其他页面</p>
          </div>
      </div>
    </div> 
</template>
<script>
import service from "@/api";
import { mapActions } from "vuex";
export default {
  name: "home",
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
      this.queryRegion(value, 1);
      this.city = null;
      this.area = null;
    },
    handleCity(value) {
      this.queryRegion(value, 2);
      this.area = null;
    },
    handleArea(value) {},
    async queryRegion(queryId, queryType) {
      let res = await service.queryRegion({ queryId, queryType });
      if (res.errorCode === 0) {
        if (queryType === 0) {
          this.provinceList = res.data;
        }
        if (queryType === 1) {
          this.cityList = res.data;
        }
        if (queryType === 2) {
          this.areaList = res.data;
        }
      }
    }
  },
  mounted() {
    this.queryRegion(0, 0);
    //this.$store.dispatch("comm/qxregion");
  }
};
</script>
<style lang="less" scoped>
.exception-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  img {
    margin-right: 50px;
  }
  h3 {
    color: rgb(51, 51, 51);
    font-size: 24px;
    margin: 20px 0;
  }
  p {
    color: rgb(102, 102, 102);
    font-size: 16px;
  }
}
</style>
