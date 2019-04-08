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
          <el-form-item label="班级">
            <el-select v-model="query.classId" placeholder="选择班级">
              <el-option
                v-for="item in classList"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input v-model="query.studentName" placeholder="请输入学生姓名" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button size="small" icon="el-icon-plus" type="primary" @click="handleAdd">录入</el-button>
            <el-upload
              class="upload-excel"
              ref="excel"
              list-type="text"
              :multiple="false"
              :with-credentials="true"
              :show-file-list="false"
              action
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              :before-upload="beforeUpload"
            >
              <el-button size="small" icon="el-icon-plus" type="primary">文件导入上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column label="序号" prop="studentId"></el-table-column>
        <el-table-column label="学生姓名" prop="studentName"></el-table-column>
        <el-table-column label="年级" prop="grade"></el-table-column>
        <el-table-column label="班级" prop="className"></el-table-column>
        <el-table-column label="家长" prop="linkMan">
          <template slot-scope="scope">
            <p v-for="link in scope.row.linkMan" :key="link.relation">
              <span>手机号: {{ link.tel }}</span>
              <span>
                关系:
                <template v-if="link.relation == 1">妈妈</template>
                <template v-else-if="link.relation == 2">爸爸</template>
                <template v-else-if="link.relation == 3">爷爷</template>
                <template v-else-if="link.relation == 4">奶奶</template>
                <template v-else-if="link.relation == 5">外公</template>
                <template v-else>外婆</template>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-ft">
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

    <!-- 新增 or 编辑 -->
    <el-dialog top="40px" title :visible.sync="dialogFormVisible">
      <span slot="title" class="dialog-title">{{ isShow ? '新增': '编辑' }}</span>
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
        <el-form-item label="班级" prop="classId">
          <el-select v-model="form.classId" placeholder="选择班级">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="handleAddlinkMan">新增家长</el-button>
        </el-form-item>
        <!-- for -->
        <el-row :gutter="5" v-for="(item,index) in form.linkMan" :key="index">
          <el-col :span="8">
            <el-form-item :label="`家长手机号`" :prop="`linkMan.${index}.tel`" :rules="linkmanRules.tel">
              <el-input v-model="item.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`关系`" :prop="`relation`">
              <el-select v-model="item.relation" placeholder="请选择学生与家长关系">
                <el-option
                  v-for="item in relationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="handleRemoveLinkMan(index)"
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
import pageMixins from "@/mixins/page";
import { isPhone } from "@/utils/validator";
export default {
  name: "student",
  mixins: [sex, relation, pageMixins],
  data() {
    return {
      isShow: true,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      query: {
        grade: 0,
        classId: 0,
        studentName: "",
        schoolId: this.$route.params.id,
        page: 1,
        pageSize: 20
      },
      form: {
        studentName: "",
        classId: null,
        sex: 1,
        tel: "",
        linkMan: []
      },
      linkMan: [{ tel: "", relation: 1, patriarchId: 0 }],
      linkmanRules: {
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
        ]
      },
      rules: {
        studentName: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "选择性别",
            trigger: "blur"
          }
        ],
        classId: [
          {
            required: true,
            message: "选择班级",
            trigger: "blur"
          }
        ]
      },
      classList: []
    };
  },
  methods: {
    //上传文件之前
    async beforeUpload(file) {
      let schoolId = this.$route.params.id; //微信端学校Id
      let fileName = file.name.split(".");
      const extension = fileName[fileName.length - 1] === "xls";
      const extensions = fileName[fileName.length - 1] === "xlsx";
      if (!extension && !extensions) {
        this.$message({
          message: "文件只能是xls、xlsx格式!",
          type: "warning"
        });
      }
      if (extension || extensions) {
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let uploadForm = new FormData();
        uploadForm.append("file", file);
        uploadForm.append("schoolId", schoolId);
        let res = await service.batchStudents(uploadForm, config);
        if (res.errorCode === 0) {
          this.$alert("导入成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.queryStudent(this.query);
        }
      }
      return extension || extensions;
    },
    handleSearch() {
      this.queryStudent(this.query);
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.queryStudent(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.queryStudent(this.query);
    },
    handleAddlinkMan() {
      this.form.linkMan.push({ tel: "", relation: 1, patriarchId: 0 });
    },
    handleRemoveLinkMan(index) {
      return this.form.linkMan.splice(index, 1);
    },
    handleAdd() {
      this.isShow = true;
      this.dialogFormVisible = true;
      this.form = {
        linkMan: [{ tel: "", relation: 1, patriarchId: 0 }]
      };
    },
    handleEdit(row) {
      this.isShow = false;
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
          this.deleteStudent(row.studentId);
        })
        .catch(error => {
          return false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let schoolId = this.$route.params.id;
          Object.assign(this.form, { schoolId });
          if (this.isShow) {
            this.addStudent(this.form);
          } else {
            this.updateStudent(this.form);
          }
        }
      });
    },
    //查询学生列表（微信端）
    async queryStudent(params = {}) {
      let res = await service.queryStudent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //录入学生信息（微信端）
    async addStudent(params = {}) {
      let res = await service.addStudent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.queryStudent(this.query);
      }
    },
    //编辑学生信息（微信端）
    async updateStudent(params) {
      let res = await service.updateStudent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.queryStudent(this.query);
      }
    },
    //删除学生信息（微信端）
    async deleteStudent(studentId) {
      let res = await service.deleteStudent(
        { studentId },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.queryStudent(this.query);
      }
    },
    //查询班级列表（微信端）
    async querySchoolClass() {
      let schoolId = this.$route.params.id;
      let res = await service.querySchoolClass(
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
  activated() {
    this.queryStudent(this.query);
    this.querySchoolClass();
  }
};
</script>
<style lang="less" scoped>
.upload-excel {
  display: inline-block;
  margin-left: 10px;
}
</style>
