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
          <el-form-item label="老师姓名">
            <el-input v-model="query.teacherName" placeholder="请输入老师姓名" maxlength="10"></el-input>
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
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" stripe size="small">
        <el-table-column label="序号" prop="teacherId"></el-table-column>
        <el-table-column label="老师姓名" prop="teacherName"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="手机号" prop="tel"></el-table-column>
        <el-table-column label="职务类别" prop="type">
          <template slot-scope="scope">
            <span v-if="scope.row.type">老师</span>
            <span v-else>管理员</span>
          </template>
        </el-table-column>
        <el-table-column label="任教班级" prop="className"></el-table-column>
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
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        status-icon
        size="small"
        :label-width="formLabelWidth"
      >
        <el-form-item label="老师名称" prop="teacherName">
          <el-input v-model="form.teacherName" placeholder="请输入老师名称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="选择性别">
            <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select v-model="form.type" placeholder="选择类别">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任教班级" prop="classIds">
          <el-select multiple collapse-tags v-model="form.classIds" placeholder="选择任教班级">
            <el-option
              v-for="item in labelsFilter"
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
import { sex, type } from "@/mixins";
import { isPhone } from "@/utils/validator";
export default {
  name: "teacher",
  mixins: [sex, type],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      classList: [],
      query: {
        grade: 0,
        classId: 0,
        teacherName: "",
        schoolId: this.$store.getters.schoolId,
        page: 1,
        pageSize: 20
      },
      form: {
        teacherName: "",
        sex: 1,
        tel: "",
        type: 1,
        schoolId: null,
        classIds: []
      },
      rules: {
        teacherName: [
          {
            required: true,
            message: "请输入老师名称",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        classIds: [
          {
            required: true,
            message: "请选择任教班级",
            trigger: "blur"
          }
        ]
      },
      tableData: []
    };
  },
  methods: {
    handleSearch() {},
    handleEdit(row) {},
    handleDel(row) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          this.deleteTeacher(row.teacherId);
        })
        .catch(error => {
          return false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    //查询老师列表（微信端）
    async queryTeachers(params = {}) {
      let res = await service.queryTeachers(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
      }
    },
    //录入老师信息（微信端）
    async addTeacher(params = {}) {
      let res = await service.addTeacher(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
      }
    },
    //删除老师信息（微信端）
    async deleteTeacher(teacherId) {
      let res = await service.deleteTeacher(
        { teacherId },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryTeachers(this.query);
      }
    },
    //编辑老师信息（微信端）
    async updateTeacher(params = {}) {
      let res = await service.updateTeacher(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
      }
    },
    async queryClasses(params = {}) {
      let res = await service.queryClasses(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.queryTeachers(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
