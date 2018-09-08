<template>
  <div class="page">
    <template>
      <el-table :data="tableData" style="width: 100%" stripe size="mini" v-loading="loading">
        <el-table-column :resizable="false" label="日志id" prop="logId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="设备id" prop="deviceId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="mac地址" prop="mac" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="IP地址" prop="ip" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="日志详细信息" prop="logText" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="状态码" prop="status" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 0">正常</p>
            <p v-else-if="scope.row.status === 1">故障</p>
            <p v-else="scope.row.status === 2">正常关机</p>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" label="错误码" prop="deviceError" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :resizable="false" label="日志级别" prop="level">
          <template slot-scope="scope">
            <p v-if="scope.row.level === 0">无法描述的错误</p>
            <p v-else-if="scope.row.level === 1" style="color:#909399">INFO级别</p>
            <p v-else-if="scope.row.level === 2" style="color:#E6A23C">错误</p>
            <p v-else="scope.row.level === 3" style="color:#F56C6C">严重</p>
            </template>
          </el-table-column>
        <el-table-column :resizable="false" label="日志时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
      </el-table>        
    </template>      
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "runLog",
  data() {
    return {
      loading: false,
      query: {
        schoolId: 0
      },
      totalCount: 0,
      tableData: []
    };
  },
  methods: {
    //显示设备运行日志
    async createTable() {
      this.loading = true;
      let res = await service.showDeviceRunlog(this.query);
      if (res.errorCode === 0) {
        this.loading = false;
        this.tableData = res.data;
      }
    }
  },
  mounted() {
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
</style>
