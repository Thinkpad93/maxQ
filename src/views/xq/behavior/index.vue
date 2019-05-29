<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd"></div>
    <el-dialog top="40px" title="新增行为" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" status-icon></el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      query: {},
      form: {}
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
