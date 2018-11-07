<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <qx-region-t @regionChange="handleRegionChange"></qx-region-t>
              <el-form-item label="学校名称">
                <el-input v-model="query.schoolName" placeholder="请输入学校名称"></el-input>
              </el-form-item>                     
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="handleAddSchool">新增学校</el-button>
              </el-form-item>                
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
        <el-table-column label="学校ID" prop="schoolId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="学校名称" prop="name" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color:#409EFF">{{ scope.row.name }}</span>
            <!-- <router-link style="color:#409EFF" 
              :to="{path: `/school/views/${scope.row.schoolId}`}">{{ scope.row.name }}</router-link> -->
          </template>                    
        </el-table-column>
        <el-table-column label="学校性质" prop="propertyName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="学校类型" prop="typeName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="负责人" prop="headName" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.headName === null">无</span>
            <span v-else>{{ scope.row.headName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人电话" prop="headPhone" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.headPhone === null">无</span>
            <span v-else>{{ scope.row.headPhone }}</span>
          </template>          
        </el-table-column>
        <el-table-column label="地址" prop="address" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
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
  </div>  
</template>
<script>
import service from "@/api";
import regiont from "@/components/qxregion";
export default {
  name: "schoolManagement",
  components: {
    "qx-region-t": regiont
  },
  data() {
    return {
      query: {
        queryId: "",
        queryType: "",
        schoolName: "",
        page: 1,
        pageSize: 20
      },
      schoolId: null,
      //学校
      schoolList: [],
      //标签列表
      tableData: [],
      totalCount: 0
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
      this.showSchoolList();
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.showSchoolList();
    },
    handleRegionChange(queryId, queryType) {
      this.query.queryId = queryId;
      this.query.queryType = queryType;
    },
    handleSearch() {
      this.showSchoolList(this.query);
    },
    //新增学校
    handleAddSchool() {
      this.$router.push({ path: "/school/add" });
    },
    handleEdit(row) {
      this.$router.push({ path: `/school/edit/${row.schoolId}` });
    },
    //学校删除
    handleDel(row) {
      this.$confirm(`确定要删除学校吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSchool(row.schoolId);
        })
        .catch(error => {
          return false;
        });
    },
    //根据区域ID查省市
    async findRegion(regionId) {
      let res = await service.findRegion({ regionId });
      if (res.errorCode === 0) {
        this.edit.regionId = [
          res.data.province,
          res.data.city,
          res.data.region
        ];
      }
    },
    //删除学校
    async deleteSchool(schoolId) {
      let res = await service.deleteSchool({ schoolId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.showSchoolList();
      }
    },
    //显示学校列表
    async showSchoolList() {
      let res = await service.showSchoolList(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      } else if (res.errorCode === -1) {
      }
    }
  },
  activated() {
    this.showSchoolList();
  }
};
</script>
<style lang="less" scoped>
</style>
