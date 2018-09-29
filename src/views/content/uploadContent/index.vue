<template>
   <div class="page">
       <div class="upload-add">
           <el-row :gutter="40">
               <el-col :span="7">
                    <el-form ref="query" :model="query" size="mini" label-width="100px" label-position="left">
                        <el-form-item label="内容类型">
                            <el-radio-group v-model="query.contentType" @change="handleRadio">
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
                                <el-select style="width: 100%;" v-model="query.showType" placeholder="请选择内容模板" @change="handleChange">
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
                                <el-select style="width: 100%;" v-model="query.templateId" :disabled="disabledImg === 1" placeholder="请选择内容模板选择" @change="handlePoster">
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
                        <el-form-item label="播放时段" prop="playTime" :rules="[
                          { required: true, message: '请选择播放时段', trigger: 'blur' }
                        ]">
                            <el-select style="width: 100%;" v-model="query.playTime" placeholder="请选择播放时段" value-key="itemId" multiple collapse-tags>
                              <el-option 
                                v-for="item in schoolPlayTime" 
                                :key="item.itemId" 
                                :label="item.time" 
                                :value="item.itemId">
                              </el-option>
                            </el-select>
                        </el-form-item>                                                                                                                                            
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="upload('query')">新增上传</el-button>
                        </el-form-item>                        
                    </el-form>
               </el-col>
               <el-col :span="16">
                 <div class="element-box">
                    <iframe id="posterFrame" ref="iframe" :src="url" @load="loadSuccess"></iframe>
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
      btnLoading: 0,
      dialogViewVideo: false,
      dialogViewImg: false,
      posterList: [],
      url: "",
      contentId: null,
      contentDetail: [],
      channelList: [],
      schoolPlayTime: [],
      query: {
        schoolId: 77,
        title: "",
        author: "",
        channelId: null,
        playTime: [],
        belongTo: 1,
        imageName: "",
        imageUrl: "",
        videoUrl: "",
        showType: 0,
        templateId: null,
        contentProperty: 0,
        contentType: 0,
        durationTime: "",
        componentValue: null
      },
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
    handleRadio(value) {
      this.query.contentType = value;
      let params = {
        schoolId: this.query.schoolId,
        contentType: this.query.contentType
      };
      this.querySchoolPlayListTimeAction(params);
      this.$refs.query.clearValidate();
    },
    handleChange(value) {
      if (value === 1 || value === 2 || value === 4 || value === 5) {
        this.disabledVideo = 1;
      } else {
        this.disabledVideo = 0;
      }
      if (value === 3 || value === 4 || value === 5) {
        this.disabledImg = 1;
      } else {
        this.disabledImg = 0;
      }
      //只能在选择海报的形式才加载
      if (value === 0 || value === 1 || value === 2) {
        this.query.templateId = null;
        this.queryContentTemplateAction(value);
      }
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
      console.log(response);
      if (response.errorCode === 0) {
        this.query.imageUrl = response.data.url;
        this.query.imageName = response.data.imageName;
      }
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
          if (
            this.query.videoUrl === "" &&
            (showType == 1 || showType == 2 || showType == 4 || showType == 5)
          ) {
            this.$message({ message: `请上传视频`, type: "warning" });
            return false;
          }
          if (
            this.query.imageUrl === "" &&
            (showType == 3 || showType == 4 || showType == 5)
          ) {
            this.$message({ message: `请上传图片`, type: "warning" });
            return false;
          }
          this.schoolPlayTime.forEach(oldItem => {
            if (playTime.find(newItem => oldItem.itemId == newItem)) {
              channelId.push(oldItem.channelId);
            }
          });
          obj = Object.assign({}, args, { channelId });
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
    //查询栏目模板时间段
    async querySchoolPlayListTimeAction(paramss = {}) {
      let res = await service.querySchoolPlayListTime(paramss);
      if (res.errorCode === 0) {
        this.schoolPlayTime = res.data;
      }
    },
    //上传内容
    async uploadContentAction(params = {}) {
      let res = await service.uploadContent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.resetForm("query");
        if (
          this.query.contentType === 0 &&
          (this.query.showType == 0 ||
            this.query.showType == 1 ||
            this.query.showType == 2)
        ) {
          this.$confirm(`上传内容成功，你是否要编辑内容模板?`, "提示", {
            confirmButtonText: "好的",
            cancelButtonText: "不用",
            type: "success"
          })
            .then(() => {
              this.url = res.data[0].posterUrl;
              this.contentId = res.data[0].contentId;
            })
            .catch(() => {});
        } else {
          this.$message({ message: `内容上传成功`, type: "success" });
        }
      }
    }
  },
  mounted() {
    let { schoolId, contentType } = this.query;
    if (this.query.belongTo === 0) {
      this.queryChannelInner();
    }
    this.queryContentTemplateAction(0);
    this.querySchoolPlayListTimeAction({ schoolId, contentType });
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
