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
            <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="dialogFormVisible = true"
              >上传作品</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%" stripe size="small">
      <el-table-column label="作品集ID" prop="collectionId" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="作品类型" prop="type" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.type === 1">美术</span>
          <span size="mini" v-else-if="scope.row.type === 2">书法</span>
          <span size="mini" v-else>作业</span>
        </template>
      </el-table-column>
      <el-table-column label="作品" prop="processStage" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.processStage === 0">待处理</span>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="handleWorksInfo(scope.row.collectionId)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核阶段" prop="checkStage" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span size="mini" v-if="scope.row.checkStage === 0">待审核</span>
          <span size="mini" v-else>审核完成</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="上传时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
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
    <!-- 新增 -->
    <el-dialog width="60%" top="40px" title="上传作品" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
        <el-form-item
          label="作品标题"
          prop="title"
          :rules="[
            { required: true, message: '请输入作品标题', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.title" placeholder="请输入作品标题"></el-input>
        </el-form-item>
        <el-form-item label="作品类别">
          <el-select v-model="form.type" placeholder="选择作品类别">
            <el-option
              v-for="item in worksTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传类型">
          <el-select v-model="form.uploadType" placeholder="选择上传类型">
            <el-option
              v-for="item in uploadType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.uploadType">
          <el-form-item label="压缩包上传">
            <el-upload
              name="files"
              ref="uploadImage"
              :auto-upload="false"
              :multiple="true"
              :with-credentials="true"
              action="#"
              :http-request="submitUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传RAR/ZIP后缀的压缩文件</div>
            </el-upload>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="图片上传">
            <el-upload
              list-type="picture-card"
              name="files"
              ref="uploadImage"
              :auto-upload="false"
              :multiple="true"
              :with-credentials="true"
              action="#"
              accept="image/jpeg, image/gif, image/png, image/bmp"
              :http-request="submitUpload"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">可以上选择多张图片上传</div>
            </el-upload>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 作品集详情 -->
    <el-dialog width="60%" top="40px" title="作品列表" :visible.sync="dialogWorks" @open="handleOpen">
      <el-table :data="worksData" style="width: 100%" stripe size="small">
        <el-table-column property="worksId" label="作品ID"></el-table-column>
        <el-table-column property="smallUrl" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.smallUrl" alt style="width:40px;height:40px">
          </template>
        </el-table-column>
        <el-table-column property="verifyStatus" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.verifyStatus === 0">待审核</span>
            <span v-else-if="scope.row.verifyStatus === 1">审核通过</span>
            <span v-else>审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column property="verifyDescrition" label="审核意见"></el-table-column>
        <el-table-column property="verifyTime" label="审核时间"></el-table-column>
        <el-table-column property="recommend" label="推荐">
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
  </div>
</template>
<script>
import service from "@/api";
import { checkStage, worksType } from "@/mixins";
export default {
  name: "worksList",
  mixins: [checkStage, worksType],
  data() {
    return {
      dialogFormVisible: false,
      dialogWorks: false,
      formLabelWidth: "100px",
      query: {
        type: 0,
        checkStage: 9,
        title: "",
        page: 1,
        pageSize: 20
      },
      querys: {
        collectionId: null,
        page: 1,
        pageSize: 10
      },
      uploadType: [
        { id: 0, name: "多图片上传" },
        { id: 1, name: "压缩包上传" }
      ],
      form: {
        title: "",
        type: 1,
        uploadType: 0,
        images: [],
        compressFile: ""
      },
      totalCount: 0,
      worksCount: 0,
      uploadForm: "",
      tableData: [],
      worksData: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.querySchoolCollection(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.querySchoolCollection(this.query);
    },
    handleSearch() {
      this.querySchoolCollection(this.query);
    },
    handleOpen() {
      console.log("open");
    },
    //作品集详情查询
    handleWorksInfo(collectionId) {
      this.querys.collectionId = collectionId;
      this.queryWorksDetailList(this.querys);
    },
    worksCurrentChange(curr) {
      this.querys.page = curr;
      this.queryWorksDetailList(this.querys);
    },
    async submitAssess() {
      this.uploadForm = new FormData();
      this.$refs.uploadImage.submit();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let res = await service.uploadFile(this.uploadForm, config);
      if (res.errorCode === 0) {
        //如果是压缩包
        if (this.form.uploadType) {
          this.form.compressFile = res.data[0];
        } else {
          res.data.forEach(img => {
            this.form.images.push(img);
          });
        }
        return true;
      }
    },
    //多图片自定义上传
    submitUpload(file) {
      this.uploadForm.append("files", file.file);
    },
    //压缩包自定义上传
    submitUploadZip(file) {},
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.submitAssess();
          if (res) {
            this.uploadWorks(this.form);
          }
        }
      });
    },
    //作品上传
    async uploadWorks(params = {}) {
      let res = await service.uploadWorks(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.$refs.uploadImage.clearFiles();
        this.querySchoolCollection(this.query);
      }
    },
    //学生作品查询
    async querySchoolCollection(params = {}) {
      let res = await service.querySchoolCollection(params, {
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
        if (res.data.totalCount) {
          this.dialogWorks = true;
          this.worksData = res.data.data || [];
          this.worksCount = res.data.totalCount;
        }
      }
    }
  },
  activated() {
    this.querySchoolCollection(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
