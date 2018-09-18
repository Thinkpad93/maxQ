<template>
   <div class="page">
       <div class="upload-add">
           <el-row :gutter="40">
               <el-col :span="8">
                    <el-form ref="query" :model="query" size="mini" label-width="100px" label-position="left">
                        <el-form-item label="内容类型">
                            <el-radio-group v-model="query.contentType" disabled @change="handleRadio">
                                <el-radio-button :label="0" size="mini">全屏播放</el-radio-button>
                                <el-radio-button :label="1" size="mini">滚动播放</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="内容标题" prop="title" :rules="[
                          { required: true, message: '请输入内容标题', trigger:'blur' }
                        ]">
                            <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="20"></el-input>
                        </el-form-item>                            
                        <template v-if="query.contentType === 0">
                            <el-form-item label="内容作者" prop="author" :rules="[
                              { required: true, message: '请输入内容作者', trigger: 'blur' }
                            ]">
                                <el-input v-model="query.author" placeholder="请输入内容作者" maxlength="4"></el-input>
                            </el-form-item>  
                            <el-form-item label="内容属性" prop="contentProperty">
                                <el-select v-model="query.contentProperty" style="width: 100%;">
                                    <el-option v-for="item in contentPropertyList" 
                                        :key="item.value" 
                                        :label="item.label" 
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                            <!-- 有上传学校和上传促进会 默认上传学校时不需要选择栏目 -->
                            <template v-if="!query.belongTo"> 
                              <el-form-item label="所属栏目" prop="channelId">
                                  <el-select v-model="query.channelId" placeholder="请选择" style="width: 100%;">
                                      <el-option v-for="item in channelList" 
                                          :key="item.channelId" 
                                          :value="item.channelId"
                                          :label="item.name">
                                      </el-option>
                                  </el-select>      
                              </el-form-item>  
                            </template>
                            <el-form-item label="展示类型" prop="showType">
                                <el-select style="width: 100%;" v-model="query.showType" disabled placeholder="请选择内容模板" @change="handleChange">
                                    <el-option
                                      v-for="item in contentTemplateList"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>                  
                                </el-select>   
                            </el-form-item>  
                            <el-form-item label="内容模板" prop="templateId" :rules="[
                              { required: true, message: '请选择内容模板', trigger: 'blur' }
                            ]">
                                <el-select style="width: 100%;" v-model="query.templateId" disabled placeholder="请选择内容模板选择" @change="handlePoster">
                                  <el-option v-for="item in posterList" :key="item.contentId" :label="item.title" :value="item.templateId"></el-option>
                                </el-select>
                            </el-form-item> 
                            <el-form-item label="视频上传" prop="videoUrl">
                                <el-upload 
                                    class="upload-video"
                                    ref="upload" 
                                    name="file"
                                    :disabled="disabled === 0"
                                    action="http://192.168.18.107:8080/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                                    accept="video/mp4,video/flv,video/mov"
                                    :on-success="handleVideoSuccess"
                                    :before-remove="beforeRemove">
                                    <el-button :disabled="disabled === 0" slot="trigger" size="mini" type="info" style="width: 100%;">点击选取视频</el-button>
                                </el-upload>                                
                            </el-form-item>  
                            <el-form-item label="视频预览">
                                <a href="javascript:;" style="color:#409EFF" @click="handleVideoView">点击查看</a>
                            </el-form-item>                                                                                                               
                        </template> 
                        <template v-else>
                            <el-form-item label="文字内容" prop="componentValue" :rules="[
                              { required: true, message: '请输入文字内容', trigger: 'blur' }
                            ]">
                                <el-input type="textarea" v-model="query.componentValue" :rows="5" placeholder="请输入内容作者"></el-input>
                            </el-form-item>  
                        </template>   
                        <el-form-item label="播放时长" prop="durationTime" :rules="[
                          { required: true, message: '请选择播放时长', trigger: 'blur' }
                        ]">
                            <el-time-picker 
                              format="mm:ss"
                              value-format="mm:ss"                            
                              v-model="query.durationTime" 
                              placeholder="选择分秒" 
                              style="width: 100%;">
                            </el-time-picker>
                        </el-form-item>                                                                                                                                            
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="upload('query')">保存编辑</el-button>
                        </el-form-item>                        
                    </el-form>
               </el-col>
               <el-col :span="16">
                 <div class="element-box">
                    <iframe id="posterFrame" ref="iframe" :src="query.posterUrl" @load="loadSuccess"></iframe>
                    <!-- 如果有多页海报模板 -->
                    <div class="page-manage">
                      <el-button-group>
                        <el-button :disabled="btnLoading === 0" size="mini" type="primary" icon="el-icon-arrow-left">上一页</el-button>
                        <el-button :disabled="btnLoading === 0" size="mini" type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                      </el-button-group>
                    </div>                    
                    <!-- 保存修改 -->
                    <div class="handleSave">
                      <el-button :disabled="btnLoading === 0" size="mini" type="primary" @click="handleSaveChange">保存</el-button>
                    </div>                   
                 </div>
               </el-col>
           </el-row>
       </div>
      <!-- 视频查看 --> 
      <template>
        <el-dialog center top="40px" :visible.sync="dialogViewVideo">
          <div class="views-video">
            <video :src="query.videoUrl" controls autoplay loop></video>
          </div>
        </el-dialog>
      </template> 
   </div> 
</template>
<script>
import service from "@/api";
export default {
  name: "uploadAdd",
  data() {
    return {
      disabled: 1,
      btnLoading: 0,
      dialogViewVideo: false,
      posterList: [],
      contentId: null,
      query: {},
      validityData: [],
      contentPropertyList: [
        { value: 0, label: "原创" },
        { value: 1, label: "摘要" }
      ],
      contentTemplateList: [
        { value: 0, label: "纯海报方式" },
        { value: 1, label: "上视频下海报方式" },
        { value: 2, label: "上海报下视频方式" },
        { value: 3, label: "纯图片" },
        { value: 4, label: "上视频下图片" },
        { value: 5, label: "上图片下视频" }
      ],
      channelList: [],
      schoolPlayTime: []
    };
  },
  computed: {
    Height() {
      return window.innerHeight - 110;
    }
  },
  methods: {
    loadSuccess() {},
    handleSaveChange() {},
    handleRadio(value) {
      this.query.contentType = value;
      let params = { schoolId: this.query.schoolId, contentType: this.query.contentType };
      this.$refs.query.clearValidate();
    },
    handleChange(value) {
      if (value === 1 || value === 2 || value === 4 || value === 5) {
        this.disabled = 1;
      } else {
        this.disabled = 0;
      }
      this.query.templateId = null;
      this.queryContentTemplateAction(value);
    },
    handlePoster(value) {
      //let obj = this.posterList.find(item => item.contentId === value);
      //this.img = obj.smallUrl;
    },
    handleVideoSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.query.videoUrl = response.data.url;
      }
    },
    handleVideoView() {
      if (this.query.videoUrl) {
        this.dialogViewVideo = true;
      }else {
        this.$message({ message: `没有视频，你可以选择上传视频`, type: "warning" });  
      }
    },
    beforeRemove(file, fileList) {
      return false;
    },
    posterEditAction() {
      this.$router.push({ path: "/content/poster" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    upload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {};
          let channelId = [];
          let rolling = "";
          let { showType, playTime, ...args } = this.query;
          if (this.query.videoUrl === "" && showType !== 0) {
            this.$message({ message: `请上传视频`, type: "warning" });
            return false;
          }
          this.schoolPlayTime.forEach(oldItem => {
            if (playTime.find(newItem => oldItem.itemId == newItem)) {
              channelId.push(oldItem.channelId);
            }
          });
          obj = Object.assign({}, args, { channelId })
          this.uploadContentAction(obj);
        }
      });
    },
    //显示内容模板列表
    async queryContentTemplateAction(showType) {
      let res = await service.queryContentTemplate({ showType });
      if (res.errorCode === 0) {
        this.posterList = res.data;
      }
    },
    //查询栏目名称
    async queryChannelInner() {
      let res = await service.queryChannelAll({});
      if (res.errorCode === 0) {
        this.channelList = res.data;
      }
    },
    //查询编辑内容
    async queryContentByContentIdAction(contentId) {
      let res = await service.queryContentByContentId({ contentId });
      if (res.errorCode === 0) {
        this.query = res.data;
        this.queryContentTemplateAction(this.query.showType);
        if (this.query.showType == 0 || this.query.showType == 3) {
          this.disabled = 0;
        }
      }
    },
    //上传内容编辑
    async updateContentAction(params = {}) {
      let res = service.updateContent(params);
    }
  },
  mounted() {
    let { schoolId, contentType } = this.query;
    if (this.query.belongTo === 0) {
      this.queryChannelInner();
    }
    this.queryContentByContentIdAction(this.$route.params.id);
  }
};
</script>
<style lang="less">
.element-box {
  width: 500px;
  height: 736px;
  margin: 30px auto 10px auto;
  position: relative;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(28, 31, 33, 0.1);
}
.handleSave {
  position: absolute;
  right: 0;
  top: -30px;
  z-index: 100;
}

.page-manage {
  position: absolute;
  left: 0;
  top: -30px;
  z-index: 100;
}

.upload-add {
  background-color: #fff;
  padding: 20px;
  min-height: 650px;
}
.poster-a {
  display: inline-block;
  margin-left: 15px;
}
.screen-title {
  margin-bottom: 18px;
}
.screen-box {
  text-align: center;
  float: left;
  margin-right: 15px;
  width: 100px;
  .item {
    cursor: pointer;
    text-align: center;
    height: 150px;
    border-radius: 4px;
    border: 1px dashed #d9d9d9;
  }
}
.el-upload {
  width: auto;
  text-align: left;
}
h3 {
  margin-bottom: 18px;
}
.views-video {
  width: 100%;
  height: 450px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  background-size: 60px 60px;
  background-image: -webkit-linear-gradient(
    135deg,
    #f6f6f6 25%,
    transparent 25%,
    transparent 50%,
    #f6f6f6 50%,
    #f6f6f6 75%,
    transparent 75%,
    transparent
  );
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
