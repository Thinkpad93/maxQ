<template>
   <div class="page">
     <div class="newUpload" v-loading="loading">
        <!-- 保存按钮 -->
        <div class="page-header" :class="[ collapse ? 'collapse-200' : 'collapse-64' ]">
          <el-button type="primary" @click="handleUpload('form')">保存编辑</el-button>
        </div>      
        <el-row :gutter="30">
          <el-col :span="14" :offset="4">              
            <el-form ref="form" :model="form" size="small" status-icon :label-width="formLabelWidth">             
              <el-tabs class="qx-page-tabs" v-model="status" @tab-click="handleTabClick">
                <el-tab-pane label="全屏播放上传" name="1" :disabled="form.contentType === 0">
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 1">
                      <el-col :span="24">
                        <el-form-item label="内容标题" prop="title" :rules="[
                            { required: true, message: '请输入内容标题', trigger:'blur' }
                          ]">
                          <el-input v-model="form.title" placeholder="请输入内容标题" maxlength="30"></el-input>
                        </el-form-item>
                      </el-col>
                    </template>
                  </el-row>                      
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 1">
                      <el-col :span="12">
                          <el-form-item label="内容作者" prop="author" :rules="[
                            { required: true, message: '请输入内容作者', trigger: 'blur' }
                            ]">
                              <el-input v-model="form.author" placeholder="请输入内容作者" maxlength="20"></el-input>
                          </el-form-item>                 
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="内容属性" prop="contentProperty">
                            <el-select v-model="form.contentProperty" style="width: 100%;">
                              <el-option v-for="item in contentPropertyList" 
                                :key="item.value" 
                                :label="item.label" 
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>                
                      </el-col>
                    </template>
                  </el-row>  
                  <el-row :gutter="10">
                    <template v-if="type !== 1">
                      <template v-if="form.contentType === 1">
                        <el-col :span="24">
                            <el-form-item label="所属栏目" prop="channelId" :rules="[
                                { required: true, message: '请选择所属栏目', trigger: 'blur' }
                              ]">
                              <el-select v-model="form.channelId" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in channelList" 
                                  :key="item.channelId" 
                                  :value="item.channelId"
                                  :label="item.name">
                                </el-option>
                              </el-select>      
                            </el-form-item>                 
                        </el-col>
                      </template>
                    </template>
                  </el-row>       
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 1">
                      <el-col :span="24">
                        <el-form-item label="播放时长" prop="durationTime" :rules="[
                          { required: true, message: '请选择播放时长', trigger: 'blur' }
                          ]">
                          <el-time-picker 
                            format="mm:ss"
                            value-format="mm:ss"                            
                            v-model="form.durationTime" 
                            placeholder="选择分秒" 
                            style="width: 100%;">
                          </el-time-picker>
                        </el-form-item>                    
                      </el-col>
                    </template>
                    <template v-if="type === 1">
                      <template v-if="form.contentType === 1">
                        <el-col :span="24">
                          <el-form-item label="播放时段" prop="channelId" :rules="[
                            { required: true, message: '请选择播放时段', trigger: 'blur' }
                            ]">
                            <el-select style="width: 100%;" v-model="form.channelId" placeholder="请选择播放时段" value-key="channelId">
                              <el-option 
                                v-for="item in schoolPlayTime" 
                                :key="item.channelId" 
                                :label="item.time" 
                                :value="item.channelId">
                              </el-option>
                            </el-select>
                          </el-form-item>                   
                        </el-col>
                      </template>
                    </template>
                  </el-row>   
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="图片上传" prop="imageUrl">
                        <el-upload
                          :disabled="disabledImg === 0"
                          name="files"
                          :file-list="imageList"
                          action="/qxiao-cms/action/mod-xiaojiao/image/filesUpload.do"
                          accept="image/jpeg,image/gif,image/png,image/bmp"
                          :on-remove="handleBeforeRemove" 
                          :on-preview="handlePreviewImg"
                          :on-success="handleImageSuccess">
                          <el-button :disabled="disabledImg === 0" slot="trigger" size="small" type="info" style="width: 100%;">
                            <i class="el-icon-upload el-icon--right"></i> 点击选取图片</el-button>
                          <span class="el-upload__tip" slot="tip">上传1080*1590的图片，不超过2MB</span>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="视频上传" prop="videoUrl">
                        <el-upload
                          :disabled="disabledVideo === 0"
                          name="file"
                          :file-list="videoFileList"
                          action="/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                          accept="video/mp4,video/flv,video/mov"
                          :on-remove="handleBeforeRemove" 
                          :before-remove="handleBeforeRemove"
                          :on-preview="handlePreviewVideo"
                          :on-success="handleVideoSuccess">
                          <el-button :disabled="disabledVideo === 0" slot="trigger" size="small" type="info" style="width: 100%;">
                            <i class="el-icon-upload el-icon--right"></i> 点击选取视频</el-button>
                          <span class="el-upload__tip" slot="tip">视频大小不超过100MB</span>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>       
                  <el-alert title="选择展示类型" type="info" :closable="false"></el-alert>
                  <el-row :gutter="10">
                    <el-col :span="4" v-for="(item, index) in contentTemplateList" :key="index">
                      <div class="showType-item" 
                        :class="[ index === screenIndex ? 'selected' : '']" >
                        <span>{{ item.label }}</span>
                        <!-- <img src="https://fakeimg.pl/100x150/f4f4f5/fff" class="image"> -->
                      </div>               
                    </el-col>
                  </el-row>
                  <!-- <el-row style="text-align: center;">
                    <el-button :disabled="disabledScreen === 0" type="primary" @click="dialogTemplate = true" style="margin-top:10px">请选择海报模板</el-button>                                                             
                  </el-row> -->
                </el-tab-pane>
                <el-tab-pane label="滚动播放上传" name="0" :disabled="form.contentType === 1">
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 0">
                      <el-col :span="24">
                        <el-form-item label="内容标题" prop="title" :rules="[
                            { required: true, message: '请输入内容标题', trigger:'blur' }
                          ]">
                          <el-input v-model="form.title" placeholder="请输入内容标题" maxlength="30"></el-input>
                        </el-form-item>
                      </el-col>
                    </template>
                  </el-row>
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 0">
                      <el-col :span="24">
                        <el-form-item label="播放时长" prop="durationTime" :rules="[
                          { required: true, message: '请选择播放时长', trigger: 'blur' }
                          ]">
                          <el-time-picker 
                            format="mm:ss"
                            value-format="mm:ss"                            
                            v-model="form.durationTime" 
                            placeholder="选择分秒" 
                            style="width: 100%;">
                          </el-time-picker>
                        </el-form-item>                    
                      </el-col>   
                    </template> 
                    <template v-if="type !== 1">
                      <el-col :span="24">
                        <el-form-item label="所属栏目" prop="channelId" :rules="[
                          { required: true, message: '请选择所属栏目', trigger: 'blur' }
                          ]">
                          <el-select v-model="form.channelId" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in channelList" 
                              :key="item.channelId" 
                              :value="item.channelId"
                              :label="item.name">
                            </el-option>
                          </el-select>      
                        </el-form-item>                         
                      </el-col>
                    </template>   
                    <template v-if="type === 1">
                      <el-col :span="24">
                        <el-form-item label="播放时段" prop="channelId" :rules="[
                          { required: true, message: '请选择播放时段', trigger: 'blur' }
                          ]">
                          <el-select style="width: 100%;" v-model="form.channelId" placeholder="请选择播放时段" value-key="channelId">
                            <el-option 
                              v-for="item in schoolPlayTime" 
                              :key="item.channelId" 
                              :label="item.time" 
                              :value="item.channelId">
                            </el-option>
                          </el-select>
                        </el-form-item>                   
                      </el-col>
                    </template>                                                          
                  </el-row>   
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 0">
                      <el-col :span="24">
                          <el-form-item label="文字内容" prop="componentValue" :rules="[
                            { required: true, message: '请输入文字内容', trigger: 'blur' }
                            ]">
                            <el-input type="textarea" v-model="form.componentValue" :rows="5" placeholder="请输入文字内容"></el-input>
                          </el-form-item>                
                      </el-col>
                    </template>
                  </el-row>
                </el-tab-pane>
              </el-tabs>                              
            </el-form>
          </el-col>
        </el-row>     
     </div>
     <!-- 内容模板选择 -->
     <template>
       <el-dialog :close-on-click-modal="false" width="60%" center title="海报模板选择" top="40px" :visible.sync="dialogTemplate">
         <el-row :gutter="10">
           <el-col :span="4" v-for="(item, index) in posterList" :key="index">
             <div class="poster"
               @click="handlePosterSelect(index, item)">
               <img v-if="item.smallUrl" :src="item.smallUrl" class="image" :class="[ index === posterIndex ? 'selected' : '']"> 
               <div class="text">{{ item.title }}</div>
             </div> 
           </el-col>
         </el-row>
         <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogTemplate = false">取消</el-button>
            <el-button size="small" type="primary" @click="handlePosterSave">确定</el-button>           
         </div>         
       </el-dialog>
     </template>
     <!-- 图片查看 -->
     <template>
       <el-dialog custom-class="qx-dialog" width="700px" title="图片查看" center top="40px" :visible.sync="dialogViewImg">
          <div class="views-image">
            <el-carousel :autoplay="false" height="1030px">
              <el-carousel-item v-for="(item, index) in imageList" :key="index">
                <img :src="item.url" width="700" height="1030" :alt="item.name">
              </el-carousel-item>
            </el-carousel>
          </div>         
       </el-dialog>
     </template>
     <!-- 视频查看 --> 
     <template>
       <el-dialog center top="40px" :visible.sync="dialogViewVideo">
          <div class="views-video" v-if="form.videoUrl">
            <video :src="form.videoUrl" controls autoplay loop height="450" style="width:100%"></video>
          </div>         
       </el-dialog>
     </template>
   </div> 
</template>
<script>
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import service from "@/api";
import { contentProperty, contentTemplate } from "@/mixins";
export default {
  name: "editUpload",
  mixins: [contentProperty, contentTemplate],
  data() {
    return {
      disabledImg: 0,
      disabledVideo: 0,
      disabledUpload: 0,
      disabledScreen: 1,
      loading: true,
      dialogViewImg: false,
      dialogViewVideo: false,
      dialogShowType: false,
      dialogTemplate: false,
      formLabelWidth: "80px",
      status: "1",
      screenIndex: 0,
      posterIndex: -1,
      collapse: true,
      //url: "",
      posterUrl: "",
      previewImg: "",
      imageList: [], //多图片查看
      form: {},
      channelList: [],
      posterList: [],
      schoolPlayTime: [],
      imageFileList: [],
      videoFileList: []
    };
  },
  computed: {
    //type 账号类型 0-促进会 1-学校 2-教育局 3-培训机构
    ...mapGetters(["type"])
  },
  watch: {
    "form.templateId"(value) {
      console.log(value);
    }
  },
  methods: {
    handleBeforeRemove(file) {
      let name = file.name;
      this.imageList = this.imageList.filter(elem => elem.name !== name);
    },
    handlePreviewImg(file) {
      this.dialogViewImg = true;
    },
    handlePreviewVideo() {
      this.dialogViewVideo = true;
    },
    //上传图片成功
    handleImageSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        let { name, url } = response.data;
        this.imageList.push({ name, url });
      }
    },
    //上传视频成功
    handleVideoSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.form.videoUrl = response.data.url;
      }
    },
    handleTabClick(tab) {
      this.form.contentType = parseInt(tab.name);
    },
    handlePosterSelect(index, item) {
      if ("templateId" in item) {
        this.form.templateId = item.templateId;
      }
      this.posterIndex = index;
      //回选html
      this.posterUrl = item.posterUrl;
    },
    handlePosterSave() {
      if (this.posterIndex !== -1) {
        this.dialogTemplate = false;
        this.url = this.posterUrl;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let images = [];
          let {
            schoolId,
            showType,
            contentDetail,
            posterUrl,
            templateTitle,
            templateId,
            duration,
            ...args
          } = this.form;
          if (this.imageList.length) {
            images = this.imageList.map(elem => {
              return { name: elem.name, url: elem.url };
            });
          }
          let obj = Object.assign({}, args, { images });
          //console.log(obj);
          this.updateContent(obj);
        }
      });
    },
    //查询栏目名称
    async queryChannelAll() {
      let res = await service.queryChannelAll({});
      if (res.errorCode === 0) {
        this.channelList = res.data;
      }
    },
    //查询栏目模板时间段
    async querySchoolPlayListTime(contentType) {
      let res = await service.querySchoolPlayListTime({ contentType });
      if (res.errorCode === 0) {
        this.schoolPlayTime = res.data;
      }
    },
    //查询内容模板列表
    async queryContentTemplate(showType) {
      let res = await service.queryContentTemplate({ showType });
      if (res.errorCode === 0) {
        this.posterList = res.data;
        let itemTemplateId = this.posterList.findIndex(
          item => item.templateId === this.form.templateId
        );
        this.posterIndex = itemTemplateId;
      }
    },
    //查询编辑内容
    async queryContentByContentId(contentId) {
      let res = await service.queryContentByContentId({ contentId });
      if (res.errorCode === 0) {
        this.loading = false;
        this.form = res.data;
        this.imageList = this.form.images;
        this.screenIndex = this.form.showType; //回选展示形式
        //this.queryContentTemplate(this.form.showType);
        this.status = this.form.contentType.toString();
        if (this.type === 1) {
          this.querySchoolPlayListTime(this.form.contentType);
        } else {
          this.queryChannelAll();
        }
        if (this.form.videoUrl) {
          this.videoFileList.push({
            name: "点击查看",
            url: this.form.videoUrl
          });
        }
        if (
          this.screenIndex == 1 ||
          this.screenIndex == 2 ||
          this.screenIndex == 4 ||
          this.screenIndex == 5
        ) {
          this.disabledVideo = 1;
        }
        if (
          this.screenIndex == 3 ||
          this.screenIndex == 4 ||
          this.screenIndex == 5
        ) {
          this.disabledImg = 1;
        }
      }
    },
    //内容编辑上传
    async updateContent(params = {}) {
      let res = await service.updateContent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        //this.resetForm("form");
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    }
  },
  activated() {
    bus.$on("collapse", msg => {
      return msg ? (this.collapse = false) : (this.collapse = true);
    });
    this.queryContentByContentId(this.$route.params.id);
  },
  mounted() {},
  updated() {}
};
</script>
<style lang="less" scoped>
.newUpload {
  padding: 20px;
  margin-bottom: 100px;
  background-color: #fff;
}
.collapse-200 {
  left: 200px;
  width: calc(100% - 200px);
}
.collapse-64 {
  left: 64px;
  width: calc(100% - 64px);
}
.page-header {
  position: fixed;
  bottom: 0;
  z-index: 10;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  transition: left 0.6s, width 0.6s;
  box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.12);
}
.poster {
  position: relative;
  color: #909399;
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
  .text {
    padding: 0 5px;
    margin-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .image {
    height: 220px;
    &.selected {
      border: 2px dashed #409eff;
    }
  }
}
.showType-item {
  margin: 10px 0;
  color: #909399;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f5;
  &.selected {
    border: 2px dashed #409eff;
  }
  .image {
    width: 100%;
  }
}
.tip-box {
  margin: 30px 0;
}
.element-box {
  width: 1080px;
  height: 1590px;
  margin: 0px auto 30px auto;
  position: relative;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(28, 31, 33, 0.1);
}
.views-image {
  text-align: center;
}
</style>
