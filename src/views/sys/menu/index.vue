<template>
  <div class="page">
    <template>
      <qx-treeTable :data="data">
        <el-table-column label="权限ID" prop="permitId"></el-table-column>
        <el-table-column label="权限名称" prop="permitName"></el-table-column>
        <el-table-column label="权限链接" prop="url"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="平台类型" prop="flatFlag">
          <template slot-scope="scope">
            <span v-if="scope.row.flatFlag === 0">PC端</span>
            <span v-else>手机端</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">    
            <el-button size="mini" type="text" @click="handleChild(scope.row)">新增子菜单</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>        
      </qx-treeTable> 
    </template>   
    <!-- 编辑菜单名称 -->
    <template>
      <el-dialog center top="40px" title="编辑菜单名称" :visible.sync="dialogEdit">
        <el-form :rules="rules" ref="form" :model="form" status-icon size="mini" :label-width="formLabelWidth">
          <el-form-item label="权限ID" prop="permitId">
            <el-input v-model="form.permitId" placeholder="请输入权限ID" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限名称" prop="permitName">
            <el-input v-model="form.permitName" placeholder="权限名称"></el-input>
          </el-form-item>
          <el-form-item label="权限链接" prop="url">
            <el-input v-model="form.url" placeholder="权限链接" disabled></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-input v-model="form.status" placeholder="状态" disabled></el-input>
          </el-form-item>
          <el-form-item label="平台类型" prop="flatFlag">
            <el-input v-model="form.flatFlag" placeholder="平台类型" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-row style="text-align:center">
          <el-button size="mini" @click="dialogEdit = false">取消</el-button>
          <el-button size="mini" type="primary" @click="formAction('form')">确定</el-button>
        </el-row>        
      </el-dialog>
    </template> 
  </div>  
</template>
<script>
import treeTable from "@/components/treeTable";
export default {
  name: "menus",
  components: {
    "qx-treeTable": treeTable
  },
  data() {
    return {
      dialogEdit: false,
      formLabelWidth: "100px",
      form: {},
      rules: {},
      data: [
        {
          id: 0,
          permitId: 1,
          permitName: "首页",
          url: "/home/index",
          status: 0,
          flatFlag: 0
        },
        {
          id: 1,
          permitId: 2,
          permitName: "标签管理",
          url: "/label/index",
          status: 0,
          flatFlag: 0
        },
        {
          id: 1,
          permitId: 3,
          permitName: "设备管理",
          url: "/device",
          status: 0,
          flatFlag: 0,
          children: [
            {
              id: 1,
              permitId: 3,
              permitName: "设备列表",
              url: "/device/binding",
              status: 0,
              flatFlag: 0
            },
            {
              id: 1,
              permitId: 3,
              permitName: "设备监控",
              url: "/device/monitoring",
              status: 0,
              flatFlag: 1
            }            
          ]
        }
      ]
    };
  },
  methods: {
    handleChild(row) {},
    handleEdit(row) {
      this.dialogEdit = true;
      this.form = Object.assign({}, row);
      console.log(row);
    },
    handleDel(row) {},
    formAction(formName) {

    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
</style>
