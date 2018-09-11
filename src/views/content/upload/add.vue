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
                            </el-form-item>  
                            <el-form-item label="内容模板选择">
                                <el-select v-model="query.templateId" clearable placeholder="请选择内容模板选择" @change="handlePoster">
                                  <el-option v-for="item in posterList" :key="item.templateId" :label="item.title" :value="item.templateId"></el-option>
                                </el-select>
                            </el-form-item> 
                            <el-form-item label="视频上传" prop="videoUrl">
                                <el-upload 
                                    class="upload-video"
                                    ref="upload" 
                                    name="file"
                                    :disabled="disabled === 0"
                                    action="http://192.168.18.106:8080/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                                    accept="video/mp4,video/flv,video/mov"
                                    :on-success="handleVideoSuccess"
                                    :before-remove="beforeRemove">
                                    <el-button :disabled="disabled === 0" slot="trigger" size="mini" type="info" style="width: 100%;">点击选取视频</el-button>
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
                            <el-form-item label="文字内容" prop="componentValue">
                                <el-input type="textarea" v-model="query.componentValue" :rows="5" placeholder="请输入内容作者"></el-input>
                            </el-form-item>  
                        </template>   
                        <el-form-item label="播放时长" prop="duration">
                            <el-time-picker 
                              format="HH:mm:ss"
                              value-format="HH:mm:ss"                            
                              v-model="query.duration" 
                              placeholder="选择播放时长" 
                              style="width: 100%;">
                            </el-time-picker>
                        </el-form-item>                                                                                                                                               
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="upload('query')">上传</el-button>
                        </el-form-item>                        
                    </el-form>
               </el-col>
               <el-col :span="16">
                 <h3>海报模板缩略展示</h3>
                 <el-row :gutter="10">
                   <img :src="img" alt="" v-if="img">
                 </el-row>
               </el-col>
           </el-row>
       </div>
   </div> 
</template>
<script>
import service from "@/api";
export default {
  name: "uploadAdd",
  data() {
    return {
      disabled: 0,
      posterList: [],
      img: "",
      query: {
        schoolId: 2,
        title: "",
        author: "",
        channelId: null,
        belongTo: 1,
        videoUrl: null,
        showType: 0,
        templateId: null,
        contentProperty: 0,
        contentType: 0,
        duration: "",
        componentValue: ""
      },
      validityData: [],
      rules: {
        title: [{ required: true, message: "请输入内容标题", trigger: "blur" }],
        componentValue: [
          { required: true, message: "请输入文字内容", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入内容作者", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "请选择栏目名称", trigger: "blur" }
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
      channelList: []
    };
  },
  computed: {
    Height() {
      return window.innerHeight - 110;
    }
  },
  methods: {
    handleRadio(value) {
      this.$refs.query.clearValidate();
    },
    handleChange(value) {
      if (value === 1 || value === 2) {
        this.disabled = 1;
      }else {
        this.disabled = 0;
      }
      this.queryContentTemplateAction(value);
    },
    handlePoster(value) {
      let obj = this.posterList.find(item => item.contentId === value);
      this.img = obj.smallUrl;
    },
    handleVideoSuccess(response, file, fileList) {
      if (response.errorCode === 0) {
        this.query.videoUrl = response.data.url;
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
          console.log(this.query);
          let obj = {};
          let { showType, contentType, componentValue, ...args } = this.query;
          if (args.videoUrl === null) {
            this.$message({ message: `请上传视频`, type: "warning" });
            return false;
          }
          //全屏播放 
          if (contentType === 0) {
            obj = Object.assign({}, args, { contentType });
          }
          //滚动播放
          if (contentType === 1) {
            obj = Object.assign({}, args, { componentValue });
          }
          //this.uploadContentAction(args);
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
    //上传内容
    async uploadContentAction(params = {}) {
      let res = await service.uploadContent(params);
      if (res.errorCode === 0) {

      }
    }
  },
  mounted() {
    this.queryChannelInner();
    this.queryContentTemplateAction(0);
  }
};
</script>
<style lang="less">
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
