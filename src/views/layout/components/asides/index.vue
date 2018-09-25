<template>
  <el-aside id="aside" :style="{ width: width + 'px' }" style="background-color: #545c64">
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
      <el-menu-item index="/label/index">
        <i class="el-icon-menu"></i>
        <span slot="title">标签管理</span>        
      </el-menu-item>         
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/device/binding">设备列表</el-menu-item>
          <el-menu-item index="/device/monitoring">设备监控</el-menu-item>
          <el-menu-item index="/device/record">设备检修记录</el-menu-item>
          <el-menu-item index="/device/runlog">设备运行日志</el-menu-item>
        </el-menu-item-group>                
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>    
        <el-menu-item-group>
          <el-menu-item index="/content/index">栏目管理</el-menu-item>
          <el-menu-item index="/content/columntpl">栏目模板</el-menu-item>
          <el-menu-item index="/content/upload">内容上传</el-menu-item>
          <el-menu-item index="/content/trial">内容初审</el-menu-item>
          <el-menu-item index="/content/review">内容复审</el-menu-item>
          <el-menu-item index="/content/final">内容终审</el-menu-item>
          <el-menu-item index="/content/prerelease">预发布</el-menu-item>
          <el-menu-item index="/content/release">内容发布</el-menu-item>
          <el-menu-item index="/content/playform">学校播放表单</el-menu-item>
        </el-menu-item-group>    
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>校区管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/school/list">学校管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item index="/sys/permissions">权限管理</el-menu-item> -->
          <el-menu-item index="/sys/user">用户管理</el-menu-item>
          <el-menu-item index="/sys/menu">菜单管理</el-menu-item>
          <el-menu-item index="/sys/role">角色管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>           
    </el-menu>
  </el-aside>  
</template>
<script>
import bus from "@/utils/bus";
export default {
  name: "asides",
  data() {
    return {
      width: 200,
      collapse: false
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  },
  mounted() {
    bus.$on('collapse', msg => {
      this.collapse = msg;
      return this.collapse ? this.width = 64 : this.width = 200;
    });
  }
};
</script>
<style lang="less" scoped>
#aside {
  transition: width .6s;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
