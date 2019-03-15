<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="page-form">
          <el-form
            :inline="true"
            :model="query"
            size="small"
            label-width="70px"
            label-position="left"
          >
            <el-form-item label="作品类别">
              <el-select v-model="query.type" placeholder="选择标签类型">
                <el-option
                  v-for="item in worksTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary">查询</el-button>
              <el-button size="small" icon="el-icon-plus" type="primary">上传作品</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%" stripe size="small">
      <el-table-column label="作品集ID" prop="collectionId" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="学校名称" prop="name" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="作品类型" prop="type" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.type === 1">美术</span>
          <span size="mini" v-else-if="scope.row.type === 2">书法</span>
          <span size="mini" v-else>作业</span>
        </template>
      </el-table-column>
      <el-table-column label="处理阶段" prop="processStage" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.processStage === 0">待处理</span>
          <span size="mini" v-else>处理完成</span>
        </template>
      </el-table-column>
      <el-table-column label="审核阶段" prop="checkStage" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.checkStage === 0">待审核</span>
          <span size="mini" v-else>审核完成</span>
        </template>
      </el-table-column>
      <el-table-column label="上传时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import service from "@/api";
import { worksType } from "@/mixins";
export default {
  name: "",
  mixins: [worksType],
  data() {
    return {
      query: {
        type: 1,
        checkStage: 1,
        title: "",
        page: 1,
        pageSize: 20
      },
      tableData: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    //学生作品查询
    async queryWorksCollection(params = {}) {
      let res = await service.queryWorksCollection(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
      }
    },
    //作品集详情查询
    async queryWorksDetail(collectionId) {
      let res = await service.queryWorksDetail({ collectionId });
      if (res.errorCode === 0) {
      }
    }
  },
  activated() {
    this.queryWorksCollection(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
