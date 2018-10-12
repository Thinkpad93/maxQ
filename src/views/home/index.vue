<template>
   <div class="page">
      <!-- <el-form :inline="true" size="small">
        <el-form-item label="区域选择">
          <el-select v-model="province" @change="handleProvince" style="width:150px;">
            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>  
          <el-select v-model="city" @change="handleCity" style="width:150px;">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>      
          <el-select v-model="area" @change="handleArea" style="width:150px;">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>                                     
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="query.schoolName" placeholder="请输入学校名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>      -->
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
      query: {
        queryId: 0,
        queryType: 0,
        schoolName: "",
        page: 1,
        pageSize: 10
      },
      state1: "",
      province: null,
      city: null,
      area: null,
      schoolId: null,
      restaurants: [],
      schoolList: [],
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  methods: {
    handleProvince(value) {
      this.queryRegion(value, 1);
      this.query.queryId = value;
      this.city = null;
      this.area = null;
    },
    handleCity(value) {
      this.queryRegion(value, 2);
      this.query.queryId = value;
      this.query.queryType = 1;
      this.area = null;
    },
    handleArea(value) {
      this.query.queryId = value;
      this.query.queryType = 2;
    },
    handleSearch() {
      this.showSchoolList(this.query);
    },
    async showSchoolList(params = {}) {
      let res = await service.showSchoolList(params);
      if (res.errorCode === 0) {
        this.restaurants = res.data.data;
        console.log(this.restaurants);
      }
    },
    async queryRegion(queryId, queryType) {
      let res = await service.queryRegion({ queryId, queryType });
      //默认查询全部
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
    //this.queryRegion(0, 0);
    //this.showSchoolList(this.query);
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
