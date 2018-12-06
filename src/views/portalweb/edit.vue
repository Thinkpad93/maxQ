<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="100px" label-position="left">
              <el-form-item label="网站菜单名称">
                <el-input placeholder="请输入菜单名称" v-model="query.menuName"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>      
    </template>
    <template>
      <el-row v-loading="loadding">
        <div class="edit-container">
          <quill-editor 
            v-model="content" 
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>          
        </div>
      </el-row>
      <!-- 图片上传组件辅助-->
      <el-upload
        :with-credentials="true"
        list-type="picture-card"
        class="avatar-uploader"
        name="honorImage"
        ref="upload" 
        accept="image/jpeg,image/gif,image/png,image/bmp"
        action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="true"
        :on-success="handleImageOneSuccess"
        :before-upload="beforeImageUpload">
        <i class="el-icon-plus"></i>
      </el-upload>         
    </template>
  </div>   
</template>
<script>
import bus from "@/utils/bus";
import service from "@/api";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { toolbarOptions } from "@/utils/tools";

export default {
  name: "portalEdit",
  components: {
    quillEditor
  },
  data() {
    return {
      menuId: this.$route.params.id,
      query: {
        menuName: ""
      },
      collapse: true,
      loadding: false,
      content: "",
      editorOption: {
        placeholder: "请输入内容",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: value => {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.editor.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    handleImageOneSuccess(res, file, fileList) {},
    beforeImageUpload(file) {},
    async savePortalWebInfo(params = {}) {
      let res = await service.savePortalWebInfo(params, {
        headers: { "Content-Type": "application/json" }
      });
    },
    async queryPortalWebinfo(menuId) {
      let res = await service.queryPortalWebinfo({ menuId });
      console.log(res);
    }
  },
  activated() {
    this.queryPortalWebinfo(this.menuId);
  }
};
</script>
<style lang="less" scoped>
</style>
