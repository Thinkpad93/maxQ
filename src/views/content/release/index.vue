<template>
  <div class="page">
    <div class="release">
      <template>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-tabs class="qx-page-tabs" v-model="query.status" @tab-click="handleClick">
              <el-tab-pane label="待发布" name="1"></el-tab-pane>
              <el-tab-pane label="已发布" name="2"></el-tab-pane>
            </el-tabs>          
          </el-col>
        </el-row>
      </template>
      <!-- 表格数据 -->
      <template>
        <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
          <el-table-column label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="学校ID" prop="schoolId" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="申请人" prop="userName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="申请时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="发布区域" prop="channelId" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="发布学校" prop="schoolName" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#409EFF" @click="handleViewSchool(scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleRelease(scope.row)">发布</el-button>
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
      <!-- 发布学校 -->
      <template>
        <el-dialog center top="40px" title="" :visible.sync="dialogView"></el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import pagination from "@/components/pagination";
export default {
  name: "release",
  components: {
    "qx-pagination": pagination
  },  
  data() {
    return {
      activeName: 'first',
      dialogView: false,
      query: {
        status: "1",
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
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
    pageChange(curr) {
      this.query.page = curr;
      this.queryChannel();
    },    
    handleViewSchool(row) {
      this.dialogView = true;
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
      }
    },
    //进行内容正式发布
    async publishContent(contentId) {
      let res = await service.publishContent({ contentId });
      console.log(res);
    },
    //内容发布学校信息
    async queryPublishContent(contentId) {
      let res = await service.queryPublishContent({ contentId });
      console.log(res);
    }
  },
  mounted() {
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
