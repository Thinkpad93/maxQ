<template>
  <el-aside id="aside" style="width:200px;background-color: #545c64;">
    <el-menu 
    class="el-menu-vertical-demo" 
    background-color="#545c64" 
    text-color="#fff"
    active-text-color="#ffd04b"
    router 
    unique-opened 
    default-active="/home" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="collapse" 
    :collapse-transition="true">
      <el-menu-item index="/home/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>        
      </el-menu-item>      
      <el-menu-item index="/tag/index">
        <i class="el-icon-menu"></i>
        <span slot="title">标签管理</span>        
      </el-menu-item>         
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/device/index">设备列表</el-menu-item>
          <el-menu-item index="/device/monitoring">设备监控</el-menu-item>
          <el-menu-item index="/device/record">设备检修记录</el-menu-item>
          <el-menu-item index="/device/runlog">设备运行日志</el-menu-item>
        </el-menu-item-group>                
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>内容管理</span>
        </template>    
        <el-menu-item-group>
          <el-menu-item index="/content/index">栏目管理</el-menu-item>
          <el-menu-item index="/content/columntpl">栏目模板</el-menu-item>
          <el-menu-item index="/content/upload">我的上传</el-menu-item>
          <el-menu-item index="/content/poster">海报在线编辑</el-menu-item>
          <el-menu-item index="/content/release">内容发布</el-menu-item>
          <el-menu-item index="/content/playform">学校播放表单</el-menu-item>
        </el-menu-item-group>    
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>校区管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/school/index">学校管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/permissions">权限管理</el-menu-item>
          <el-menu-item index="/user/account">账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>           
    </el-menu>
  </el-aside>  
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
// #aside {
//   position: fixed;
//   top: 60px;
//   left: 0;
//   height: 100%;
//   overflow: hidden;
//   background-color: #ebf1f6;
// }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
