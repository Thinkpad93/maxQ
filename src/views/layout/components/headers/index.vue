<template>
   <el-header id="header">
     <!-- <h1 class="h1">
       <img src="../../../../images/all.png"></img>  
     </h1>  
     --> 
      <div class="account-type">
        <span v-if="type === 0">促进会{{type}}</span>
        <span v-else-if="type === 1">学校{{type}}</span>
        <span v-else-if="type === 2">教育局{{type}}</span>
        <span v-else-if="type === 3">培训机构{{type}}</span>
        <span v-else>admin</span>
      </div>
      <div class="toggle-aside" @click="collapseChage">
        <i class="icon iconfont icon-weibiaoti26"></i>
      </div> 
      <el-dropdown class="us" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>     
   </el-header>   
</template>
<script>
import bus from "@/utils/bus";
import { getToken } from "@/utils/auth";
//在组件中分发 Action
import { mapGetters } from "vuex";

export default {
  name: "headers",
  data() {
    return {
      collapse: false
    };
  },
  computed: {
    ...mapGetters(["name", "type"])
  },
  methods: {
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    handleCommand(command) {
      this.$confirm(`确定退出登陆吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("qxuser/qxLogout").then(res => {
            if (res.errorCode === 0) {
              location.reload();
            }
          });
        })
        .catch(error => {
          return false;
        });
    }
  },
  created() {},
  mounted() {
    // if (getToken()) {
    //   this.$store.dispatch("comm/qxregion");
    // }
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
.account-type {
  display: none !important;
}
</style>
