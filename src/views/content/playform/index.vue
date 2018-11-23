<template>
   <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <qx-region-t @regionChange="handleRegionChange"></qx-region-t>
              </el-form-item>
              <el-form-item label="学校名称">
                <el-autocomplete 
                  v-model="query.schoolName" 
                  placeholder="请输入学校名称" 
                  :trigger-on-focus="false"
                  :fetch-suggestions="querySearch"
                  @select="handleSelectSchool">
                </el-autocomplete>
              </el-form-item>                  
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" stripe size="small">
        <el-table-column label="学校ID" prop="schoolId"></el-table-column>
        <el-table-column label="学校名称" prop="schoolName"></el-table-column>
        <el-table-column label="区域" prop="region"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleShowPlayList(scope.row)">查看播放列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>   
   </div> 
</template>
<script>
import service from "@/api";
import regiont from "@/components/qxregion";
export default {
  name: "playform",
  components: {
    "qx-region-t": regiont
  },
  data() {
    return {
      query: {
        page: 1,
        pageSize: 20
      },
      tableData: []
    };
  },
  computed: {},
  methods: {
    handleSearch() {
      if (this.query.schoolName && this.schoolId) {
        this.querySchoolPlayChannel(this.schoolId);
      }
    },
    handleShowPlayList(row) {
      this.$router.push({ path: `/content/playshow/${row.schoolId}` });
    },
    async querySearch(queryString, cb) {
      let { scopeId, scopeType } = this.query;
      if (queryString) {
        let res = await service.selectSchoolNameLike({
          scopeId,
          scopeType,
          schoolName: queryString
        });
        if (res.errorCode === 0) {
          cb(res.data);
        }
      }
    },
    //根据关键字查询学校名称
    handleSelectSchool(value) {
      this.schoolId = value.schoolId;
      this.channelForm.schoolId = value.schoolId;
    },
    handleRegionChange(queryId, queryType) {
      this.query.scopeId = queryId;
      this.query.scopeType = queryType;
    },
    async schoolList() {
      let res = await service.schoolList(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
      }
    }
  },
  activated() {
    this.schoolList();
    //this.queryChannelAll();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
