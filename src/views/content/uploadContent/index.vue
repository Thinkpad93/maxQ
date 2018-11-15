<template>
   <div class="page">
     <div class="newUpload">
        <!-- 保存按钮 -->
        <div class="page-header" :class="[ collapse ? 'collapse-200' : 'collapse-64' ]">
          <!-- <el-button :disabled="disabledScreen === 0" type="info" @click="dialogTemplate = true">选择海报模板</el-button>                                                              -->
          <el-button type="primary" @click="handleUpload('form')">上传内容</el-button>
        </div>      
        <el-row :gutter="30">
          <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="14" :offset="4">              
            <el-form ref="form" :model="form" status-icon label-position="center" :label-width="formLabelWidth">             
              <el-tabs type="card" class="qx-page-tabs" v-model="status" @tab-click="handleTabClick">
                <el-tab-pane label="内容播放" name="0">
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
                          <el-form-item label="内容作者" prop="author" :rules="[
                            { required: true, message: '请输入内容作者', trigger: 'blur' }
                            ]">
                              <el-input v-model="form.author" placeholder="请输入内容作者" maxlength="20"></el-input>
                          </el-form-item>                 
                      </el-col>
                      <el-col :span="24">
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
                      <template v-if="form.contentType === 0">
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
                    <template v-if="form.contentType === 0">
                      <el-col :span="24">
                        <el-form-item label="播放时长" prop="durationTime" :rules="[
                          { required: true, message: '请选择播放时长', trigger: 'blur' }
                          ]">
                          <el-time-picker 
                            format="mm:ss"
                            value-format="mm:ss"                       
                            v-model="form.durationTime" 
                            placeholder="选择播放时长" 
                            style="width: 100%;">
                          </el-time-picker>
                        </el-form-item>                    
                      </el-col>
                    </template>
                    <template v-if="type === 1">
                      <template v-if="form.contentType === 0">
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
                  <el-alert title="选择展示类型" type="info" :closable="false"></el-alert>
                  <el-row :gutter="10">
                    <el-col :span="4" v-for="(item, index) in contentTemplateList" :key="index">
                      <div class="showType-item" 
                        :class="[ index === screenIndex ? 'selected' : '']" 
                        @click="handleScreenSelect(index, item.value)">
                        <span>{{ item.label }}</span>
                        <!-- <img src="https://fakeimg.pl/100x150/f4f4f5/fff" class="image"> -->
                      </div>               
                    </el-col>
                  </el-row>                  
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <template>
                        <el-upload
                          :disabled="disabledImg === 0"
                          name="files"
                          ref="uploadImage"
                          action="/qxiao-cms/action/mod-xiaojiao/image/filesUpload.do"
                          accept="image/jpeg,image/gif,image/png,image/bmp"
                          :file-list="imageList"
                          :on-remove="handleRemoveImg" 
                          :on-preview="handlePreviewImg"
                          :on-success="handleImageSuccess"
                          :before-upload="beforeImageUpload">
                          <el-button :disabled="disabledImg === 0" slot="trigger" size="small" type="primary" style="width: 100%;">
                          <i class="el-icon-upload el-icon--right"></i> 点击选取图片</el-button>
                          <div class="el-upload__tip" slot="tip">上传1080*1590的图片，不超过2MB</div>
                        </el-upload>   
                      </template>                   
                    </el-col>
                    <el-col :span="12">
                      <template>
                        <el-upload
                          :disabled="disabledVideo === 0"
                          name="file"
                          ref="uploadVideo"
                          :limit="1"
                          action="/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                          accept="video/mp4,video/flv,video/mov"
                          :on-remove="handleRemoveVideo" 
                          :on-preview="handlePreviewVideo"
                          :on-success="handleVideoSuccess"
                          :before-upload="beforeVideoUpload">
                          <el-button :disabled="disabledVideo === 0" slot="trigger" size="small" type="primary" style="width: 100%;">
                          <i class="el-icon-upload el-icon--right"></i> 点击选取视频</el-button>
                          <div class="el-upload__tip" slot="tip">视频大小不超过100MB</div>
                        </el-upload>  
                      </template>                      
                    </el-col>
                  </el-row>       
                </el-tab-pane>
                <el-tab-pane label="滚动通知" name="1">
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
                  <!-- <el-row :gutter="10">
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
                  </el-row>    -->
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 1">
                      <el-col :span="24">
                          <el-form-item label="文字内容" prop="rollContent" :rules="[
                            { required: true, message: '请输入文字内容', trigger: 'blur' }
                            ]">
                            <el-input type="textarea" v-model="form.rollContent" :rows="5" placeholder="请输入文字内容"></el-input>
                          </el-form-item>                
                      </el-col>
                    </template>
                  </el-row>
                  <el-row :gutter="10">
                    <template v-if="form.contentType === 1">
                      <el-col :span="24">
                        <el-form-item label="播放有效期" prop="rollTime" :rules="[
                          { required: true, message: '请选择播放有效期', trigger: 'blur' }
                        ]">
                          <el-date-picker 
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            v-model="form.rollTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </template>
                  </el-row>                  
                </el-tab-pane>
              </el-tabs>                              
            </el-form>
          </el-col>
        </el-row>     
        <!-- <el-row :gutter="30">
          <el-col :span="24">
            <div class="tip-box">
              <el-button type="info">上一页</el-button>
              <el-button type="info">下一页</el-button>
              <el-button type="info" @click="handlePosterSaveData">保存编辑</el-button>
            </div> 
          </el-col>
        </el-row>       -->
        <!-- 如果有多页海报模板 -->
        <!-- 保存修改 -->
        <!-- 保存修改 -->
        <!-- <el-row :gutter="30">
          <el-col :span="24">
            <div class="element-box">
              <div class="poster-page"></div>
              <div class="poster-save"></div> 
              <iframe id="posterFrame" ref="iframe" :src="url"></iframe>
            </div>
          </el-col>
        </el-row> -->
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
          <div class="views-image" v-if="imageList.length">
            <el-carousel :autoplay="false" height="1030px" :initial-index="carouselIndex">
              <el-carousel-item v-for="(item, index) in imageList" :key="index">
                <img :src="item.url" width="700" height="1030" :alt="item.name">
              </el-carousel-item>
            </el-carousel>
          </div>         
       </el-dialog>
     </template>
     <!-- 视频查看 --> 
     <template>
       <el-dialog title="视频查看" center top="40px" :visible.sync="dialogViewVideo">
          <div class="views-video" v-if="form.videoUrl">
            <video :src="form.videoUrl" controls autoplay loop width="1080" height="710" style="width:100%"></video>
          </div>         
       </el-dialog>
     </template>
   </div> 
</template>
<script>
import bus from "@/utils/bus";
import service from "@/api";
import { contentProperty, contentTemplate } from "@/mixins";
import { disabledDate } from "@/utils/tools";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "newUpload",
  mixins: [contentProperty, contentTemplate],
  inject: ["reload"], //注入依赖
  data() {
    return {
      disabledImg: 0,
      disabledVideo: 0,
      disabledUpload: 0,
      disabledScreen: 1,
      dialogViewImg: false,
      dialogViewVideo: false,
      dialogShowType: false,
      dialogTemplate: false,
      formLabelWidth: "100px",
      status: "0",
      screenIndex: 0,
      posterIndex: -1,
      carouselIndex: 0,
      collapse: true,
      url: "./static/20180908/index.html",
      posterUrl: "",
      //previewImg: "",
      imageList: [], //多图片查看
      form: {
        title: "",
        channelId: null,
        contentType: 0,
        contentProperty: 0,
        author: "",
        durationTime: "",
        templateId: 0,
        videoUrl: "",
        belongTo: 0, // 0-不专属 1-专属对应学校
        rollTime: [],
        rollContent: "",
        showType: 0
      },
      pickerOptions: {
        disabledDate
      },
      iframeWin: {},
      channelList: [],
      posterList: [],
      schoolPlayTime: []
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
    ...mapActions("tabs", ["removes"]),
    removeAction(route) {
      this.removes(route).then(res => {
        if (route.path === this.$route.path) {
          this.$router.push({ path: "/content/upload" });
        }
      });
    },
    //iframe操作
    handlePosterSaveData() {
      this.iframeWin.postMessage({ cmd: "save", params: {} }, "*");
    },
    //图片删除
    handleRemoveImg(file, fileList) {
      let { url } = file;
      this.deletePicture(url).then(res => {
        if (res) {
          this.imageList = fileList;
        }
      });
    },
    handlePreviewImg(file) {
      let uploadFiles = this.$refs.uploadImage.uploadFiles;
      let index = uploadFiles.findIndex(elem => elem.name === file.name);
      if (index != -1) {
        this.carouselIndex = index;
        this.dialogViewImg = true;
      }
    },
    handleRemoveVideo(file) {
      console.log(file);
    },
    handlePreviewVideo() {
      this.dialogViewVideo = true;
    },
    //上传图片成功
    handleImageSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.imageList.push({ ...response.data });
      }
    },
    //图片上传大小限制为2M
    beforeImageUpload(file) {
      let isJPG = file.type === "image/jpeg";
      let isGIF = file.type === "image/gif";
      let isPNG = file.type === "image/png";
      let isMBP = file.type === "image/bmp";
      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isMBP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP格式!");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB!");
      }
      return (isJPG || isGIF || isPNG || isMBP) && isLt2M;
    },
    //
    beforeVideoUpload(file) {
      let isMP4 = file.type === "video/mp4";
      let isFLV = file.type === "video/flv";
      let isMOV = file.type === "video/mov";

      if (!isMP4 && !isFLV && !isMOV) {
        this.$message.error("视频必须是MP4/FLV/MOV/格式!");
      }

      return isMP4 || isFLV || isMOV;
    },
    //上传视频成功
    handleVideoSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.form.videoUrl = response.data.url;
      }
    },
    handleTabClick(tab) {
      this.form.contentType = parseInt(tab.name);
      this.screenIndex = 0;
      this.handleResetForm();
    },
    handleScreenSelect(index, value) {
      this.screenIndex = index;
      //this.form.showType = index;
      if (index == 1 || index == 2 || index == 4 || index == 5) {
        this.disabledVideo = 1;
      } else {
        this.disabledVideo = 0;
      }
      if (index === 3 || index === 4 || index === 5) {
        this.disabledImg = 1;
        this.disabledScreen = 0;
        this.form.templateId = 0;
        this.posterIndex = -1;
      } else {
        this.disabledImg = 0;
        this.disabledScreen = 1;
      }
      //只能在选择海报的形式才加载
      if (index === 0 || index === 1 || index === 2) {
        this.disabledScreen = 1;
        this.form.templateId = 0;
        this.posterIndex = -1;
        this.queryContentTemplate(value);
      }
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
    handleResetForm() {
      this.imageList = [];
      this.$refs.uploadImage.clearFiles();
      this.$refs.uploadVideo.clearFiles();
      this.$refs.form.resetFields();
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    handleUpload(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let images = [];
          let playTime = "";
          let endTime = "";
          let {
            contentType,
            showType,
            belongTo,
            rollTime,
            ...args
          } = this.form;
          //图片判断
          if (
            !this.imageList.length &&
            (this.screenIndex === 3 ||
              this.screenIndex === 4 ||
              this.screenIndex === 5)
          ) {
            this.$message({
              message: `请上传图片`,
              type: "warning"
            });
            return false;
          }
          //视频判断
          if (
            !this.form.videoUrl &&
            (this.screenIndex === 4 || this.screenIndex === 5)
          ) {
            this.$message({
              message: `请上传视频`,
              type: "warning"
            });
            return false;
          }
          //上传的图片数据
          if (
            this.screenIndex == 3 ||
            this.screenIndex == 4 ||
            this.screenIndex == 5
          ) {
            images = [...this.imageList];
          }
          if (this.type === 1) {
            belongTo = this.type;
          }
          if (rollTime.length) {
            playTime = rollTime[0];
            endTime = rollTime[1];
          }
          if (contentType === 1) {
            showType = -1;
          } else {
            showType = this.screenIndex;
          }
          let obj = Object.assign({}, args, {
            belongTo,
            images,
            contentType,
            showType,
            playTime,
            endTime
          });
          console.log(obj);
          this.uploadContentAction(obj);
          //let channelId = [];
          // let images = [];
          // let { belongTo, showType, ...args } = this.form;
          // if (
          //   this.form.templateId === 0 &&
          //   (this.screenIndex == 0 ||
          //     this.screenIndex == 1 ||
          //     this.screenIndex == 2)
          // ) {
          //   if (this.form.contentType != 1) {
          //     this.$message({
          //       message: `你选择的展示形式是${
          //         this.contentTemplateList[this.screenIndex].label
          //       },必须要选择海报模板`,
          //       type: "warning"
          //     });
          //     return false;
          //   }
          // }
          // //图片判断
          // if (
          //   !this.imageList.length &&
          //   (showType == 3 || showType == 4 || showType == 5)
          // ) {
          //   if (this.form.contentType === 0) {
          //     this.$message({
          //       message: `你选择的展示形式是${
          //         this.contentTemplateList[this.screenIndex].label
          //       },必须要上传图片`,
          //       type: "warning"
          //     });
          //     return false;
          //   }
          // }
          // //视频判断
          // if (
          //   this.form.videoUrl === "" &&
          //   (this.screenIndex == 1 ||
          //     this.screenIndex == 2 ||
          //     this.screenIndex == 4 ||
          //     this.screenIndex == 5)
          // ) {
          //   if (this.form.contentType === 0) {
          //     this.$message({
          //       message: `你选择的展示形式是${
          //         this.contentTemplateList[this.screenIndex].label
          //       },必须要上传视频`,
          //       type: "warning"
          //     });
          //     return false;
          //   }
          // }
          // //如果是学校账号
          // // if (this.type === 1) {
          // //   belongTo = this.type;
          // //   this.schoolPlayTime.forEach(oldItem => {
          // //     if (playTime.find(newItem => oldItem.itemId == newItem)) {
          // //       channelId.push(oldItem.channelId);
          // //     }
          // //   });
          // // } else {
          // //   if (this.form.contentType === 0) {
          // //     channelId.push(1);
          // //   } else {
          // //     channelId.push(args.channelId);
          // //   }
          // // }
          // //上传的图片数据
          // if (showType == 3 || showType == 4 || showType == 5) {
          //   //images = [].concat(this.imageList);
          //   images = [...this.imageList];
          // }
          // let obj = Object.assign({}, args, {
          //   //channelId,
          //   belongTo,
          //   showType,
          //   images
          // });
          // console.log(obj);
          // //this.uploadContentAction(obj);
        }
      });
    },
    //删除图片
    async deletePicture(url) {
      let res = await service.deletePicture({ url });
      if (res.errorCode === 0) {
        return true;
      }
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
      }
    },
    //上传内容
    async uploadContentAction(params = {}) {
      let res = await service.uploadContent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$alert("内容上传成功", "提示", {
          confirmButtonText: "确定",
          showClose: false,
          type: "success"
        })
          .then(() => {
            this.removeAction(this.$route);
            setTimeout(() => {
              this.reload();
            }, 50);
          })
          .catch(error => {
            return false;
          });
      }
    }
  },
  mounted() {
    bus.$on("collapse", msg => {
      return msg ? (this.collapse = false) : (this.collapse = true);
    });
    if (this.type == 1) {
      this.querySchoolPlayListTime(this.form.contentType);
    } else {
      this.queryChannelAll();
    }
    this.queryContentTemplate(0);

    //this.iframeWin = this.$refs.iframe.contentWindow;
  }
};
</script>
<style lang="less" scoped>
.newUpload {
  padding: 20px 20px 50px 20px;
  min-height: 600px;
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
    width: 133px;
    height: 190px;
    &.selected {
      border: 2px dashed #409eff;
    }
  }
}
.showType-item {
  margin: 20px 0;
  color: #909399;
  cursor: pointer;
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
  text-align: center;
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
