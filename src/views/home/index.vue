<template>
   <div class="page">
      <!-- <div class="exception-content">
        <img src="@/assets/empty-content.png" alt="" style="max-width: 260px;">
          <div>
            <h3>页面暂无内容</h3>
            <p v-if="$route.meta.title">抱歉，页面暂无内容，请看看其他页面</p>
          </div>
      </div> -->
      <!-- <div class="edit-container">
        <quill-editor 
          v-model="content" 
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
      </div> -->
    </div> 
</template>
<script>
import service from "@/api";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "home",
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: "请输入内容",
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "image", "clean"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["clean"]
          ]
        }
      },
      content: ""
    };
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.quill-editor {
  // min-height: 400px;
  // background-color: #fff;
}
.exception-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  img {
    margin-right: 50px;
  }
  h3 {
    color: rgb(51, 51, 51);
    font-size: 24px;
    margin: 20px 0;
  }
  p {
    color: rgb(102, 102, 102);
    font-size: 16px;
  }
}
</style>
