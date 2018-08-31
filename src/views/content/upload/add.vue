<template>
   <div class="page">
       <template>
           <el-row :gutter="20">
               <el-col :span="8">
                    <el-form :rules="rules" ref="query" :model="query" size="small" label-width="100px" label-position="left" style="width:460px;">
                        <el-form-item label="内容类型" prop="contentType">
                            <el-radio-group v-model="query.contentType">
                                <el-radio-button :label="0" size="mini">全屏播放</el-radio-button>
                                <el-radio-button :label="1" size="mini">滚动播放</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="query.contentType === 0">
                            <el-form-item label="内容属性" prop="contentProperty">
                                <el-radio-group v-model="query.contentProperty">
                                    <el-radio-button :label="0" size="mini">原创</el-radio-button>
                                    <el-radio-button :label="1" size="mini">摘要</el-radio-button>
                                </el-radio-group>
                            </el-form-item>   
                        </template>                        
                        <el-form-item label="内容标题" prop="title">
                            <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="20"></el-input>
                        </el-form-item>
                        <template v-if="query.contentType === 0">   
                            <el-form-item label="内容作者" prop="author">
                                <el-input v-model="query.author" placeholder="请输入内容作者" maxlength="4"></el-input>
                            </el-form-item>
                        </template>
                        <template v-if="query.contentType === 1">
                            <el-form-item label="文字内容" prop="contentDetail">
                                <el-input type="textarea" v-model="query.contentDetail" :rows="5" placeholder="请输入内容作者"></el-input>
                            </el-form-item>
                        </template>  
                        <template v-if="query.contentType === 0"> 
                            <el-form-item label="内容模板" prop="contentTemplateId">
                                <el-select v-model="query.contentTemplateId" clearable placeholder="请选择内容模板">
                                    <el-option
                                        v-for="item in contentTemplateList"
                                        :key="item.value"
                                        :label="item.label"
                                            :value="item.value">
                                    </el-option>                  
                                </el-select>                                 
                            </el-form-item>  
                        </template>
                        <template v-if="query.contentType === 0">                            
                            <el-form-item label="播放时长" prop="duration">
                                <el-time-picker v-model="query.duration" placeholder="选择播放时长"></el-time-picker>
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
                            <el-button :disabled="disabled === 0" size="mini" type="primary" @click="upload('query')">上传</el-button>
                        </el-form-item>                        
                    </el-form>
               </el-col>
               <el-col :span="16">
                   <h3>海报模板选择</h3>
               </el-col>
           </el-row>
       </template>
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
        contentProperty: 0,
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
        contentTemplateId: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        duration: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ]
      },
      contentTemplateList: [
        { value: 1, label: "上视频+下海报" },
        { value: 2, label: "上海报+下视频" },
        { value: 3, label: "海报" }
      ]
    };
  },
  methods: {
    upload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page-form {
  min-height: 500px;  
  padding-bottom: 18px;
}
</style>
