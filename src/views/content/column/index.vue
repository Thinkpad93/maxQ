<template>
  <div class="page">
    <!-- 表单 -->
    <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">

                    </el-form>
                </div>
            </el-col>
        </el-row> 
    </template> 
    <!-- 表格数据 -->
    <template>
        <el-table :data="tableData" style="width: 100%" border stripe size="mini" v-loading="loading">
            <el-table-column label="栏目编号" prop="channelId" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="栏目名称" prop="name" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="栏目描述" prop="description" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>        
    </template>
    <!-- 新增 -->
    <template>
        <el-dialog :close-on-click-modal="false" center @open="show" @close="close" top="40px" title="新增栏目" :visible.sync="dialogAdd">
            <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入栏目名称"></el-input>
                </el-form-item>       
                <el-form-item label="栏目描述" prop="description">
                    <el-input type="textarea" v-model="addForm.description" :rows="5" placeholder="请输入栏目描述"></el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button size="mini" @click="dialogAdd = false">取消</el-button>
                    <el-button size="mini" type="primary" @click="addsForm('addForm')">确定</el-button>
                </el-form-item>                    
            </el-form>
        </el-dialog>
    </template>
    <!-- 编辑 -->
    <template>
        <el-dialog :close-on-click-modal="false" center @open="show" @close="close" top="40px" :visible.sync="dialogEdit">
            <div slot="title"><h3>正在编辑栏目：{{ editForm.name }}</h3></div>
            <el-form :rules="rules" ref="editForm" :model="editForm" size="small" :label-width="formLabelWidth">
                <el-form-item v-show="false">
                    <el-input type="hidden" v-model="editForm.channelId"></el-input>
                </el-form-item>
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>       
                <el-form-item label="栏目描述" prop="description">
                    <el-input type="textarea" v-model="editForm.description" :rows="5"></el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button size="mini" @click="dialogEdit = false">取消</el-button>
                    <el-button size="mini" type="primary" @click="editorForm('editForm')">确定</el-button>
                </el-form-item>                                                  
            </el-form>
        </el-dialog>
    </template>    
  </div>      
</template>
<script>
export default {
  name: "column",
  data() {
    return {
      dialogEdit: false,
      dialogAdd: false,
      loading: false,
      query: {},
      addForm: {},
      tableData: [],        
    };
  },
  methods: {
    handleEdit(row) {}, 
    show() {},
    slose() {} 
  }
};
</script>
<style lang="less" scoped>
</style>
