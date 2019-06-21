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
          <el-form-item label="考试单元">
            <el-select v-model="query.classId" placeholder="考试单元">
              <el-option
                v-for="item in stageList"
                :key="item.stageId"
                :label="item.gradeName"
                :value="item.stageId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <!-- 表格数据 -->
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column label="序号" prop="stageId"></el-table-column>
        <el-table-column label="班级" prop="className"></el-table-column>
        <el-table-column label="考试类型" prop="stageTitle"></el-table-column>
        <el-table-column label="学科" prop="lessonTitle"></el-table-column>
        <el-table-column label="录入日期" prop="postTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-ft">
      <!-- 分页 -->
      <div class="qx-pagination" v-if="totalCount">
        <el-pagination
          background
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog width="80%" top="40px" title="成绩录入" :visible.sync="dialogFormVisible">
      <el-form
        class="demo-form-inline"
        :inline="true"
        ref="form"
        :model="form"
        status-icon
        size="small"
      >
        <el-form-item label="班级" prop="classId">
          <el-select v-model="form.classId" placeholder="班级">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="lessonId">
          <el-select v-model="form.lessonId" placeholder="科目">
            <el-option
              v-for="item in lessonList"
              :key="item.lessonId"
              :label="item.title"
              :value="item.lessonId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试类型" prop="title">
          <el-input v-model="form.title" placeholder="请输入考试类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleSearchScore">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询的数据表格 -->
      <el-table :data="scoreData" style="width: 100%" size="small">
        <el-table-column label="序号" prop="studentId"></el-table-column>
        <el-table-column label="学生姓名" prop="studentName"></el-table-column>
        <el-table-column label="成绩" prop="score">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.score"
              placeholder="请输入学生成绩"
              maxlength="3"
              @blur="handleBlur(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "score",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      query: {
        classId: 0,
        stageId: 0,
        page: 1,
        pageSize: 20
      },
      form: {
        classId: null,
        lessonId: null,
        stageId: null,
        title: ""
      },
      classList: [],
      lessonList: [],
      stageList: [],
      scoreData: [],
      tableData: [],
      totalCount: 0
    };
  },
  methods: {
    handleSearch() {
      this.queryScoreStageList(this.query);
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleEdit(row) {},
    handleDel(row) {
      let { stageId } = row;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteStageScore(stageId);
        })
        .catch(error => {
          return false;
        });
    },
    handleSearchScore() {
      let { stageId, ...args } = this.form;
      //成绩录入
      this.addStage(args);
    },
    handleBlur(row) {
      console.log(row);
    },
    //班级学生考试成绩列表
    async queryScoreStageList(params = {}) {
      let res = await service.queryScoreStageList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //删除阶段成绩
    async deleteStageScore(stageId) {
      let res = await service.deleteStageScore(
        { stageId },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.queryScoreStageList(this.query);
      }
    },
    //成绩录入
    async addStage(params = {}) {
      let res = await service.addStage(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.form.stageId = res.data.stageId;
        let { title, ...args } = this.form;
        this.studentStageScoreList(args);
      }
    },
    //录入学生成绩
    async addStageScore(params = {}) {
      let res = await service.addStageScore(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$message({ message: `成绩录入成功`, type: "success" });
      }
    },
    //班级学生考试成绩列表
    async studentStageScoreList(params = {}) {
      let res = await service.studentStageScoreList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.scoreData = res.data;
      }
    },
    //考试单元
    async queryExamStage(params = {}) {
      let res = await service.queryExamStage(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.stageList = res.data;
      }
    },
    //课程查询
    async queryLesson(params = {}) {
      let res = await service.queryLesson(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.lessonList = res.data;
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
      }
    }
  },
  mounted() {
    this.queryScoreStageList(this.query);
    this.queryExamStage();
    this.queryLesson();
    this.queryStudentClass();
  }
};
</script>
<style lang="less" scoped>
</style>
