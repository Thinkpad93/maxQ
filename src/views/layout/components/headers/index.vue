<template>
   <el-header id="header">
     <!-- <h1 class="h1">
       <img src="../../../../images/all.png"></img>  
     </h1>   
     <div class="toggle-aside" @click="toggle">
       <i class="icon iconfont icon-weibiaoti26"></i>
     </div> -->
      <el-dropdown class="us" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>     
   </el-header>   
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "headers",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    }
  },
  created() {},
  mounted() {
    console.log(this.$root);
  }
};
</script>
<style lang="less" scoped>
#header {
  height: 60px;
  background-color: #ebf1f6;
  h1 {
    float: left;
    width: 200px;
    text-align: center;
    img {
      width: 120px;
      height: 60px;
    }
  }
  .toggle-aside {
    float: left;
    cursor: pointer;
    line-height: 60px;
    i {
      font-size: 26px;
      color: #606266;
    }
  }
}
.us {
  cursor: pointer;
  float: right;
  margin-top: 22px;
  margin-right: 40px;
}
</style>
