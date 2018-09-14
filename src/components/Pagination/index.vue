<template>
    <div class="qx-pagination" v-if="total">   
      <el-pagination
        background
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> 
    </div>      
</template>
<script>
export default {
  name: "qxpagination",
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(size) {
      console.log(size);
    },
    handleCurrentChange(curr) {
      this.$emit('page-change', curr);
    }
  },
};
</script>
<style lang="less" scoped>
</style>
