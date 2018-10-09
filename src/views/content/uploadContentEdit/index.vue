<template>
   <div class="page">
       <div class="upload-add">
           <el-row :gutter="40">
               <el-col :span="8">
                    <el-form ref="query" :model="query" size="mini" label-width="100px" label-position="left">
                        <el-form-item label="内容类型">
                            <el-radio-group v-model="query.contentType" disabled>
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
                                <el-select style="width: 100%;" v-model="query.showType" disabled placeholder="请选择内容模板">
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
                                <el-select style="width: 100%;" v-model="query.templateId" disabled placeholder="请选择内容模板选择">
                                  <el-option v-for="item in posterList" :key="item.contentId" :label="item.title" :value="item.templateId"></el-option>
                                </el-select>
                            </el-form-item> 
                            <el-form-item label="图片上传" prop="imageUrl">
                                <el-upload
                                  ref="upload"
                                  name="honorImage"
                                  :disabled="disabledImg === 0"
                                  action="http://192.168.18.107:8080/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                                  :multiple="false"
                                  accept="image/jpeg,image/gif,image/png,image/bmp"
                                  :limit="2"
                                  :file-list="imageFileList"
                                  :on-remove="handleRemove" 
                                  :before-remove="handleRemove"
                                  :on-preview="handlePreviewImg"
                                  :on-success="handleImageSuccess">
                                  <el-button :disabled="disabledImg === 0" slot="trigger" size="mini" type="info" style="width: 100%;">点击选取图片</el-button>
                                  <span class="el-upload__tip" slot="tip" style="margin-left:10px;">上传1080*1590的图片，不超过2MB</span>
                                </el-upload>
                            </el-form-item>                            
                            <el-form-item label="视频上传" prop="videoUrl">
                                <el-upload 
                                    class="upload-video"
                                    ref="upload" 
                                    name="file"
                                    :disabled="disabledVideo === 0"
                                    action="http://192.168.18.107:8080/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                                    accept="video/mp4,video/flv,video/mov"
                                    :limit="2"
                                    :file-list="videoFileList"
                                    :on-remove="handleRemove" 
                                    :before-remove="handleRemove"
                                    :on-preview="handlePreviewVideo"
                                    :on-success="handleVideoSuccess">
                                    <el-button :disabled="disabledVideo === 0" slot="trigger" size="mini" type="info" style="width: 100%;">点击选取视频</el-button>
                                    <span class="el-upload__tip" slot="tip" style="margin-left:10px;">视频大小不超过100MB</span>
                                </el-upload>                              
                            </el-form-item>                                                                                                           
                        </template> 
                        <template v-else>
                            <el-form-item label="文字内容" prop="componentValue" :rules="[
                              { required: true, message: '请输入文字内容', trigger: 'blur' }
                            ]">
                                <el-input type="textarea" v-model="query.componentValue" :rows="5" placeholder="请输入文字内容"></el-input>
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
      <!-- 图片查看 -->
      <template>
        <el-dialog center top="40px" :visible.sync="dialogViewImg">
          <div class="views-image" v-if="query.imageUrl">
            <img :src="query.imageUrl" width="1080" height="1590">
          </div>
        </el-dialog>
      </template> 
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
      disabledImg: 0,
      disabledVideo: 0,
      disabled: 1,
      btnLoading: 0,
      dialogViewVideo: false,
      dialogViewImg: false,
      imageFileList: [],
      videoFileList: [],
      posterList: [],
      channelList: [],
      schoolPlayTime: [],
      contentId: null,
      query: {},
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
      ]
    };
  },
  computed: {},
  methods: {
    loadSuccess() {},
    handleSaveChange() {},
    handleVideoSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.query.videoUrl = response.data.url;
      }
    },
    handleRemove(file, fileList) {
      return false;
    },
    handlePreviewImg(file) {
      this.dialogViewImg = true;
    },
    handlePreviewVideo(file) {
      this.dialogViewVideo = true;
    },
    handleImageSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.query.imageUrl = response.data.url;
        this.query.imageName = response.data.imageName;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //编辑上传
    upload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {
            showType,
            contnetDetail,
            duration,
            posterUrl,
            templateId,
            templateTitle,
            ...args
          } = this.query;
          this.updateContentAction(args);
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
        if (this.query.imageName) {
          this.imageFileList.push({
            name: this.query.imageName,
            url: this.query.imageUrl
          });
        }
        if (this.query.videoUrl) {
          this.videoFileList.push({
            name: "点击查看",
            url: this.query.videoUrl
          });
        }
        if (
          this.query.showType === 1 ||
          this.query.showType === 2 ||
          this.query.showType === 4 ||
          this.query.showType === 5
        ) {
          this.disabledVideo = 1;
        } else {
          this.disabledVideo = 0;
        }
        if (
          this.query.showType === 3 ||
          this.query.showType === 4 ||
          this.query.showTypeue === 5
        ) {
          this.disabledImg = 1;
        } else {
          this.disabledImg = 0;
        }
      }
    },
    //上传内容编辑
    async updateContentAction(params = {}) {
      let res = await service.updateContent(params);
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
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
<style lang="less" scoped>
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
// .el-upload {
//   width: auto;
//   text-align: left;
// }
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
