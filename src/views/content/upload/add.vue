<template>
   <div class="page">
       <div class="upload-add">
           <el-row :gutter="40">
               <el-col :span="10">
                    <el-form :rules="rules" ref="query" :model="query" size="mini" label-width="120px" label-position="left">
                        <el-form-item label="内容类型" prop="contentType">
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
                        </template>                                          
                        <template v-if="query.contentType === 0">
                            <el-form-item label="内容属性" prop="contentProperty">
                                <el-select v-model="query.contentProperty">
                                    <el-option v-for="item in contentPropertyList" 
                                        :key="item.value" 
                                        :label="item.label" 
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>   
                        </template>                        
                        <template v-if="query.contentType === 1">
                            <el-form-item label="文字内容" prop="contentDetail">
                                <el-input type="textarea" v-model="query.contentDetail" :rows="5" placeholder="请输入内容作者"></el-input>
                            </el-form-item>
                        </template>  
                        <template v-if="query.contentType === 0">                            
                            <el-form-item label="播放时长" prop="duration">
                                <el-time-picker v-model="query.duration" placeholder="选择播放时长"></el-time-picker>
                            </el-form-item> 
                        </template>
                        <template v-if="query.contentType === 0"> 
                            <el-form-item label="屏幕展示形式" prop="contentTemplateId">
                                <el-select v-model="query.contentTemplateId" clearable placeholder="请选择内容模板" @change="handleChange">
                                    <el-option
                                        v-for="item in contentTemplateList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>                  
                                </el-select>   
                                <a href="javascript:;" 
                                    class="poster-a" 
                                    style="color:#409EFF" 
                                    v-if="query.contentTemplateId" @click="posterEditAction">请选择海报编辑</a>                              
                            </el-form-item>  
                        </template>                        
                        <!-- <template v-if="query.contentType === 0">
                            <el-form-item label="屏幕展示形式">
                                <el-select v-model="query.contentTemplateId" clearable placeholder="请选择内容模板">
                                    <el-option
                                        v-for="item in contentTemplateList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>                  
                                </el-select>                                
                                <div class="screen-box" @click="posterEditAction(1)">
                                    <div class="item"></div>
                                </div>          
                                <div class="screen-box" @click="posterEditAction(2)">
                                    <div class="item"></div>
                                </div>    
                                <div class="screen-box" @click="posterEditAction(3)">
                                    <div class="item"></div>
                                </div>                                                                                          
                            </el-form-item>
                        </template> -->
                        <template v-if="query.contentType === 0">
                            <el-form-item label="视频上传" prop="videoUrl">
                                <el-upload 
                                    class="upload-video" 
                                    :disabled="false"
                                    name="file"
                                    action="http://192.168.18.106:8080/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                                    accept="video/*">
                                    <i class="el-icon-plus"></i>
                                </el-upload>                                
                            </el-form-item>
                        </template>                        
                        <template v-if="query.contentType === 1">
                            <el-form-item label="播放时长">
                                <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    format="yyyy-MM-dd"
                                    v-model="validityData"
                                    size="mini"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>                                    
                            </el-form-item>
                        </template>    
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="upload('query')">上传</el-button>
                        </el-form-item>                        
                    </el-form>
               </el-col>
           </el-row>
       </div>
   </div> 
</template>
<script>
export default {
  name: "uploadAdd",
  data() {
    return {
      disabled: 0,
      query: {
        schoolId: 0,
        title: "",
        author: "",
        channelId: 0,
        contentProperty: null,
        contentType: 0,
        duration: ""
      },
      validityData: [],
      rules: {
        title: [{ required: true, message: "请输入内容标题", trigger: "blur" }],
        contentDetail: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        contentProperty: [
          { required: true, message: "请输入内容作者", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入内容作者", trigger: "blur" }
        ],
        contentTemplateId: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        duration: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ]
      },
      contentPropertyList: [
        { value: 0, label: "原创" },  
        { value: 1, label: "摘要" }  
      ],
      contentTemplateList: [
        { value: 1, label: "上视频+下海报" },
        { value: 2, label: "上海报+下视频" },
        { value: 3, label: "海报" }
      ]
    };
  },
  watch: {},
  methods: {
    handleRadio(value) {
    },  
    handleChange(value) {
      console.log(value);
    },
    posterEditAction() {
        this.$router.push({ path: '/content/poster' });
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
          console.log(this.query);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.upload-add {
  background-color: #fff;
  padding: 20px;
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
.upload-video {
  height: 180px;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;
  background-size: 30px 30px;
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
  i {
    font-size: 50px;
  }
  &:hover {
    border-color: #409eff;
  }
}
</style>
