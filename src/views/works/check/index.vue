
<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="page-form"></div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%" stripe size="small">
      <el-table-column label="作品集ID" prop="collectionId" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span
            style="color:#409EFF;cursor:pointer;"
            @click="handleWorksInfo(scope.row.collectionId)"
          >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import service from "@/api";
import { verifyStatus, worksType } from "@/mixins";
export default {
  name: "",
  data() {
    return {
      query: {
        type: 0,
        checkStage: 0,
        title: "",
        startTime: "",
        endTime: "",
        page: 1,
        pageSize: 20
      },
      tableData: []
    };
  }
};
</script>
<style lang="less" scoped>
</style>
