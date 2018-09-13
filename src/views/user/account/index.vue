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
                            <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增账号</el-button>
                        </el-form-item>                          
                    </el-form>
                </div>
            </el-col>
        </el-row> 
     </template> 
     <!-- 表格数据 -->
     <template>
       <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="small" v-loading="loading">
         <el-table-column label="账号" prop="" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="用户角色" prop="" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="负责人" prop="" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="负责人电话" prop="" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="所属学校" prop="" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="添加时间" prop="" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="状态" prop="" :show-overflow-tooltip="true">
           <template slot-scope="scope">
             <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
           </template>
         </el-table-column>
         <el-table-column label="操作" prop="" :show-overflow-tooltip="true">
           <template slot-scope="scope">
             <el-button size="mini" type="text" @click="handleReset(scope.row)">重置密码</el-button>
           </template>
         </el-table-column>
       </el-table>
     </template> 
     <!-- 新增账号 -->
     <template>
       <el-dialog center top="40px" title="新增账号" :visible.sync="dialogAdd">
         <el-form :rules="rules" ref="form" :model="form" status-icon size="mini" :label-width="formLabelWidth" label-position="left">
           <el-form-item label="账号" prop="">
             <el-input v-model="form.name" placeholder="请输入账号名称"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="">
             <el-input v-model="form.name" placeholder="请输入密码"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="">
             <el-input v-model="form.name" placeholder="请确认密码"></el-input>
           </el-form-item>
           <el-form-item label="用户角色" prop=""></el-form-item>
           <el-form-item label="对应区域" prop=""></el-form-item>
           <el-form-item label="对应学校" prop=""></el-form-item>
           <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('form')">保存</el-button>             
           </el-row>
         </el-form>
       </el-dialog>
     </template>
     <!-- 重置密码 -->
     <template></template>
   </div> 
</template>
<script>
export default {
  name: "account",
  data() {
    return {
      dialogAdd: false,
      loading: false,
      formLabelWidth: "100px",
      form: {},
      rules: {},
      value2: true,
      tableData: []
    };
  },
  methods: {
    search() {},
    submitForm(formName) {}
  }
};
</script>
<style lang="less" scoped>
</style>
