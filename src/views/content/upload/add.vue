<template>
   <div class="page">
       <div class="upload-add">
           <el-row :gutter="40">
               <el-col :span="8">
                    <el-form :rules="rules" ref="query" :model="query" size="mini" label-width="100px" label-position="left">
                        <el-form-item label="内容类型">
                            <el-radio-group v-model="query.contentType" @change="handleRadio">
                                <el-radio-button :label="0" size="mini">全屏播放</el-radio-button>
                                <el-radio-button :label="1" size="mini">滚动播放</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="内容标题" prop="title">
                            <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="20"></el-input>
                        </el-form-item>                            
                        <template v-if="query.contentType === 0">
                            <el-form-item label="内容作者" prop="author">
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
                            <el-form-item label="栏目名称" prop="channelId">
                                <el-select v-model="query.channelId" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in channelList" 
                                        :key="item.channelId" 
                                        :value="item.channelId"
                                        :label="item.name">
                                    </el-option>
                                </el-select>      
                            </el-form-item>  
                            <el-form-item label="展示类型" prop="showType">
                                <el-select v-model="query.showType" clearable placeholder="请选择内容模板" @change="handleChange">
                                    <el-option
                                        v-for="item in contentTemplateList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>                  
                                </el-select>   
                                <!-- <a href="javascript:;" 
                                        class="poster-a" 
                                        style="color:#409EFF" 
                                        v-if="query.contentTemplateId" @click="posterEditAction">请选择海报编辑</a>                               -->
                            </el-form-item>  
                            <el-form-item label="内容模板选择">
                                <el-select v-model="query.contentTemplateId" clearable placeholder="请选择内容模板选择" @change="handleChange">
                                  <el-option v-for="item in contentTemplateIdList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item> 
                            <el-form-item label="视频上传" prop="videoUrl">
                                <el-upload 
                                    class="upload-video"
                                    ref="upload" 
                                    name="file"
                                    :disabled="disabled === 1"
                                    action="http://192.168.18.106:8080/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                                    accept="video/mp4,video/flv,video/mov"
                                    :on-success="handleVideoSuccess">
                                    <el-button :disabled="disabled === 1" slot="trigger" size="mini" type="info" style="width: 100%;">点击选取视频</el-button>
                                </el-upload>                                
                            </el-form-item>  
                            <el-form-item label="视频预览">
                                <div class="views-video">
                                  <template v-if="query.videoUrl">
                                    <video :src="query.videoUrl" controls autoplay loop></video>
                                  </template>
                                </div>                              
                            </el-form-item>                                                                                                               
                        </template> 
                        <template v-else>
                            <el-form-item label="文字内容" prop="contentDetail">
                                <el-input type="textarea" v-model="query.contentDetail" :rows="5" placeholder="请输入内容作者"></el-input>
                            </el-form-item>  
                        </template>   
                        <el-form-item label="播放时长" prop="duration">
                            <el-time-picker v-model="query.duration" placeholder="选择播放时长" style="width: 100%;"></el-time-picker>
                        </el-form-item>                                                                                                                                               
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="upload('query')">上传</el-button>
                        </el-form-item>                        
                    </el-form>
               </el-col>
               <!-- <el-col :span="16">
                  <h3>海报模板编辑选择</h3>
                  <el-row :gutter="10">
                    <el-col :span="20" :offset="2">
                      <swiper :options="swiperOption" ref="pSwiper">
                          <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                            <img src="@/images/unlc913q91edsg.png" alt="">
                          </swiper-slide>
                      </swiper>                      
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                      <div class="element-box">
                        <iframe ref="iframe" src="../static/poster1.html"></iframe>
                      </div>
                      <div class="page-manage"></div>
                  </el-row>                  
               </el-col> -->
           </el-row>
       </div>
   </div> 
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import service from "@/api";
export default {
  name: "uploadAdd",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      disabled: 0,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 10
      },
      swiperSlides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      query: {
        schoolId: 2,
        title: "",
        author: "",
        channelId: null,
        belongTo: 1,
        videoUrl: null,
        showType: null,
        contentProperty: 0,
        contentTemplateId: null,
        contentType: 0,
        duration: ""
      },
      validityData: [],
      rules: {
        title: [{ required: true, message: "请输入内容标题", trigger: "blur" }],
        contentDetail: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入内容作者", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "请选择栏目名称", trigger: "blur" }
        ],
        showType: [
          { required: true, message: "请选择展示类型方式", trigger: "blur" }
        ],
        contentTemplateId: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        duration: [
          { required: true, message: "请选择播放时长", trigger: "blur" }
        ]
      },
      contentPropertyList: [
        { value: 0, label: "原创" },
        { value: 1, label: "摘要" }
      ],
      contentTemplateList: [
        { value: 0, label: "纯海报方式" },
        { value: 1, label: "上视频下海报方式" },
        { value: 2, label: "上海报下视频方式" }
      ],
      contentTemplateIdList: [
        { value: 1, label: "秋季多吃冷眼食物" },
        { value: 2, label: "火灾发生三要素" },
        { value: 3, label: "日常交通安全" },
        { value: 4, label: "周易" }
      ],
      channelList: []
    };
  },
  computed: {
    Height() {
      return window.innerHeight - 110;
    }
  },
  watch: {},
  methods: {
    handleRadio(value) {
      this.$refs.query.clearValidate();
    },
    handleChange(value) {
      if (value === 0) {
        this.disabled = 1;
      } else {
        this.disabled = 0;
      }
    },
    handleVideoSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.query.videoUrl = response.data.url;
      }
    },
    posterEditAction() {
      this.$router.push({ path: "/content/poster" });
      //this.$router.push({ path: `/content/poster/${field}` });
      //this.$router.push({ name: 'poster', params: { id: `${field}` } });
      //this.$router.push({ path: "poster", query: { id: `${field}` } });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    upload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj;
          let { videoUrl, contentType, ...args } = this.query;
          if (videoUrl === null) {
            this.$message({ message: `请上传视频`, type: "warning" });
            return false;
          }
          if (contentType === 0) {
          }
        }
      });
    },
    //显示内容模板列表
    async queryContentTemplateAction(showType) {
      let res = await service.queryContentTemplate({ showType });
      if (res.errorCode === 0) {
        this.posterList = res.data;
      }
      // queryContentTemplate({ showType }).then(res => {
      //   console.log(res);
      //   if (res.errorCode === 0) {
      //     this.posterList = res.data;
      //   }
      // });
    },
    //查询栏目名称
    async queryChannelInner() {
      let res = await service.queryChannelAll({});
      if (res.errorCode === 0) {
        this.channelList = res.data;
      }
      // queryChannelAll({}).then(res => {
      //   if (res.errorCode === 0) {
      //     this.channelList = res.data;
      //   }
      // });
    },
    //上传内容
    async uploadContentAction(params = {}) {
      let res = await service.uploadContent(params);
      if (res.errorCode === 0) {

      }
      // uploadContent(params).then(res => {
      //   console.log(res);
      // });
    }
  },
  mounted() {
    this.queryChannelInner();
    //this.queryContentTemplateAction(0);
  }
};
</script>
<style lang="less">
@import "swiper/dist/css/swiper.css";
.swiper-container {
  height: 100px;
}
.swiper-slide {
  cursor: pointer;
  background-color: #ccc;
}
.element-box {
  width: 400px;
  height: 700px;
  border-radius: 6px;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(28, 31, 33, 0.1);
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
  width: 424px;
  height: 200px;
  border-radius: 4px;
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
