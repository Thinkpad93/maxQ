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
                          <el-form-item label="审核阶段">
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
                                <el-button icon="el-icon-plus" type="primary" @click="uoloadAction">上传内容</el-button>
                          </el-form-item>                           
                      </el-form>
                  </div>
              </el-col>
          </el-row>
      </template> 
      <!-- 上传列表 -->
      <template>
          <el-table :data="tableData" style="width: 100%" stripe :height="tableHeight" size="mini" v-loading="loading">
              <el-table-column :resizable="false" label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="内容标题" prop="title" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                      <span style="color:#409EFF">{{ scope.row.title }}</span>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column :resizable="false" label="内容类型" prop="contentType" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                      <p v-if="scope.row.contentType === 0">全屏播放</p>
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
              <el-table-column :resizable="false" label="审核阶段" prop="checkStage" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                      <p v-if="scope.row.checkStage === 0">待审核</p>
                      <p v-else-if="scope.row.checkStage === 1">初审</p>
                      <p v-else-if="scope.row.checkStage === 2">复审</p>
                      <p v-else>终审</p>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="审核状态" prop="verifyStatus" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                      <p v-if="scope.row.verifyStatus === 0" style="color:#409EFF">初始</p>
                      <p v-else-if="scope.row.verifyStatus === 1" style="color:#67C23A;">审核通过</p>
                      <p v-else style="color:#F56C6C;">审核不通过</p>
                  </template>
              </el-table-column>
              <el-table-column :resizable="false" label="时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="text" @click="handleDel(scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
    <!-- 分页 -->
    <template>
      <div class="pagination" v-if="tableData.length">   
          <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-size="query.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination> 
      </div>   
    </template>          
   </div> 
</template>
<script>
import service from "@/api";
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
      totalCount: 0,
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
    search() {
      this.createTable();
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit(row) {
      //this.$router.push({ name: 'uploadContentEdit', params: row });
      this.$router.push({ path: `/content/uploadContentEdit/${row.contentId}` });
    },
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteTable(row.contentId);
        })
        .catch(error => {
          return false;
        });
    },
    uoloadAction() {
      this.$router.push({ path: "/content/uploadContent" });
    },
    createTable() {
      queryContentList(this.query).then(res => {
        console.log(res);
        if (res.errorCode === 0) {
          let data = res.data.data;
          if (!Array.isArray(data)) {
            data = [];
          } else {
            this.tableData = data;
          }
          this.totalCount = res.data.totalCount;
        }
      });
    },
    deleteTable(contentId) {
      deleteContent({ contentId }).then(res => {
        if (res.errorCode === 0) {
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable();
        }
      });
    }
  },
  mounted() {
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
</style>
