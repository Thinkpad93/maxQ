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
            <span style="color:#409EFF;cursor: pointer;" @click="handleViewContent(scope.row)">{{ scope.row.title }}</span>
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
      <div class="qx-pagination" v-if="totalCount">
        <el-pagination
          background
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </template>   
    <!-- 查看上传详情信息 --> 
    <template>
      <el-dialog width="60%" title=" 查看上传详情信息" center top="40px" :visible.sync="dialogViewContent">
        <el-row :gutter="10" type="flex" class="row-bg">
          <div class="one">
            <div class="image-box" v-if="info.showType == 3">
              <el-carousel height="589px" :autoplay="false">
                <el-carousel-item v-for="(item, index) in info.images" :key="index">
                  <img :src="item.url" class="image" width="400" height="589" :alt="item.name">
                </el-carousel-item>
              </el-carousel>
            </div>
            <template v-if="info.showType === 4">
              <div class="video-box">
                <video :src="info.videoUrl" controls width="400" height="230"></video>
              </div>
            </template>
            <div class="image-box" v-if="info.showType == 4 || info.showType == 5">
              <el-carousel height="359px" :autoplay="false">
                <el-carousel-item v-for="(item, index) in info.images" :key="index">
                  <img :src="item.url" class="image" width="400" height="359" :alt="item.name">
                </el-carousel-item>
              </el-carousel>
            </div>
            <template v-if="info.showType === 5">
              <div class="video-box">
                <video :src="info.videoUrl" controls width="400" height="230"></video>
              </div>
            </template>            
            <!-- <div class="iframe-box"></div> -->                 
          </div>
          <div class="two">
           <div class="list">
              <p>标题：<span>{{ info.title }}</span></p>
              <p>内容类型：<span v-if="info.contentType === 0">全屏播放</span><span v-else>滚动播放</span></p>
              <template v-if="info.contentType === 0">
                <p>内容属性：<span v-if="info.contentProperty === 0">原创</span><span v-else>摘要</span></p>
                <p>作者：<span v-if="info.author">{{ info.author }}</span><span v-else>无</span></p>
                <p>播放时长：<span>{{ info.durationTime }}</span></p>   
                <p>
                  展示类型：
                  <span v-if="info.showType === 0">纯海报方式</span>
                  <span v-else-if="info.showType === 1">上视频下海报方式</span>
                  <span v-else-if="info.showType === 2">上海报下视频方式</span>
                  <span v-else-if="info.showType === 3">纯图片</span>
                  <span v-else-if="info.showType === 4">上视频下图片</span>
                  <span v-else>上图片下视频</span>
                </p>                             
              </template>
              <template v-else>
                <p>播放有效期：<span>{{ info.playTime }} - {{ info.endTime }}</span></p>
                <p v-if="info.contentType === 1">滚动内容：<span>{{ info.rollContent }}</span></p>
              </template>
            </div>   
          </div>
        </el-row>
      </el-dialog>
    </template>           
    <!-- 预览审核 -->
    <template>
      <el-dialog width="60%" :title="info.title" center top="40px" :visible.sync="dialogView">
        <el-row :gutter="10" type="flex" class="row-bg">
          <div class="one">
            <div class="image-box" v-if="info.showType == 3">
              <el-carousel height="589px" :autoplay="false">
                <el-carousel-item v-for="(item, index) in info.images" :key="index">
                  <img :src="item.url" class="image" width="400" height="589" :alt="item.name">
                </el-carousel-item>
              </el-carousel>
            </div>
            <template v-if="info.showType === 4">
              <div class="video-box">
                <video :src="info.videoUrl" controls width="400" height="230"></video>
              </div>
            </template>
            <div class="image-box" v-if="info.showType == 4 || info.showType == 5">
              <el-carousel height="359px" :autoplay="false">
                <el-carousel-item v-for="(item, index) in info.images" :key="index">
                  <img :src="item.url" class="image" width="400" height="359" :alt="item.name">
                </el-carousel-item>
              </el-carousel>
            </div>
            <template v-if="info.showType === 5">
              <div class="video-box">
                <video :src="info.videoUrl" controls width="400" height="230"></video>
              </div>
            </template>            
            <!-- <div class="iframe-box"></div> -->                 
          </div>
          <div class="two">
           <div class="list">
              <p>标题：<span>{{ info.title }}</span></p>
              <p>内容类型：<span v-if="info.contentType === 0">全屏播放</span><span v-else>滚动播放</span></p>
              <template v-if="info.contentType === 0">
                <p>内容属性：<span v-if="info.contentProperty === 0">原创</span><span v-else>摘要</span></p>
                <p>作者：<span v-if="info.author">{{ info.author }}</span><span v-else>无</span></p>
                <p>播放时长：<span>{{ info.durationTime }}</span></p>   
                <p>
                  展示类型：
                  <span v-if="info.showType === 0">纯海报方式</span>
                  <span v-else-if="info.showType === 1">上视频下海报方式</span>
                  <span v-else-if="info.showType === 2">上海报下视频方式</span>
                  <span v-else-if="info.showType === 3">纯图片</span>
                  <span v-else-if="info.showType === 4">上视频下图片</span>
                  <span v-else>上图片下视频</span>
                </p>                             
              </template>
              <template v-else>
                <p>播放有效期：<span>{{ info.playTime }} - {{ info.endTime }}</span></p>
                <p v-if="info.contentType === 1">滚动内容：<span>{{ info.rollContent }}</span></p>
              </template>
            </div>  
            <el-form ref="check" label-position="left" :model="form" status-icon size="mini" :label-width="formLabelWidth">
              <el-form-item label="是否通过" prop="name">
                <el-radio-group v-model="form.verifyStatus">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审核意见" prop="verifyDescrition">
                <el-input type="textarea" v-model="form.verifyDescrition" :rows="5" placeholder="审核意见"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogView = false">取消</el-button>
          <el-button size="small" type="primary" @click="checkForm('check')">审核</el-button>
        </span>        
      </el-dialog>
    </template>         
  </div>    
</template>
<script>
import service from "@/api";
import { verifyStatus } from "@/mixins";
export default {
  name: "review",
  mixins: [verifyStatus],
  data() {
    return {
      dialogViewContent: false,
      dialogView: false,
      formLabelWidth: "100px",
      query: {
        title: "",
        checkStage: 2,
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
      info: {},
      tableData: [],
      totalCount: 0
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
      this.querycheckContentList();
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.querycheckContentList();
    },
    search() {
      this.queryCheckContentList();
    },
    handleViewContent(row) {
      this.queryContentByContentId(row.contentId, "content");
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
    async queryContentByContentId(contentId, str = "view") {
      let res = await service.queryContentByContentId({ contentId });
      if (res.errorCode === 0) {
        this.info = Object.assign({}, res.data);
        if (str == "view") {
          this.dialogView = true;
        } else {
          this.dialogViewContent = true;
        }
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
.row-bg {
  > div {
    margin: 0 15px;
  }
  .two {
    flex: 1;
  }
}
.video-box {
  margin: 0 auto;
  text-align: center;
  video {
    vertical-align: top;
  }
}
.image-box {
  text-align: center;
  width: 400px;
  margin: 0 auto;
}
.iframe-box {
  margin: 0 auto;
  width: 400px;
  min-height: 589px;
  box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.12);
}
.list {
  font-size: 14px;
  margin-bottom: 50px;
  color: #333;
  p {
    padding: 8px 0;
    border-bottom: 1px solid rgba(220, 223, 230, 0.5);
  }
  span {
    color: #409eff;
    line-height: 1.6;
  }
}
</style>
