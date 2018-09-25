<template>
   <div class="page">
     <!-- 表单 -->
     <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                        <el-form-item label="角色名称">
                          <el-input v-model.trim="query.roleName" placeholder="请输入账号" maxlength="40"></el-input>
                        </el-form-item>                          
                        <el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                            <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增角色</el-button>
                        </el-form-item>                          
                    </el-form>
                </div>
            </el-col>
        </el-row> 
     </template> 
     <!-- 表格数据 -->
     <template>
       <el-table :data="tableData" style="width: 100%" border stripe size="mini" v-loading="loading">
          <el-table-column label="角色ID" prop=""></el-table-column>  
          <el-table-column label="角色名称" prop=""></el-table-column>  
          <el-table-column label="备注" prop=""></el-table-column>  
          <el-table-column label="操作" prop=""></el-table-column>  
       </el-table>
     </template> 
     <template>
       <el-dialog width="50%" :close-on-click-modal="false" center top="40px" title="新增角色" :visible.sync="dialogAdd" :modal-append-to-body="false">
         <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
           <el-form-item label="角色名称">
             <el-input v-model="addForm.roleName" placeholder="请输入角色名称"></el-input>
           </el-form-item>
           <el-form-item label="备注">
             <el-input type="textarea" v-model="addForm.note" :rows="4" placeholder="请输入备注"></el-input>
           </el-form-item>
           <el-form-item label="权限设置">
             <el-tree 
              :data="data2" 
              show-checkbox 
              node-key="id" 
              :default-expanded-keys="[2, 3]" 
              :default-checked-keys="[5]" 
              :props="defaultProps">
             </el-tree>
           </el-form-item>
         </el-form>
       </el-dialog>
     </template>
   </div> 
</template>
<script>
export default {
  name: "role",
  data() {
    return {
      dialogAdd: false,
      loading: false,
      formLabelWidth: "100px",
      query: {},
      addForm: {},
      rules: {},
      tableData: [],
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    search() {}
  }
};
</script>
<style lang="less" scoped>
</style>
