export default {
  data() {
    return {
      query: {
        page: 1,
        pageSize: 20
      },
      dialogFormVisible: false,
      tableData: [], //通用数据表格
      totalCount: 0 //分页总数
    }
  }
}
