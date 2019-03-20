<template>
  <div class="page">
    <!-- 作品集详情 -->
    <el-table :data="worksData" style="width: 100%" stripe size="small">
      <el-table-column prop="worksId" label="作品ID"></el-table-column>
      <el-table-column prop="smallUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.smallUrl" alt style="width:40px;height:40px">
        </template>
      </el-table-column>
      <el-table-column prop="verifyStatus" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.verifyStatus === 0">待审核</span>
          <span v-else-if="scope.row.verifyStatus === 1">审核通过</span>
          <span v-else>审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="verifyDescrition" label="审核意见"></el-table-column>
      <el-table-column prop="verifyTime" label="审核时间"></el-table-column>
      <el-table-column prop="recommend" label="推荐">
        <template slot-scope="scope">
          <template v-if="scope.row.verifyStatus === 1">
            <el-switch v-model="scope.row.recommend" @change="handleChangeSwitch"></el-switch>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="qx-pagination" v-if="totalCount">
      <el-pagination
        background
        small
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-size="query.pageSize"
        layout="total,prev, pager, next"
        :total="worksCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "",
  data() {
    return {
      query: {
        collectionId: this.$route.params.id,
        page: 1,
        pageSize: 200
      },
      worksCount: 0,
      worksData: []
    };
  },
  methods: {
    handleChangeSwitch(value) {},
    //作品推荐
    async recommendWorks(params = {}) {
      let res = await service.recommendWorks(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
      }
    },
    //作品集详情查询
    async queryWorksDetailList(params = {}) {
      let res = await service.queryWorksDetailList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        if (res.data.totalCount) {
          this.dialogWorks = true;
          this.worksData = res.data.data || [];
          this.worksCount = res.data.totalCount;
        }
      }
    }
  },
  activated() {
    this.queryWorksDetailList(this.query);
  }
};
</script>

<style lang="less" scoped>
</style>
