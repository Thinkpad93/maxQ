<template>
    <div class="page">
        <!-- <div class="qx-navbar"></div> -->
        <div class="qx-sidebar-panel">
          <div class="qx-sidebar">
            <div class="qx-showType">
              <el-select v-model="query.showType" size="small" placeholder="请选择内容模板" @change="handleChange">
                <el-option
                  v-for="item in contentTemplateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>                  
              </el-select>     
            </div>           
            <div class="tab-content">
              <ul class="tab-list">
                <li class="item"
                  @click="handlePoster(item)" 
                  v-for="(item, index) in posterList" 
                  :key="index">
                  <div :style="{ backgroundImage: `url(${item.smallUrl})` }"></div>
                  <span>{{ item.title }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <el-row :gutter="10">
          <el-col :span="18" :offset="3">
            <div class="element-box"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.6)">
            <!-- ../static/20180908/index.html -->
              <iframe id="posterFrame" ref="iframe" :src="posterObj.posterUrl" @load="loadSuccess"></iframe>
              <div class="null" v-if="!posterObj.posterUrl">选择海报模板编辑</div>
              <!-- 如果有多页海报模板 -->
              <!-- <div class="page-manage">
                <el-button-group>
                  <el-button :disabled="btnLoading === 0" size="mini" type="primary" icon="el-icon-arrow-left">上一页</el-button>
                  <el-button :disabled="btnLoading === 0" size="mini" type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
              </div> -->
              <!-- 保存修改 -->
              <div class="handleSave">
                <el-button :disabled="btnLoading === 0" size="mini" type="primary" @click="handleSaveChange">保存</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import service from "@/api";
export default {
  name: "poster",
  components: {},
  data() {
    return {
      loading: false,
      btnLoading: 0,
      posterObj: {},
      iframeWin: {},
      query: {
        showType: 1 //默认查询纯海报
      },
      //海报模板列表
      posterList: [],
      contentTemplateList: [
        { value: 0, label: "纯海报方式" },
        { value: 1, label: "上视频下海报方式" },
        { value: 2, label: "上海报下视频方式" }
      ]
    };
  },
  methods: {
    //加载海报模板
    handleChange(value) {
      this.queryContentTemplateAction(value);
    },
    handlePoster(obj) {
      if (obj.posterUrl === this.posterObj.posterUrl) {
        return;
      }
      this.posterObj = Object.assign({}, obj);
      this.btnLoading = 1;
      setTimeout(() => {
        this.iframeWin.postMessage({ cmd: 'get', params: { contentId: this.posterObj.contentId } }, "*");
      }, 1000);
    },
    loadSuccess() {
      
    },
    //保存修改
    handleSaveChange() {
      this.$confirm(`确定保存吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.iframeWin.postMessage({ cmd: 'save', params: {} }, "*");
        })
        .catch(error => {
          return false;
        });
    },
    async handleMessage(event) {
      let data = event.data;
      if (data.errorCode === 0) {
        this.btnLoading = 0;
        this.$message({ message: `${data.errorMsg}`, type: "success" });
      }
    },
    //显示内容模板列表
    async queryContentTemplateAction(params) {
      let res = await service.queryContentTemplate(params);
      if (res.errorCode === 0) {
        this.posterList = res.data;
      }
    }
  },
  computed: {},
  mounted() {
    this.queryContentTemplateAction(this.query);
    this.iframeWin = this.$refs.iframe.contentWindow;
    window.addEventListener("message", this.handleMessage);
  }
};
</script>
<style lang="less">
.element-box {
  width: 500px;
  height: 736px;
  margin: 50px auto 10px auto;
  position: relative;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(28, 31, 33, 0.1);
}
.qx-showType {
  padding: 15px;
  text-align: center;
}
.tab-list {
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
  .item {
    color: #666;
    cursor: pointer;
    text-align: center;
    float: left;
    width: 50%;
    padding: 0px 8px;
    margin-bottom: 10px;
    height: auto;
    > div {
      width: 100%;
      height: 197px;
      background-size: cover;
    }
    > span {
      display: inline-block;
      margin-top: 3px;
    }
  }
}
.qx-navbar {
  height: 40px;
  background-color: rgb(84, 92, 100);
}
.qx-sidebar-panel {
  display: block;
  position: absolute;
  left: 0;
  top: 30px;
  z-index: 100;
  width: 300px;
  height: calc(100% - 30px);
  color: #fff;
  background-color: #fff;
}
.qx-sidebar {
  position: relative;
  height: 100%;
}
.tab-content {
  position: absolute;
  left: 0;
  top: 62px;
  z-index: 100;
  overflow: auto;
  width: 100%;
  height: calc(100% - 72px);
}
.page-manage {
  position: absolute;
  left: 0;
  top: -30px;
  z-index: 100;
}
.handleSave {
  position: absolute;
  right: 0;
  top: -30px;
  z-index: 100;
}
.null {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
}
</style>
