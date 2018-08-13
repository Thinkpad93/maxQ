<template>
   <div class="page">
     <!-- 表单 -->
     <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="form" size="small" label-width="70px" label-position="left">
                        <el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                            <el-button icon="el-icon-plus" type="info" @click="dialogAdd = true">新增账号</el-button>
                        </el-form-item>                          
                    </el-form>
                </div>
            </el-col>
        </el-row> 
     </template> 
     <!-- 表格数据 -->
     <template>

     </template> 

   </div> 
</template>
<script>
export default {
  name: "account",
  data() {
    return {
      dialogAdd: false,
      form: {},
    };
  },
  methods: {
    search() {}
  }
};
</script>
<style lang="less" scoped>
</style>
