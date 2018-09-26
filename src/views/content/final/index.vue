<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="内容标题">
                <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="10"></el-input>
              </el-form-item>              
              <el-form-item label="审核状态">
                <el-select v-model="query.verifyStatus" clearable placeholder="请选择审核状态">
                  <el-option
                    v-for="item in verifyStatusList"
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
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
        <el-table-column label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="账号名称" prop="userName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="内容类型" prop="contentType" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="时长" prop="duration" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="专属类别" prop="belongTo" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="审批的详细内容" prop="verifyDescrition" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上传时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleStage(scope.row)">预览审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template>
      <qx-pagination 
        @page-change="pageChange" 
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>          
  </div>    
</template>
<script>
import service from "@/api";
import pagination from "@/components/pagination";
export default {
  name: "review",
  components: {
    'qx-pagination': pagination
  },   
  data() {
    return {
      query: {
        schoolId: 0,
        title: "",
        checkStage: 3,
        verifyStatus: 0,
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
      tableData: [],
      verifyStatusList: [
        { value: 0, label: "待审核" },
        { value: 1, label: "审核通过" },
        { value: 2, label: "审核不通过 " },
      ]            
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },  
  methods: {
    pageChange(curr) {
      this.query.page = curr;
      this.querycheckContentList();
    },    
    search() {},
    handleStage(row) {

    },
    async queryCheckContentList() {
      let res = await service.queryCheckContentList(this.query);
      if (res.errorCode === 0) {
         this.tableData = res.data.data;  
      }
    }
  },
  mounted() {
    this.queryCheckContentList();
  }   
};
</script>
<style lang="less" scoped>
</style>
