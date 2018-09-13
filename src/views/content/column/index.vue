<template>
  <div class="page">
    <!-- 表单 -->
    <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                        <el-form-item label="栏目名称">
                            <el-input v-model="query.channelName" placeholder="请输入栏目名称" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                            <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增栏目</el-button>
                        </el-form-item>   
                    </el-form>
                </div>
            </el-col>
        </el-row> 
    </template> 
    <!-- 表格数据 -->
    <template>
        <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="small" v-loading="loading">
            <el-table-column width="300" label="栏目编号" prop="channelId" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column width="300" label="栏目名称" prop="name" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="栏目描述" prop="description" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column width="200" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>        
    </template>
    <!-- 分页 -->
    <template>
      <div class="pagination" v-if="tableData.length">   
          <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination> 
      </div>   
    </template>      
    <!-- 新增 or 编辑 -->
    <template>
      <el-dialog 
        center top="40px" 
        title="" :visible.sync="dialogFormVisible" @close="close">
        <el-form :rules="rules" ref="formRef" :model="form" status-icon size="mini" :label-width="formLabelWidth">
          <el-form-item label="栏目名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入栏目名称"></el-input>
          </el-form-item>
          <el-form-item label="栏目描述" prop="description">
            <el-input type="textarea" v-model="form.description" :rows="5" placeholder="请输入栏目描述"></el-input>
          </el-form-item>
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogFormVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="formAction('formRef')">确定</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </template>
  </div>      
</template>
<script>
import service from "@/api";
export default {
  name: "column",
  data() {
    return {
      dialogEdit: false,
      dialogAdd: false,
      dialogFormVisible: false,
      loading: false,
      isSave: true,
      formLabelWidth: "100px",
      query: {
        channelName: "",
        page: 1,
        pageSize: 20
      },
      form: {
        name: "",
        description: ""
      },
      totalCount: 0, //分页总数
      addForm: {},
      editForm: {},
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入栏目描述", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  watch: {},
  methods: {
    search() {
      let page = this.query.page;
      if (!this.query.channelName.length) {
        this.$message({ message: "请选择栏目名称", type: "warning" });
        return;
      }
      if (page > 1) {
        this.query.page = 1;
      }
      this.createTable();
    },
    close() {
      this.resetForm("formRef");
    },
    addEquipment() {
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
    },
    handleDel(row) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteTable(row.channelId);
        })
        .catch(error => {
          return false;
        });      
    },
    handleSizeChange(size) {
      if (size > this.totalCount) {
        return;
      }
      this.query.pageSize = size;
      this.createTable();
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.createTable();
    },
    formAction(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { postTime, ...args } = this.form;
          if (postTime && args.channelId) {
            this.updateTable(args);
          } else {
            this.addTable(this.form);
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //显示栏目列表
    async createTable() {
      let res = await service.queryChannel(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //新增栏目
    async addTable(params = {}) {
      let res = await service.addChannel(params);
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.createTable();
        this.resetForm("formRef");
      } else if (res.errorCode === 1) {
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
      }
    },
    //编辑栏目
    async updateTable(params = {}) {
      let res = await service.updateChannel(params);
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.createTable();
      }
    },
    //删除栏目
    async deleteTable(channelId) {
      let res = await service.deleteChannel({ channelId });
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
