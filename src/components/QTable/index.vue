<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="data" border size="mini">
        <template v-for="(column, index) in columns">
          <el-table-column :key="index" v-bind="column || {}"></el-table-column>
        </template>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "base-table",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>
