<template>
  <div class="page">
    <div class="portalweb">
      <template>
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="page-form">
              <el-form :inline="true" ref="form" :model="query" label-width="120px" label-position="left">
                <el-form-item label="网站菜单名称" prop="menuName" :rules="[
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                  ]">
                  <el-input placeholder="请输入菜单名称" v-model="query.menuName" maxlength="10"></el-input>
                </el-form-item>
              </el-form>
              <el-row>
                <el-button type="danger" size="small" @click="handlePageDel">删除一页</el-button>
                <el-button type="primary" size="small" @click="handlePageAdd">新增一页</el-button>
                <el-button type="primary" size="small" @click="formSubmit('form')">保存</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </template>
      <template>
        <div class="quill-page">
          <el-pagination
            background
            layout="pager"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="1"
            :total="totalCount">
          </el-pagination>          
        </div>
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
  name: "portalAdd",
  components: {
    quillEditor
  },
  data() {
    return {
      active: 1,
      page: 1,
      totalCount: 1,
      query: {
        menuName: "",
        contentText: []
      },
      loadding: false,
      content: "",
      editorOption: {
        placeholder: "请输入内容",
        //theme: "snow",
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
  watch: {
    page(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    }
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    handleCurrentChange(curr) {
      this.page = curr;
      //this.handleGetSingleContent(curr);
    },
    handlePageDel() {
      // let contentText = this.query.contentText;
      // if (this.page === 1) {
      //   return;
      // }
      // this.page -= 1;
      // this.totalCount -= 1;
      // if (contentText.find((elem, index) => elem.page === this.active)) {
      //   this.query.contentText.splice(index, 1);
      // }
    },
    handlePageAdd() {
      //只能新增3页
      // if (this.page === 3) {
      //   return;
      // }
      //如果用户没有填写内容，则不新增页数
      if (!this.content.trim().length) {
        this.$message({ message: "请先填写菜单内容~", type: "warning" });
        return;
      }
      this.page += 1;
      this.totalCount += 1;
      //this.handleSaveSingleContent();
    },
    //取出单条内容
    handleGetSingleContent(curr) {
      let obj = this.query.contentText.find(elem => elem.page === curr);
      if (Object.keys(obj).length) {
        this.content = obj.content;
      }
    },
    //保存单条内容
    handleSaveSingleContent() {
      let obj = { page: this.active, content: this.content };
      let contentText = this.query.contentText;
      contentText.push(obj);
      this.content = "";
      this.active += 1;
    },
    //保存菜单内容
    formSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.query);
        }
      });
    },
    handleImageOneSuccess(res, file, fileList) {
      if (res.errorCode === 0) {
        this.loadding = false;
        let index = this.editor.getSelection().index;
        console.log(index);
        // 插入图片  res.data.url 为服务器返回的图片地址
        this.editor.insertEmbed(index, "image", res.data.url);
        this.editor.setSelection(length + 1);
        //插入成功后清除input的内容
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error("图片插入失败");
      }
    },
    beforeImageUpload(file) {
      this.loadding = true;
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    async savePortalWebInfo(params = {}) {
      let res = await service.savePortalWebInfo(params, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(res);
    }
  },
  mounted() {
    bus.$on("collapse", msg => {
      return msg ? (this.collapse = false) : (this.collapse = true);
    });
    console.log(this.editor);
  }
};
</script>
<style lang="less" scoped>
.page-form {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}
.quill-page {
  margin-bottom: 10px;
}
.portalweb {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
}
.edit-container {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
}
.avatar-uploader {
  opacity: 0;
  display: none;
}
</style>
