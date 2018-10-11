<template>
   <div class="page">
     <div class="newUpload">
        <!-- 保存按钮 -->
        <div class="page-header">
          <el-button size="small" type="primary" @click="handleUpload('form')">新增上传</el-button>
        </div>       
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form ref="form" :model="form" size="small" status-icon :label-width="formLabelWidth">
              <el-row :gutter="10">
                <el-col :span="20">
                  <el-form-item label="内容标题" prop="title" :rules="[
                      { required: true, message: '请输入内容标题', trigger:'blur' }
                    ]">
                    <el-input v-model="form.title" placeholder="请输入内容标题" maxlength="30"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="20">
                    <el-form-item label="文字内容" prop="componentValue" :rules="[
                      { required: true, message: '请输入文字内容', trigger: 'blur' }
                      ]">
                      <el-input type="textarea" v-model="form.componentValue" :rows="5" placeholder="请输入文字内容"></el-input>
                    </el-form-item>                
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="20">
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
              </el-row>   
              <el-row :gutter="10">
                <el-col :span="20">
                  <el-form-item label="展示类型" prop="templateId" :rules="[
                    { required: true, message: '请选择展示类型', trigger: 'blur' }
                    ]">
                    <el-button type="primary" @click="dialogShowType = true">请选择展示类型</el-button>
                    <!-- <span>请一定要选择内容模板哦</span> -->
                  </el-form-item>
                </el-col>
              </el-row>        
              <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="内容作者" prop="author" :rules="[
                      { required: true, message: '请输入内容作者', trigger: 'blur' }
                      ]">
                        <el-input v-model="form.author" placeholder="请输入内容作者" maxlength="4"></el-input>
                    </el-form-item>                 
                </el-col>
                <el-col :span="10">
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
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
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
                <el-col :span="10">
                  <el-form-item label="播放时段" prop="playTime" :rules="[
                    { required: true, message: '请选择播放时段', trigger: 'blur' }
                    ]">
                    <el-select style="width: 100%;" v-model="form.playTime" placeholder="请选择播放时段" value-key="itemId" multiple collapse-tags>
                      <el-option 
                        v-for="item in schoolPlayTime" 
                        :key="item.itemId" 
                        :label="item.time" 
                        :value="item.itemId">
                      </el-option>
                    </el-select>
                  </el-form-item>                   
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="图片上传" prop="imageUrl">
                    <el-upload
                      action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                      <span class="el-upload__tip" slot="tip">上传1080*1590的图片，不超过2MB</span>
                    </el-upload>
                  </el-form-item>
                </el-col>               
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="视频上传" prop="videoUrl">
                    <el-upload
                      class="upload-video"
                      action="/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                      <span class="el-upload__tip" slot="tip">视频大小不超过100MB</span>
                    </el-upload>
                  </el-form-item>
                </el-col> 
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="10">
            <!-- <div class="poster">
              <el-row :gutter="10">
                <el-col :span="6" v-for="(item, index) in 20" :key="index">
                  <div class="poster-item">
                    <img src="https://fakeimg.pl/446x300/4CD964/fff" class="image">
                  </div>
                </el-col>                             
              </el-row>
            </div> -->
          </el-col>
        </el-row>  
        <el-alert title="编辑海报模板" type="info" :closable="false"></el-alert>        
     </div>
     <!-- 屏幕展示形式选择 -->
     <template>
       <el-dialog width="60%" center title="屏幕展示形式选择" top="40px" :visible.sync="dialogShowType">
         <el-row :gutter="20">
           <el-col :span="4" v-for="(item, index) in 6" :key="index">
             <div class="screen" 
                :class="[ index === screenIndex ? 'screen-selected' : '']"
                @click="handleScreenSelect(index)">
               <img src="https://fakeimg.pl/446x300/f4f4f5/fff" class="image">
               <!-- <div class="btn-group">
                  <el-button size="small" type="primary">选择</el-button>
               </div> -->
             </div> 
           </el-col>
         </el-row>
         <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogShowType = false">取 消</el-button>
            <el-button size="small" type="primary" @click="handlePosterSave">确 定</el-button>           
         </div>
       </el-dialog>
     </template>
   </div> 
</template>
<script>
import { mapState } from "vuex";
import service from "@/api";
export default {
  name: "newUpload",
  data() {
    return {
      dialogShowType: false,
      formLabelWidth: "80px",
      screenIndex: 0,
      form: {
        title: "",
        componentValue: "",
        contentProperty: 0,
        author: "",
        channelId: null
      },
      contentPropertyList: [
        { value: 0, label: "原创" },
        { value: 1, label: "摘要" }
      ],
      channelList: [],
      contentTemplateList: [],
      schoolPlayTime: []
    };
  },
  computed: {
    ...mapState("qxuser", ["type"])
  },
  methods: {
    handleChange() {},
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {},
    handleScreenSelect(index) {
      this.screenIndex = index;
    },
    handlePosterSave() {
      this.dialogShowType = false;
    },
    handleUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    //查询栏目名称
    async queryChannelAll() {
      let res = await service.queryChannelAll({});
      if (res.errorCode === 0) {
        this.channelList = res.data;
      }
    }
  },
  mounted() {
    if (this.type !== 1) {
      this.queryChannelAll();
    }
  }
};
</script>
<style lang="less" scoped>
.newUpload {
  padding: 20px;
  background-color: #fff;
}
.page-header {
  margin-bottom: 20px;
  text-align: right;
  background-color: #fff;
}
.poster {
  height: 700px;
  overflow: auto;
  &-item {
    margin: 0 auto;
    margin-bottom: 10px;
    .image {
      height: 200px;
    }
  }
}
.screen {
  cursor: pointer;
  &-selected {
    border: 2px dashed #409eff;
  }
  .image {
    height: 260px;
  }
}
.upload-video {
  width: 100%;
}
</style>
