<template>
  <div class="wrapper">
    <el-container style="height:100vh;" class="is-vertical">
      <!-- 主体 顶栏 -->
      <qx-header @toggle="handleToggle" />
      <el-container>
        <!-- 主体 侧边栏 -->
        <qx-aside :collapse="collapse" :width="left" />
        <!-- 主体 内容 -->
        <el-main id="main">
            <qx-tags />
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <router-view :key="$route.fullPath"/>
                </keep-alive>
            </transition>   
        </el-main>  
      </el-container> 
    </el-container>
  </div>  
</template>
<script>
import qxheader from "./components/headers";
import qxaside from "./components/asides";
import qxtags from "./components/tags";

export default {
  name: "layout",
  components: {
    "qx-header": qxheader,
    "qx-aside": qxaside,
    "qx-tags": qxtags
  },
  data() {
    return {
      left: 200,
      collapse: false
    };
  },
  methods: {
    handleToggle() {
      if (!this.collapse) {
        this.left = 64;
        this.collapse = true;
      } else {
        this.left = 200;
        this.collapse = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  position: relative;
  padding: 0 !important;
  // position: absolute;
  // top: 60px;
  // bottom: 0;
  // right: 0;
  // z-index: 998;
  // transition: left linear 0.3s;
  //   height: calc(~'100% - 60px');
}
</style>
