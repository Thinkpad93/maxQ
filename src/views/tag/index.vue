<template>
   <div class="page">
     <!-- 表单 -->
     <template>
       <el-row :gutter="10">
         <el-col :span="24">
           <div class="page-form" style="padding-bottom: 18px;">
              <el-button size="small" icon="el-icon-plus" type="primary" @click="dialogAdd = true">添加标签</el-button>
           </div>
         </el-col>
       </el-row>
     </template>
     <!-- 表格数据 -->
     <template>
         <el-table :data="tableData" style="width: 100%" stripe size="mini" empty-text="没有标签哦" v-loading="loading">
            <el-table-column label="标签ID" prop="labelId"></el-table-column>
            <el-table-column label="标签名称" prop="name" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <template v-if="scope.row.show">
                  <el-input v-model="scope.row.name" size="mini"></el-input>
                </template>
                <template v-else>{{ scope.row.name }}</template>
              </template>
            </el-table-column>
            <el-table-column label="描述" prop="description" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <template v-if="scope.row.show">
                  <el-input v-model="scope.row.desription" size="mini"></el-input>
                </template>
                <template v-else>{{ scope.row.desription }}</template>                        
              </template>
            </el-table-column>
            <el-table-column label="标签类型" prop="type" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <template v-if="scope.row.show">
                  <el-select v-model="scope.row.type" size="mini">
                    <el-option
                      v-for="item in labelsList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>            
                  </el-select>   
                </template>
                <template v-else>
                  <el-tag size="mini" v-if="scope.row.type === 0">缺省</el-tag>
                  <el-tag size="mini" v-else-if="scope.row.type === 1">特色</el-tag>
                  <el-tag size="mini" v-else-if="scope.row.type === 2">商圈</el-tag>
                  <el-tag size="mini" v-else="scope.row.type === 3">冠名企业</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
         </el-table>
     </template>  
     <!-- 新增 -->
     <template>
       <el-dialog center top="40px" title="新增标签" :visible.sync="dialogAdd" :modal-append-to-body="false">
         <el-form ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
            <el-form-item label="标签名称" prop="name" :rules="[
              { required: true, message: '请输入标签名称', trigger: 'blur' }
            ]">
              <el-input v-model="form.name" placeholder="请输入标签名称"></el-input>
            </el-form-item>  
            <el-form-item label="标签类型" prop="type" :rules="[
              { required: true, message: '请选择标签类型', trigger: 'blur' }
            ]">
              <el-select v-model="form.type" clearable filterable placeholder="选择标签类型">
                <el-option
                    v-for="item in labelsType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option> 
              </el-select>
            </el-form-item>                 
            <el-form-item label="标签描述" prop="description"  :rules="[
              { required: true, message: '请输入标签描述', trigger: 'blur' }
            ]">
              <el-input type="textarea" v-model="form.description" :rows="5" placeholder="请输入标签描述"></el-input>
            </el-form-item> 
            <el-row style="text-align:center">
              <el-button size="mini" @click="dialogAdd = false">取消</el-button>
              <el-button size="mini" type="primary" @click="submitForm('form')">确定</el-button>
            </el-row>                             
         </el-form>
       </el-dialog>
     </template>    
   </div> 
</template>
<script>
import service from "@/api";
export default {
  name: "tab",
  data() {
    return {
      loading: false,
      dialogAdd: false,
      formLabelWidth: "100px",
      form: {},
      labelsType: [
        { id: 0, name: "缺省" },
        { id: 1, name: "特色" },
        { id: 2, name: "商圈" },
        { id: 3, name: "冠名企业" }
      ],
      tableData: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addTable(this.form);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteTable(row.labelId);
        })
        .catch(error => {
          return false;
        });
    },
    //查询标签列表
    async createTable() {
      this.loading = true;
      let res = await service.queryLabel({ queryType: 0 });
      if (res.errorCode === 0) {
        this.loading = false;
        this.tableData = res.data;
      }
    },
    //新增标签
    async addTable(params = {}) {
      let res = await service.addLabel(params);
      if (res.errorCode === 0) {
        this.dialogAdd = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.resetForm("form");
        this.createTable();
      }
    },
    //删除标签
    async deleteTable(labelId) {
      let res = await service.deleteLabel({ labelId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.createTable();
      }
    }
  },
  mounted() {
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
</style>
