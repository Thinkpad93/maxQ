
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
              <el-select v-model="query.type" placeholder="选择作品类别">
                <el-option
                  v-for="item in worksTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核时间">
              <el-date-picker
                v-model="query.startTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%" stripe size="small">
      <el-table-column label="作品集ID" prop="collectionId" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="作品标题" prop="title" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span
            style="color:#409EFF;cursor:pointer;"
            @click="handleWorksInfo(scope.row.collectionId)"
          >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作品类型" prop="type" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.type === 1">美术</span>
          <span size="mini" v-else-if="scope.row.type === 2">书法</span>
          <span size="mini" v-else>作业</span>
        </template>
      </el-table-column>
      <el-table-column label="所属学校" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="上传时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import service from "@/api";
import { checkStage, worksType } from "@/mixins";
export default {
  name: "worksCheck",
  mixins: [checkStage, worksType],
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
      totalCount: 0,
      tableData: []
    };
  },
  methods: {
    //学生作品查询--审核列表
    async queryWorksCollection(params = {}) {
      let res = await service.queryWorksCollection(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data || [];
        this.totalCount = res.data.totalCount;
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
