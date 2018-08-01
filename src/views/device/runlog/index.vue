<template>
  <div class="page">
    <template>
        <el-table :data="page" style="width: 100%" border stripe size="mini" v-loading="loading">
            <el-table-column :resizable="false" label="日志id" prop="logId" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="设备id" prop="deviceId" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="mac地址" prop="mac" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="IP地址" prop="ip" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="日志详细信息" prop="logText" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="状态码" prop="status" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="错误码" prop="deviceError" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="日志级别" prop="level">
                <template slot-scope="scope">
                    <p v-if="scope.row.level === 0">缺省</p>
                    <p v-else-if="scope.row.level === 1">INFO级别</p>
                    <p v-else-if="scope.row.level === 2">Warn级别</p>
                    <p v-else="scope.row.level === 3">严重</p>
                </template>
            </el-table-column>
            <el-table-column :resizable="false" label="日志时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
        </el-table>        
    </template>  
  </div>  
</template>
<script>
export default {
  name: "runlog",
  data() {
    return {
      loading: false,
      currentPage: 1, //当前页数
      pagesize: 10, //每页显示条目个数
      tableData: []
    };
  },
  computed: {
    page() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  mounted() {
  }    
};
</script>
<style lang="less" scoped>
</style>
