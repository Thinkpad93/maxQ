<template>
  <div class="page">
    <div class="release">
      <template>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-tabs class="qx-page-tabs" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="待发布" name="first"></el-tab-pane>
              <el-tab-pane label="已发布" name="second"></el-tab-pane>
            </el-tabs>          
          </el-col>
        </el-row>
      </template>
      <!-- 表格数据 -->
      <template>
        <el-table :data="tableData" style="width: 100%" stripe size="small">
          <el-table-column label="内容编号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="内容标题" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="栏目名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="申请人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="申请时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="发布区域" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="发布学校" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="审核时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </template>
      <!-- 发布学校 -->
      <template>
        <el-dialog center top="40px" title="" :visible.sync="dialogView"></el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "release",
  data() {
    return {
      activeName: 'first',
      dialogView: false,
      tableData: []
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>
<style lang="less">
.release {
  padding: 10px 20px 0 20px;
  background-color: #fff;
}
</style>
