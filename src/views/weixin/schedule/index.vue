<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form class="demo-form-inline" :inline="true" :model="query" size="small">
          <el-form-item label="班级">
            <el-select v-model="query.classId" placeholder="班级">
              <el-option
                v-for="item in classList"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAddScheduleTemplate">新增模板</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAddSchedule">新增课表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <!-- 表格数据 -->
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column label="序号" prop="pitchId"></el-table-column>
        <el-table-column label="课堂时间">
          <template slot-scope="scope">
            <span>{{ scope.row.classHour }}</span>
            <span>{{ scope.row.quittingTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="星期一" prop="monday"></el-table-column>
        <el-table-column label="星期二" prop="tuesday"></el-table-column>
        <el-table-column label="星期三" prop="wednesday"></el-table-column>
        <el-table-column label="星期四" prop="thursday"></el-table-column>
        <el-table-column label="星期五" prop="friday"></el-table-column>
        <el-table-column label="星期六" prop="saturday"></el-table-column>
        <el-table-column label="星期日" prop="sunday"></el-table-column>
      </el-table>
    </div>
    <!-- dialog  新增模板 -->
    <el-dialog top="40px" title="新增模板" :visible.sync="dialogFormVisible">
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        status-icon
        size="small"
        :label-width="formLabelWidth"
      >
        <el-form-item
          label="模板名称"
          prop="scheduleName"
          :rules="[
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ]"
        >
          <el-input v-model="form.scheduleName" placeholder="请输入模板名称"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="tplData" style="width: 100%" size="small">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="课堂时间">
          <template slot-scope="scope">
            <el-time-select
              size="small"
              :clearable="false"
              v-model="scope.row.classHour"
              placeholder="上课时间"
              :picker-options="{
              start: '07:00',
              step: '00:05',
              end: '18:00'
            }"
            ></el-time-select>
            <el-time-select
              size="small"
              :clearable="false"
              v-model="scope.row.quittingTime"
              placeholder="下课时间"
              :picker-options="{
              start: '07:00',
              step: '00:05',
              end: '18:00',
              minTime: scope.row.classHour
            }"
            ></el-time-select>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "schedule",
  data() {
    return {
      dialogFormVisible: false,
      query: {
        classId: null
      },
      form: {
        schoolId: this.$route.params.id,
        scheduleName: "",
        tepmlate: []
      },
      classList: [], //班级数据
      tableData: [], //表格数据
      tplData: [
        {
          classHour: "07:00",
          quittingTime: "07:30"
        }
      ] //模板
    };
  },
  methods: {
    handleSearch() {
      this.queryScheduleList(this.query);
    },
    handleAddScheduleTemplate() {
      this.dialogFormVisible = true;
    },
    handleAddSchedule() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    //班级课表列表展示
    async queryScheduleList(params = {}) {
      let res = await service.queryScheduleList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data;
      }
    },
    //班级查询
    async queryStudentClass() {
      let schoolId = this.$route.params.id;
      let res = await service.queryStudentClass(
        { schoolId },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.classList = res.data;
        this.query.classId = res.data[0].classId;
        //先查班级，在调用查询列表数据的方法
        this.queryScheduleList(this.query);
      }
    },
    //新增模板
    async addScheduleTemplate(params = {}) {
      let res = await service.addScheduleTemplate(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.queryStudentClass();
  }
};
</script>
<style lang="less" scoped>
</style>
