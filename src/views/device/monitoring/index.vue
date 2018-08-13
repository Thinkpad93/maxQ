<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item>
                <el-autocomplete
                  class="inline-input"
                  v-model="query.state1"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入学校名称"
                  @select="handleSelect"
                ></el-autocomplete>                
              </el-form-item>          
              <el-form-item>
                <el-select v-model="query.status" placeholder="请选择设备状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>                  
                </el-select>
              </el-form-item> 
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>      
    </template> 
    <template>
      <el-row :gutter="15">
        <el-col :span="4">
          <div class="">
            <el-card shadow="never" :body-style="{ padding: '0px' }">
              <img src="http://temp.im/466x266/4CD964/fff" class="image">
              <div style="padding: 14px;position: relative;">
                 <span>好吃的汉堡</span>
                 <div class="bottom clearfix">

                 </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <!-- <el-table :data="tableData" style="width: 100%" border stripe :height="tableHeight" size="mini" v-loading="loading">
        <el-table-column :resizable="false" label="设备ID" prop="id" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="mac" prop="mac" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="IP地址" prop="ip" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="状态码" prop="status" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="错误码" prop="deviceError" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="快照图片" prop="snapshotUrl" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="快照时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
      </el-table> -->
    </template>
  </div>  
</template>
<script>
export default {
  name: "monitoring",
  data() {
    return {
      dialogAdd: false,
      loading: false,
      restaurants: [],
      query: {
        state1: "",
        status: "",
        page: 1,
        page_size: 10
      },
      options: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "故障"
        },
        {
          value: "2",
          label: "正常关机"
        }
      ],
      tableData: []
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    search() {},
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" }
      ];
    },
    handleSelect() {}
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
<style lang="less" scoped>
</style>
