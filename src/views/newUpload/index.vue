<template>
   <div class="page">
     <div class="newUpload">
        <!-- 保存按钮 -->
        <div class="page-header" :class="[ collapse ? 'collapse-200' : 'collapse-64' ]">
          <el-button type="primary" @click="handleUpload('form')">上传内容</el-button>
        </div>            
        <template>
          <el-alert
            title="上传说明"
            type="info"
            :closable="false"
            description="选择海报模板后进行内容编辑">
          </el-alert>
        </template>       
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form ref="form" :model="form" size="small" status-icon :label-width="formLabelWidth">             
              <el-tabs class="qx-page-tabs" v-model="status" @tab-click="handleTabClick">
                <el-tab-pane label="全屏播放上传" name="1">
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
                              <el-input v-model="form.author" placeholder="请输入内容作者" maxlength="4"></el-input>
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
                      </template>
                    </template>
                  </el-row>   
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="图片上传" prop="imageUrl">
                        <el-upload
                          :disabled="disabledImg === 0"
                          name="honorImage"
                          action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                          accept="image/jpeg,image/gif,image/png,image/bmp">
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
                          action="/qxiao-cms/action/mod-xiaojiao/channel/content/uploadVideo.do"
                          accept="video/mp4,video/flv,video/mov">
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
                        :class="[ index === screenIndex ? 'selected' : '']" 
                        @click="handleScreenSelect(index, item.value)">
                        <span>{{ item.label }}</span>
                        <!-- <img src="https://fakeimg.pl/100x150/f4f4f5/fff" class="image"> -->
                      </div>               
                    </el-col>
                  </el-row>
                  <el-button size="small" type="primary" @click="dialogTemplate = true" style="margin-top:10px">请选择海报模板</el-button>                                                             
                </el-tab-pane>
                <el-tab-pane label="滚动播放上传" name="0">
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
          <el-col :span="10">
            <!-- <div class="video">
              <span>视频预览区</span>
            </div> -->
          </el-col>
        </el-row>  
     </div>
     <!-- 内容模板选择 -->
     <template>
       <el-dialog :close-on-click-modal="false" width="60%" center title="海报模板选择" top="40px" :visible.sync="dialogTemplate">
         <el-row :gutter="10">
           <el-col :span="4" v-for="(item, index) in posterList" :key="index">
             <div class="poster"
               @click="handlePosterSelect(index)">
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
   </div> 
</template>
<script>
import { mapState } from "vuex";
import bus from "@/utils/bus";
import service from "@/api";
export default {
  name: "newUpload",
  data() {
    return {
      disabledImg: 0,
      disabledVideo: 0,
      dialogShowType: false,
      dialogTemplate: false,
      formLabelWidth: "80px",
      status: "1",
      screenIndex: 0,
      posterIndex: -1,
      collapse: true,
      form: {
        title: "",
        componentValue: "",
        durationTime: "",
        contentProperty: 0,
        contentType: 1,
        author: "",
        channelId: null,
        imageUrl: "",
        videoUrl: ""
      },
      contentPropertyList: [
        { value: 0, label: "原创" },
        { value: 1, label: "摘要" }
      ],
      channelList: [],
      contentTemplateList: [
        { value: 0, label: "纯海报方式" },
        { value: 1, label: "上视频下海报方式" },
        { value: 2, label: "上海报下视频方式" },
        { value: 3, label: "纯图片" },
        { value: 4, label: "上视频下图片" },
        { value: 5, label: "上图片下视频" }
      ],
      posterList: [],
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
    handleTabClick(tab) {
      this.form.contentType = parseInt(tab.name);
      //this.$refs.form.resetFields();
    },
    handleScreenSelect(index, value) {
      this.screenIndex = index;
      this.queryContentTemplate(value);
    },
    handlePosterSelect(index) {
      this.posterIndex = index;
    },
    handlePosterSave() {
      this.dialogShowType = false;
      //let posterFind = this.posterList.find(item => )
    },
    handleUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid);
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
    //查询内容模板列表
    async queryContentTemplate(showType) {
      let res = await service.queryContentTemplate({ showType });
      if (res.errorCode === 0) {
        this.posterList = res.data;
      }
    }
  },
  mounted() {
    bus.$on("collapse", msg => {
      console.log(msg);
      return msg ? (this.collapse = false) : (this.collapse = true);
    });
    if (this.type !== 1) {
      this.queryChannelAll();
    }
    this.queryContentTemplate(0);
  }
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
.video {
  border-radius: 2px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  background-size: 44%;
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
}
.showType-item {
  margin: 10px 0;
  color: #909399;
  cursor: pointer;
  height: 150px;
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
</style>
