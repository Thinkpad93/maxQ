<template>
    <div class="page">
        <div class="qx-navbar"></div>
        <div class="qx-sidebar-panel">
          <div class="qx-sidebar">
            <el-button type="info" size="mini" @click="sendMessage">向iframe发送信息</el-button>
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
                  v-for="(item, index) in posterList" 
                  :key="index" :data-url="item.posterUrl">
                  <div :style="{ backgroundImage: `url(${thumb})` }"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <el-row :gutter="10">
          <el-col :span="6">
            <h2>2</h2>
            <!-- <swiper :options="swiperOption" ref="pSwiper">
                <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                  <img src="@/images/unlc913q91edsg.png" alt="">
                </swiper-slide>
            </swiper> -->
          </el-col>
          <el-col :span="18">
            <div class="element-box">
              <iframe id="posterFrame" ref="iframe" :src="src"></iframe>
            </div>
            <div class="page-manage"></div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
        </el-row>
    </div>
</template>
<script>
import { queryContentTemplate } from "@/api/content";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "poster",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      loading: false,
      pageLoading: false,
      src: "../static/poster1.html",
      iframeWin: {},
      thumb: "../static/placeholder-img.jpg",
      query: {
        showType: 0 //默认查询纯海报
      },
      //海报模板列表
      posterList: [],
      contentTemplateList: [
        { value: 0, label: "纯海报方式" },
        { value: 1, label: "上视频下海报方式" },
        { value: 2, label: "上海报下视频方式" }
      ],
      swiperOption: {
        spaceBetween: 10
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    handleChange(value) {
      this.queryContentTemplateAction(value);
    },
    sendMessage() {
      this.iframeWin.postMessage({
          cmd: "getFormJson",
          params: {}
        },"*" );
    },
    async handleMessage(event) {
      const data = event.data;
      console.log(data);
      console.log("00101");
    },
    //显示内容模板列表
    queryContentTemplateAction(showType) {
      queryContentTemplate({ showType }).then(res => {
        if (res.errorCode === 0) {
          this.posterList = res.data;
        }
      });
    }
  },
  computed: {},
  mounted() {
    this.queryContentTemplateAction(0);
    // 这里就拿到了iframe的对象
    //console.log(this.$refs.iframe);
    // 这里就拿到了iframe的window对象
    //console.log(this.$refs.iframe.contentWindow);
    window.addEventListener("message", this.handleMessage);
    this.iframeWin = this.$refs.iframe.contentWindow;
  }
};
</script>
<style lang="less">
//@import "swiper/dist/css/swiper.css";
// .swiper-container {
//   height: 100px;
// }
// .swiper-slide {
//   cursor: pointer;
//   background-color: #ccc;
// }
.element-box {
  width: 400px;
  height: 1000px;
  border-radius: 6px;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
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
    cursor: pointer;
    float: left;
    width: 50%;
    padding: 0px 8px;
    margin-bottom: 10px;
    height: 180px;
    background-size: cover;
    > div {
      width: 100%;
      height: 100%;
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
</style>
