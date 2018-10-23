<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="内容标题">
                <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="10"></el-input>
              </el-form-item>              
              <el-form-item label="审核状态">
                <el-select v-model="query.verifyStatus" clearable placeholder="请选择审核状态">
                  <el-option
                    v-for="item in verifyStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>                  
                </el-select>
              </el-form-item>   
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              </el-form-item>                             
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
        <el-table-column label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color:#409EFF;cursor:pointer;">{{ scope.row.title }}</span>
          </template>            
        </el-table-column>
        <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上传者" prop="userName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上传时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.verifyStatus === 0">
              <el-button size="mini" type="primary" @click="handleStage(scope.row)">预览审核</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template>
      <qx-pagination 
        @page-change="pageChange" 
        @page-size="pageSize" 
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>     
    <!-- 预览审核 -->
    <template>
      <el-dialog width="60%" :title="title" center top="40px" :visible.sync="dialogView">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="video-box" v-if="showType == 1 || showType == 2 || showType == 4 || showType == 5">
              <video :src="videoUrl" controls width="500" height="200"></video>
            </div>
            <!-- v-if="showType == 3 || showType == 4 || showType == 5" -->
            <div class="image-box" v-if="showType == 3 || showType == 4 || showType == 5">
              <el-carousel height="736px" :autoplay="false">
                <el-carousel-item v-for="(item, index) in imageList" :key="index">
                  <img :src="item.url" class="image" width="500" height="736" :alt="item.name">
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- <div class="iframe-box"></div> -->
          </el-col>
          <el-col :span="12">
            <el-form ref="check" :model="form" status-icon size="mini" :label-width="formLabelWidth">
              <el-form-item label="是否通过" prop="name">
                <el-radio-group v-model="form.verifyStatus">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审核意见" prop="verifyDescrition">
                <el-input type="textarea" v-model="form.verifyDescrition" :rows="6" placeholder="审核意见"></el-input>
              </el-form-item>
              <el-row style="text-align:center">
                <el-button size="mini" @click="dialogView = false">取消</el-button>
                <el-button size="mini" type="primary" @click="checkForm('check')">审核</el-button>
              </el-row>
            </el-form>
          </el-col>          
        </el-row>
      </el-dialog>
    </template>             
  </div>    
</template>
<script>
import service from "@/api";
import pagination from "@/components/pagination";
import { verifyStatus } from "@/mixins";
export default {
  name: "final",
  components: {
    "qx-pagination": pagination
  },
  mixins: [verifyStatus],
  data() {
    return {
      dialogView: false,
      formLabelWidth: "100px",
      query: {
        title: "",
        checkStage: 3,
        verifyStatus: 0,
        page: 1,
        pageSize: 20
      },
      form: {
        verifyStatus: 1,
        verifyDescrition: "",
        checkStage: null,
        contentId: null
      },
      videoUrl: "",
      showType: null,
      imageList: [],
      totalCount: 0,
      tableData: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    pageChange(curr) {
      this.query.page = curr;
      this.querycheckContentList();
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.querycheckContentList();
    },
    search() {
      this.queryCheckContentList();
    },
    handleStage(row) {
      this.title = row.title;
      this.form.contentId = row.contentId;
      this.form.checkStage = row.checkStage;
      this.queryContentByContentId(row.contentId);
    },
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.checkContent(this.form);
        } else {
          return false;
        }
      });
    },
    //审核内容
    async checkContent(params = {}) {
      let res = await service.checkContent(params);
      if (res.errorCode === 0) {
        this.dialogView = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryCheckContentList();
        this.$refs.check.resetFields();
      }
    },
    //查询审核内容列表
    async queryCheckContentList() {
      let res = await service.queryCheckContentList(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //查询编辑内容
    async queryContentByContentId(contentId) {
      let res = await service.queryContentByContentId({ contentId });
      if (res.errorCode === 0) {
        let data = res.data;
        let { images, videoUrl } = data;
        this.dialogView = true;
        this.showType = data.showType;
        this.imageList = [].concat(images);
        this.videoUrl = data.videoUrl;
      }
    }
  },
  mounted() {},
  activated() {
    this.queryCheckContentList();
  }
};
</script>
<style lang="less" scoped>
.video-box {
  margin: 0 auto;
  text-align: center;
  video {
    vertical-align: top;
  }
}
.image-box {
  text-align: center;
  min-height: 736px;
}
.iframe-box {
  margin: 0 auto;
  width: 400px;
  min-height: 589px;
  box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.12);
}
</style>
