
<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="page-form">
          <el-form
            :inline="true"
            :model="query"
            size="small"
            label-width="70px"
            label-position="left"
          >
            <el-form-item label="作品类别">
              <el-select v-model="query.type" placeholder="选择作品类别">
                <el-option
                  v-for="item in worksTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="query.checkStage">
                <el-option
                  v-for="item in checkStageList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核时间">
              <el-date-picker
                v-model="query.startTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%" stripe size="small">
      <el-table-column label="作品集ID" prop="collectionId" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="作品标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="作品类型" prop="type" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.type === 1">美术</span>
          <span size="mini" v-else-if="scope.row.type === 2">书法</span>
          <span size="mini" v-else>作业</span>
        </template>
      </el-table-column>
      <el-table-column label="所属学校" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="上传时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleWorksInfo(scope.row.collectionId)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 作品集详情 -->
    <el-dialog width="60%" top="40px" title="作品列表" :visible.sync="dialogWorks">
      <el-dialog width="80%" append-to-body title="审核作品" :visible.sync="dialogCheckWorks">
        <el-row :gutter="10" type="flex" class="row-bg">
          <div class="one"></div>
          <div class="two">
            <!-- <el-form ref="check" label-position="left" :model="form" size="mini">
              <el-form-item label="是否通过" prop="name">
                <el-radio-group v-model="form.verifyStatus">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>-->
            <el-form-item label="审核意见" prop="verifyDescrition">
              <el-input
                type="textarea"
                v-model="form.verifyDescrition"
                :rows="5"
                placeholder="审核意见"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small">取消</el-button>
              <el-button size="small" type="primary">审核</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-dialog>
      <el-table ref="multipleTable" :data="worksData" style="width: 100%" stripe size="small">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="worksId" label="作品ID"></el-table-column>
        <el-table-column prop="smallUrl" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.smallUrl" alt style="width:40px;height:40px">
          </template>
        </el-table-column>
        <el-table-column prop="verifyStatus" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.verifyStatus === 1">审核通过</span>
            <span v-else-if="scope.row.verifyStatus === 2">审核不通过</span>
            <span v-else>待审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="verifyDescrition" label="审核意见"></el-table-column>
        <el-table-column prop="verifyTime" label="审核时间"></el-table-column>
        <el-table-column prop="recommend" label="推荐">
          <template slot-scope="scope">
            <!-- 审核通过 -->
            <template v-if="scope.row.verifyStatus === 1">
              <el-switch
                v-model="scope.row.verifyStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
            <template v-else>
              <el-switch v-model="scope.row.verifyStatus" disabled></el-switch>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleWorksCheck">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-pagination
          background
          small
          @current-change="worksCurrentChange"
          :current-page="querys.page"
          :page-size="querys.pageSize"
          layout="total,prev, pager, next"
          :total="worksCount"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="qx-pagination" v-if="totalCount">
      <el-pagination
        background
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { checkStage, worksType } from "@/mixins";
export default {
  name: "worksCheck",
  mixins: [checkStage, worksType],
  data() {
    return {
      dialogCheckWorks: false,
      dialogWorks: false,
      query: {
        type: 0,
        checkStage: 0,
        title: "",
        startTime: "",
        endTime: "",
        page: 1,
        pageSize: 20
      },
      querys: {
        collectionId: null,
        page: 1,
        pageSize: 8
      },
      form: {
        worksIds: [1, 2, 3],
        verifyStatus: 1,
        verifyDescrition: "没有问题"
      },
      totalCount: 0,
      worksCount: 0,
      tableData: [],
      worksData: []
    };
  },
  methods: {
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.queryWorksCollection(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.queryWorksCollection(this.query);
    },
    handleSearch() {
      this.queryWorksCollection(this.query);
    },
    worksCurrentChange(curr) {
      this.querys.page = curr;
      this.queryWorksDetailList(this.querys);
    },
    //作品集详情查询
    handleWorksInfo(collectionId) {
      this.querys.collectionId = collectionId;
      this.queryWorksDetailList(this.querys);
    },
    handleWorksCheck() {
      this.checkWorks(this.form);
    },
    //学生作品查询--审核列表
    async queryWorksCollection(params = {}) {
      let res = await service.queryWorksCollection(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data || [];
        this.totalCount = res.data.totalCount;
      }
    },
    //作品集详情查询
    async queryWorksDetailList(params = {}) {
      let res = await service.queryWorksDetailList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogWorks = true;
        this.worksData = res.data.data || [];
        this.worksCount = res.data.totalCount;
      }
    },
    //作品审核
    async checkWorks(params = {}) {
      let res = await service.checkWorks(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
      }
    }
  },
  activated() {
    this.queryWorksCollection(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
