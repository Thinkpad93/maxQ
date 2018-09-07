export default {
  setSingle(self, row, tableData, params) {
    let that = self;
    for (let o in params) {
      that.$set(row, o, params[o])
    }
    if (Array.isArray(tableData)) {
      tableData.forEach((e, v) => {
        if (!e.show) {
          that.$set(e, 'show', false);
          that.$set(e, "state", 0);
        }
      })
    }
  }
}
