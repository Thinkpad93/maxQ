<template>
  <aside id="aside" :style="{ width:  width + 'px'}">
    <el-menu router unique-opened default-active="/home" @open="handleOpen" @close="handleClose" :collapse="collapse" :collapse-transition="false">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>        
      </el-menu-item>      
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/device/index">设备列表</el-menu-item>
          <el-menu-item index="/device/monitoring">设备监控</el-menu-item>
          <el-menu-item index="/device/record">检修记录</el-menu-item>
          <el-menu-item index="/device/runlog">运行日志</el-menu-item>
        </el-menu-item-group>                
      </el-submenu>
    </el-menu>
  </aside>  
</template>
<script>
export default {
  name: "asides",
  props: {
    width: {
      type: Number
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
};
</script>
<style lang="less" scoped>
#aside {
  position: fixed;
  top: 60px;
  left: 0;
  height: 100%;
  overflow: hidden;
  transition: width linear 0.3s;
  background-color: #ebf1f6;
}
</style>
