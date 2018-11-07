<template>
  <div class="page">
    <div class="release">
      <template>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-tabs class="qx-page-tabs" v-model="query.status" @tab-click="handleClick">
              <el-tab-pane label="待发布" name="0"></el-tab-pane>
              <el-tab-pane label="已发布" name="1"></el-tab-pane>
            </el-tabs>          
          </el-col>
        </el-row>
      </template>
      <!-- 表格数据 -->
      <template>
        <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
          <el-table-column label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="申请人" prop="userName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="申请时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="发布区域" prop="regionName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="发布学校" prop="schoolName" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#409EFF;cursor:pointer;" @click="handleViewSchool(scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="query.status == 0" size="mini" type="primary" @click="handleRelease(scope.row)">发布</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <template>
        <div class="qx-pagination">
          <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </template>         
      <!-- 待发布学校 -->
      <template>
        <el-dialog center top="40px" title="待发布学校查看" :visible.sync="dialogView">
          <el-table :data="schoolData" style="width: 100%" border stripe size="mini">
            <el-table-column label="学校名称" :show-overflow-tooltip="true" property="schoolName"></el-table-column>
            <el-table-column label="发布状态" :show-overflow-tooltip="true" property="status">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0" style="color:#409EFF">待发布</span>
                <span v-else style="color:#67C23A">已发布</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </template>
      <!-- 已发布学校 -->
      <template>
        <el-dialog center top="40px" title="已发布学校查看" :visible.sync="dialogViewPublish">
          <el-table :data="schoolDataPublish" style="width: 100%" border stripe size="mini">
            <el-table-column label="学校名称" :show-overflow-tooltip="true" property="schoolName"></el-table-column>
            <el-table-column label="发布状态" :show-overflow-tooltip="true" property="status">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0" style="color:#909399">初始</span>
                <span v-else-if="scope.row.status === 1" style="color:#409EFF">已更新到栏目</span>
                <span v-else-if="scope.row.status === 2" style="color:#67C23A">已更新到终端</span>
                <span v-else style="color:#F56C6C">更新到终端失败</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>        
      </template>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "release",
  data() {
    return {
      activeName: "first",
      dialogView: false,
      dialogViewPublish: false,
      query: {
        status: "0",
        page: 1,
        pageSize: 10
      },
      tableData: [],
      totalCount: 0,
      schoolData: [],
      schoolDataPublish: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.queryPublishContentList(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.queryPublishContentList(this.query);
    },
    handleViewSchool(row) {
      if (this.query.status == 1) {
        this.queryPublishSchoolInfo(row.prePublishId);
      } else {
        this.queryPrePublishSchoolInfo(row.prePublishId);
      }
    },
    handleClick(tab) {
      //tab 实例
      this.query.status = tab.name;
      let obj = Object.assign({}, this.query, { status: parseInt(tab.name) });
      this.queryPublishContentList(obj);
    },
    handleRelease(row) {
      this.$confirm(`您确定要发布内容?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.publishContent(row.contentId);
        })
        .catch(error => {
          return false;
        });
    },
    //查询待发布内容列表
    async queryPublishContentList(params = {}) {
      let res = await service.queryPublishContentList(params);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //进行内容正式发布
    async publishContent(contentId) {
      let res = await service.publishContent({ contentId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryPublishContentList(this.query);
      }
    },
    //内容发布（待发布）学校信息
    async queryPrePublishSchoolInfo(prePublishId) {
      let res = await service.queryPrePublishSchoolInfo({ prePublishId });
      if (res.errorCode === 0) {
        this.dialogView = true;
        this.schoolData = res.data;
      }
    },
    //内容发布（已发布）学校信息
    async queryPublishSchoolInfo(prePublishId) {
      let res = await service.queryPublishSchoolInfo({ prePublishId });
      if (res.errorCode === 0) {
        this.dialogViewPublish = true;
        this.schoolDataPublish = res.data;
      }
    }
  },
  activated() {
    this.queryPublishContentList(this.query);
  }
};
</script>
<style lang="less">
.release {
  padding: 10px 20px 0 20px;
  background-color: #fff;
}
</style>
