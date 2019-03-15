<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="page-form">
          <el-form
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
            <el-form-item label="班级">
              <el-select v-model="query.classId" placeholder="选择班级">
                <el-option
                  v-for="item in classList"
                  :key="item.classId"
                  :label="item.classId"
                  :value="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学生姓名">
              <el-input v-model="query.studentName" placeholder="请输入学生姓名" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="dialogFormVisible = true"
              >录入</el-button>
              <el-button size="small" icon="el-icon-plus" type="primary">批量录入</el-button>
              <el-button size="small" icon="el-icon-plus" type="primary">模板下载</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" stripe size="small" empty-text="没有学生哦">
      <el-table-column label="序号" prop="studentId"></el-table-column>
      <el-table-column label="学生姓名" prop="studentName"></el-table-column>
      <el-table-column label="手机号" prop="tel"></el-table-column>
      <el-table-column label="年级" prop="grade"></el-table-column>
      <el-table-column label="班级" prop="className"></el-table-column>
      <el-table-column label="关系" prop="relation"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 or 编辑 -->
    <el-dialog top="40px" title :visible.sync="dialogFormVisible">
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        status-icon
        size="small"
        :label-width="formLabelWidth"
      >
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="form.studentName" placeholder="请输入学生姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="选择性别">
            <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classId">
          <el-select v-model="form.classId" placeholder="选择班级">
            <el-option
              v-for="item in labelsFilter"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生与家长关系" prop="relation">
          <el-select v-model="form.relation" placeholder="请选择学生与家长关系">
            <el-option
              v-for="item in relationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { sex, relation } from "@/mixins";
export default {
  name: "student",
  mixins: [sex, relation],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      query: {
        grade: null,
        classId: null,
        studentName: "",
        schoolId: null
      },
      form: {
        studentName: "",
        classId: null,
        schoolId: null,
        sex: 1,
        tel: "",
        relation: 1
      },
      rules: {},
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
    //查询学生列表（微信端）
    async queryStudent(params = {}) {
      let res = await service.queryStudent(params);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
      }
    },
    //录入学生信息（微信端）
    async addStudent(params = {}) {
      let res = await service.addStudent(params);
      if (res.errorCode === 0) {
      }
    },
    //编辑学生信息（微信端）
    async updateStudent() {
      let res = await service.updateStudent(params);
      if (res.errorCode === 0) {
      }
    },
    //删除学生信息（微信端）
    async deleteStudent() {
      let res = await service.deleteStudent(params);
      if (res.errorCode === 0) {
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
