<template>
  <div class="page">
    <div class="page-form">
        <el-form :rules="rules" ref="tplform" :model="addForm" size="mini" :label-width="formLabelWidth" label-position="left" style="width: 500px;">
            <el-form-item label="栏目模板名称" prop="name">
                <el-input v-model="addForm.name" placeholder="请输入栏目名称"></el-input>
            </el-form-item>  
            <el-form-item label="栏目模板描述" prop="description">
                <el-input v-model="addForm.description" :rows="4" placeholder="请输入栏目描述"></el-input>
            </el-form-item> 
            <el-form-item label="模板类型">
                <el-radio-group v-model="addForm.type">
                    <el-radio :label="0">非缺省模板</el-radio>
                    <el-radio :label="1">缺省模板</el-radio>
                </el-radio-group>
            </el-form-item>                   
            <el-form-item>
                <el-button type="primary" @click="addTemplate('addForm')">保存</el-button>
                <el-button :disabled="disabled === 0" icon="el-icon-plus" type="success" @click="addTablerow">新增模板详细项</el-button>
            </el-form-item>                                            
        </el-form>
        <el-row :gutter="10">
            <!-- 表格 -->
            <el-table ref="tpladd" :data="tplAddData" style="width: 100%" :height="450" border stripe size="mini">
                
            </el-table>
        </el-row>   
    </div>     
  </div>  
</template>
<script>
export default {
  name: "columnTplAdd",
  data() {
    return {
      disabled: 0,
      formLabelWidth: "120px",
      addForm: {
        type: 0  
      },
      rules: {
        name: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入栏目模板描述", trigger: "blur" }
        ]
      },
      tplAddData: []
    };
  },
  methods: {
    //关闭当前路由页面
    closeRoute(route) {
      this.$store.dispatch("close", route).then(res => {
        if (route.path === this.$route.path) {
          const latestView = res.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push("/home");
          }
        }
      });
    },
    addTablerow() {
      this.$alert("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        center: true,
        showClose: false
      }).then(() => {
        //路由跳转  
        this.$router.go(-1);
        this.closeRoute(this.$route);
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
