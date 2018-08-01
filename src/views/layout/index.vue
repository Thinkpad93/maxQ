<template>
  <div class="wrapper">
    <!-- 主体 顶栏 -->
    <q-header @toggle="handleToggle" />
    <!-- 主体 侧边栏 -->
    <q-aside :collapse="collapse" :width="left" />
    <!-- 主体 内容 -->
    <main id="main" :style="{ left:  left + 'px'}">
        <q-tags />
        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <router-view />
            </keep-alive>
        </transition>   
    </main>   
  </div>  
</template>
<script>
import qheader from "./components/headers";
import qaside from "./components/asides";
import qtags from "./components/tags";

export default {
  name: "layout",
  components: {
    "q-header": qheader,
    "q-aside": qaside,
    "q-tags": qtags
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
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  z-index: 998;
  transition: left linear 0.3s;
  //   height: calc(~'100% - 60px');
}
</style>
