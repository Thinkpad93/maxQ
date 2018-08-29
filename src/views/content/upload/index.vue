<template>
   <div class="page">
      <template>
          <el-row :gutter="10">
              <el-col :span="24">
                  <div class="page-form">
                      <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                          <el-form-item label="内容标题">
                              <el-input v-model="query.title" placeholder="请输入栏目模板" maxlength="40"></el-input>
                          </el-form-item>
                          <el-form-item label="审核状态">
                            <el-select v-model="query.checkStage" clearable placeholder="请选择设备状态">
                                <el-option
                                    v-for="item in checkStageList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>                  
                            </el-select>                              
                          </el-form-item>
                          <el-form-item>
                                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                                <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">上传内容</el-button>
                          </el-form-item>                           
                      </el-form>
                  </div>
              </el-col>
          </el-row>
      </template> 
      <!-- 上传列表 -->
      <template>
          <el-table :data="tableData" style="width: 100%" border stripe :height="tableHeight" size="mini" v-loading="loading">
              <el-table-column :resizable="false" label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="内容类型" prop="ContentType" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="内容属性" prop="contentProperty" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="作者" prop="author" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="审核阶段" prop="checkStage" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="审核状态" prop="verifyStatus" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
      </template>
   </div> 
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      dialogAdd: false,
      loading: false,
      query: {
        schoolId: 0,
        checkStage: 4,
        title: "",
        page: 1,
        pageSize: 10
      },
      checkStageList: [
        { value: 0, label: "待审核" },
        { value: 1, label: "初审" },
        { value: 2, label: "复审" },
        { value: 3, label: "终审" },
        { value: 4, label: "全部" }
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
    search() {}
  }
};
</script>
<style lang="less" scoped>
</style>
