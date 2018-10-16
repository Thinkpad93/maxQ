<template>
   <div class="page">
      <template>
          <el-row :gutter="10">
              <el-col :span="24">
                  <div class="page-form">
                      <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                          <el-form-item label="内容标题">
                              <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="40"></el-input>
                          </el-form-item>
                          <el-form-item label="审核状态">
                            <el-select v-model="query.verifyStatus" clearable placeholder="请选择设备状态">
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
                                <el-button icon="el-icon-plus" type="primary" @click="uoloadAction">上传内容</el-button>
                          </el-form-item>                           
                      </el-form>
                  </div>
              </el-col>
          </el-row>
      </template> 
      <!-- 上传列表 -->
      <template>
          <el-table :data="tableData" style="width: 100%" stripe :height="tableHeight" size="mini">
              <el-table-column :resizable="false" label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="内容标题" prop="title" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span style="color:#409EFF">{{ scope.row.title }}</span>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="栏目名称" prop="channelName" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <p v-if="scope.row.channelName == null">无</p>
                    <p v-else>{{ scope.row.channelName }}</p>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="内容类型" prop="contentType" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <p v-if="scope.row.contentType === 1">全屏播放</p>
                    <p v-else>滚动播放</p>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="内容属性" prop="contentProperty" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <p v-if="scope.row.contentProperty === 0">原创</p>
                    <p v-else>摘要</p>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="作者" prop="author" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="审核节点" prop="verifyStatus" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span v-if="scope.row.verifyStatus === 0 && scope.row.checkStage === 1" style="color:#409EFF">初审中</span>
                    <span v-else-if="scope.row.verifyStatus === 1 && scope.row.checkStage === 1" style="color:#409EFF">复审中</span>
                    <span v-else-if="scope.row.verifyStatus === 1 && scope.row.checkStage === 2" style="color:#409EFF">终审中</span>
                    <span v-else-if="scope.row.verifyStatus === 1 && scope.row.checkStage === 3" style="color:#67C23A;">审核通过</span>
                    <span v-else style="color:#F56C6C;cursor: pointer;" 
                    @click="handleCheckNode(scope.row)">审核不通过</span>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                    <router-link style="color:#409EFF" 
              :to="{path: `/content/uploadContentEdit/${scope.row.contentId}`}" v-if="scope.row.verifyStatus === 2">编辑</router-link>
                      <el-button size="mini" type="text" @click="handleDel(scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
    <!-- 分页 -->
    <template>
      <qx-pagination 
        @page-change="pageChange" 
        @page-size="pageSize"
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>  
    <!-- 查看审核节点 -->
    <template>
      <el-dialog width="60%" center top="40px" title="审核节点" :visible.sync="dialogNode">
        <el-table :data="nodeData"  style="width: 100%" border stripe size="mini">
          <el-table-column width="150" type="index" label="申请编号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column width="150" property="checkStage" label="审核环节" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.checkStage === 0">待审核</span>
              <span v-else-if="scope.row.checkStage === 1">初审</span>
              <span v-else-if="scope.row.checkStage === 2">复审</span>
              <span v-else>终审</span>
            </template>
          </el-table-column>
          <el-table-column width="150" property="verifyStatus" label="审核结果" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#409EFF" v-if="scope.row.verifyStatus === 0">初始</span>
              <span style="color:#67C23A;" v-else-if="scope.row.verifyStatus === 1">审核通过</span>
              <span style="color:#F56C6C;" v-else>审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column width="150" property="postTime" label="审核时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column property="verifyDescription" label="审核意见" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </el-dialog>
    </template>        
   </div> 
</template>
<script>
import service from "@/api";
import pagination from "@/components/pagination";
export default {
  name: "upload",
  components: {
    "qx-pagination": pagination
  },
  data() {
    return {
      dialogNode: false,
      query: {
        verifyStatus: 3,
        title: "",
        page: 1,
        pageSize: 20
      },
      totalCount: 0,
      verifyStatusList: [
        { value: 0, label: "审核中" },
        { value: 1, label: "审核通过" },
        { value: 2, label: "审核不通过 " },
        { value: 3, label: "全部" }
      ],
      tableData: [],
      nodeData: []
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    pageChange(curr) {
      this.query.page = curr;
      this.queryContentList();
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.queryContentList();
    },
    search() {
      this.queryContentList();
    },
    handleCheckNode(row) {
      let { contentId, verifyStatus } = row;
      if (contentId && verifyStatus === 2) {
        this.dialogNode = true;
        this.queryCheckNode(contentId);
      }
    },
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteContent(row.contentId);
        })
        .catch(error => {
          return false;
        });
    },
    uoloadAction() {
      this.$router.push({ path: "/content/uploadContent" });
    },
    //查询上传列表审核节点
    async queryCheckNode(contentId) {
      let res = await service.queryCheckNode({ contentId });
      if (res.errorCode === 0) {
        this.nodeData = res.data;
      }
    },
    //查询我的上传列表
    async queryContentList() {
      let res = await service.queryContentList(this.query);
      if (res.errorCode === 0) {
        let data = res.data.data;
        if (!Array.isArray(data)) {
          data = [];
        } else {
          this.tableData = data;
        }
        this.totalCount = res.data.totalCount;
      }
    },
    //删除上传内容
    async deleteContent(contentId) {
      let res = await service.deleteContent({ contentId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryContentList();
      } else if (res.errorCode === -1) {
        this.$message({ message: `${res.errorMsg}`, type: "error" });
      }
    }
  },
  mounted() {},
  activated() {
    this.queryContentList();
  }
};
</script>
<style lang="less" scoped>
</style>
