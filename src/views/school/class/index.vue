<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="query"
          size="small"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="年级">
            <el-select v-model="query.grade" placeholder="选择年级">
              <el-option
                v-for="item in labelsType"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" stripe size="small" empty-text="没有班级哦">
        <el-table-column label="序号" prop="classId"></el-table-column>
        <el-table-column label="班级名称" prop="className"></el-table-column>
        <el-table-column label="年级" prop="grade"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-ft"></div>
    <!-- 新增 or 编辑 -->
    <el-dialog top="40px" title :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
        <el-form-item label="年级" prop="grade">
          <el-select v-model="form.grade" placeholder="选择年级">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="form.className" placeholder="请输入班级名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "class",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      query: {
        className: "",
        schoolId: null,
        grade: null
      },
      form: {
        schoolId: null,
        className: "",
        grade: null
      },
      tableData: []
    };
  },
  methods: {
    handleSearch() {},
    handleEdit(row) {},
    handleDel(row) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    //查询班级列表（微信端）
    async queryClasses(params = {}) {
      let res = await service.queryClasses(params);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
      }
    },
    //新增班级信息（微信端）
    async addClass(params = {}) {
      let res = await service.getClass(params);
      if (res.errorCode === 0) {
      }
    },
    //编辑班级信息（微信端）
    async updateClass(params = {}) {
      let res = await service.updateClass(params);
      if (res.errorCode === 0) {
      }
    },
    //删除班级信息（微信端）
    async deleteClass(classId) {
      let res = await service.deleteClass({ classId });
      if (res.errorCode === 0) {
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
