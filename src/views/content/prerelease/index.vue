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
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <div class="release">
      <template>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-tabs class="qx-page-tabs" type="border-card" @tab-click="handleTabClick">
              <el-tab-pane label="待预发布" name="0">
                <el-table :data="tableData" style="width: 100%" stripe size="small">
                  <el-table-column width="150" label="内容编号" type="index" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span style="color:#409EFF;cursor: pointer;" @click="handleViewContent(scope.row)">{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="申请人" prop="userName" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="上传时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="操作" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="handleRelease(scope.row)">预发布</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="已预发布" name="1">
                <el-table :data="tableData2" style="width: 100%" stripe size="small">
                  <el-table-column width="150" label="内容编号" type="index" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span style="color:#409EFF;cursor: pointer;" @click="handleViewContent(scope.row)">{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="申请人" prop="userName" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="上传时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>                  
                  <el-table-column label="发布学校" prop="schoolName" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span style="color:#409EFF;cursor:pointer;" @click="handleViewSchool(scope.row)">查看</span>
                    </template>
                  </el-table-column>    
                  <el-table-column label="操作" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="handleRelease(scope.row)">再次预发布</el-button>
                    </template>
                  </el-table-column>                                
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </template>
    </div>
    <!-- 表格数据 -->
    <!-- 发布学校查看 -->
    <template>
      <el-dialog center top="40px" title="预发布学校" :visible.sync="dialogView">
        <el-table :data="schoolData" style="width: 100%" border stripe size="small">
          <el-table-column label="学校名称" :show-overflow-tooltip="true" property="schoolName"></el-table-column>
        </el-table>
      </el-dialog>
    </template>
    <!-- 查看上传详情信息 --> 
    <template>
      <el-dialog width="60%" title=" 查看上传详情信息" center top="0px" :visible.sync="dialogViewContent">
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
    <!-- 预发布 -->
    <template>
      <el-dialog title="预发布" center top="40px" :visible.sync="dialogAdd">
        <el-form ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="内容标题" prop="title">
            <el-input v-model="form.title" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布来源" prop="resources">
            <el-input v-model="form.resources" disabled></el-input>
          </el-form-item>  
          <template v-if="type !== 1">
            <el-form-item label="区域选择">
              <qx-region-t @regionChange="handleRegionChange"></qx-region-t>   
            </el-form-item>   
            <el-form-item label="学校性质" prop="propertyId">
              <el-select v-model="form.propertyId" clearable placeholder="请选择学校性质">
                <el-option
                  v-for="item in propertyidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>            
              </el-select>                          
            </el-form-item>  
            <el-form-item label="学校类型" prop="typeId">
              <el-select v-model="form.typeId" clearable placeholder="请选择学校类型">
                <el-option
                  v-for="item in typeidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>            
              </el-select>                           
            </el-form-item>                   
            <el-form-item label="学校标签" prop="labelIds">
              <el-select v-model="form.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择学校标签">
                <el-option
                  v-for="item in schoolLabel"
                  :key="item.labelId"
                  :label="item.name"
                  :value="item.labelId">
                </el-option>              
              </el-select>
            </el-form-item>
            <el-form-item label="冠名企业" prop="sponsorIds">
              <el-checkbox-group v-model="form.sponsorIds">
                <el-checkbox :label="1">广州市华侨文化发展基金会</el-checkbox>
                <el-checkbox :label="2">广州市科普知识促进会</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>    
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogAdd = false">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm('form')">确定</el-button>
        </span>         
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/api";
import regiont from "@/components/qxregion";
import { property, typeid } from "@/mixins";
export default {
  name: "prerelease",
  components: {
    "qx-region-t": regiont
  },
  mixins: [property, typeid],
  data() {
    return {
      formLabelWidth: "100px",
      dialogViewContent: false,
      dialogView: false,
      dialogAdd: false,
      info: {},
      query: {
        title: "",
        status: 0,
        page: 1,
        pageSize: 100
      },
      form: {
        scopeType: this.$store.getters.scopeType,
        scopeId: this.$store.getters.scopeId,
        propertyId: null,
        typeId: null,
        labelIds: [],
        sponsorIds: []
      },
      schoolData: [],
      schoolLabel: [],
      labelsList: [],
      tableData: [],
      tableData2: []
      //totalCount: 0
    };
  },
  computed: {
    //type 账号类型 0-促进会 1-学校 2-教育局 3-培训机构
    ...mapGetters(["type"])
    //设置表格高度
  },
  methods: {
    handleSearch() {
      this.queryPrepublishContentList(this.query);
    },
    handleTabClick(tab) {
      this.query.status = parseInt(tab.name);
      this.queryPrepublishContentList(this.query);
    },
    handleViewSchool(row) {
      this.queryPublishSchoolInfo(row.contentId);
    },
    handleViewContent(row) {
      this.queryContentByContentId(row.contentId);
    },
    handleRegionChange(queryId, queryType) {
      this.form.scopeId = queryId;
      this.form.scopeType = queryType;
    },
    handleRelease(row) {
      let { contentId, resources, title } = row;
      this.dialogAdd = true;
      this.form = Object.assign({}, this.form, { contentId, resources, title });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { title, resources, ...args } = this.form;
          this.prepublishContent(args);
        }
      });
    },
    //进行内容预发布
    async prepublishContent(params = {}) {
      let res = await service.prepublishContent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogAdd = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryPrepublishContentList(this.query);
        this.$refs.form.resetFields(); //清空表单的值
      } else if (res.errorCode === -1) {
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
      }
    },
    //查询标签 1.学校 3.冠名企业
    async queryLabel(queryType) {
      let res = await service.queryLabel({ queryType });
      if (res.errorCode === 0) {
        if (queryType == 1) {
          this.schoolLabel = res.data;
        } else if (queryType == 3) {
          this.labelsList = res.data;
        }
      }
    },
    //查询学校类别
    async querySchoolCategory(params = {}) {
      let res = await service.querySchoolCategory(params);
      if (res.errorCode === 0) {
        if (params.queryType) {
          this.typeidList = res.data;
        } else {
          this.propertyidList = res.data;
        }
      }
    },
    //查询预发布内容列表
    async queryPrepublishContentList(params = {}) {
      let res = await service.queryPrepublishContentList(params);
      if (res.errorCode === 0) {
        if (params.status === 0) {
          this.tableData = res.data.data;
        } else {
          this.tableData2 = res.data.data;
        }
      }
    },
    //查询内容
    async queryContentByContentId(contentId) {
      let res = await service.queryContentByContentId({ contentId });
      if (res.errorCode === 0) {
        this.dialogViewContent = true;
        this.info = Object.assign({}, res.data);
      }
    },
    //预发布学校查看
    async queryPublishSchoolInfo(contentId) {
      let res = await service.queryPublishSchoolInfo({ contentId });
      console.log(res);
      if (res.errorCode === 0) {
        this.dialogView = true;
        this.schoolData = res.data;
      }
    }
  },
  mounted() {
    this.queryLabel(1);
  },
  activated() {
    this.queryPrepublishContentList(this.query);
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
