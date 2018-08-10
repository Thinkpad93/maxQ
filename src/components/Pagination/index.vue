<template>
    <div class="pagination" v-if="total">   
        <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-size="query.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination> 
    </div>      
</template>
<script>
export default {
  name: "qxpagination",
  props: {
    query: {
      type: Object,
      default: {}
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    //pageSize 改变时会触发
    handleSizeChange(size) {
      console.log(size);
    },
    handleCurrentChange(curr) {
      console.log(curr);
    }
  },
  created() {
    //console.log(this.query);
  },
  mounted() {
    //console.log(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
