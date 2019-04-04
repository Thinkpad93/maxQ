
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
          <el-form-item label="学校名称">
            <el-input v-model="query.schoolName" placeholder="请输入学校名称" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button
              v-if="schoolId === 0"
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible = true"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column label="学校ID" prop="schoolId"></el-table-column>
        <el-table-column label="学校名称" prop="schoolName"></el-table-column>
        <el-table-column label="手机号" prop="tel"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
              v-if="schoolId === 0"
            >编辑</el-button>
            <el-button size="mini" type="primary" @click="handleOpen(scope.row, 1)">班级管理</el-button>
            <el-button size="mini" type="primary" @click="handleOpen(scope.row, 2)">老师管理</el-button>
            <el-button size="mini" type="primary" @click="handleOpen(scope.row, 3)">学生管理</el-button>
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
    <el-dialog title top="40px" :visible.sync="dialogFormVisible">
      <span slot="title" class="dialog-title">{{ isShow ? '新增': '编辑' }}</span>
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        status-icon
        size="small"
        :label-width="formLabelWidth"
      >
        <el-form-item label="区域选择" prop="regionId">
          <qx-region @last="queryRegion" v-model="form.regionId"></qx-region>
        </el-form-item>
        <el-form-item label="学校名称" prop="terminalSchoolId">
          <el-select
            v-model="form.terminalSchoolId"
            clearable
            placeholder="选择学校"
            @change="handleChangeSchool"
          >
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
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
import region from "@/components/region";
import { isPhone } from "@/utils/validator";
import { mapGetters } from "vuex";
export default {
  name: "weixinSchool",
  components: {
    "qx-region": region
  },
  data() {
    return {
      isShow: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      query: {
        schoolName: "",
        leaderName: "",
        page: 1,
        pageSize: 20
      },
      form: {
        regionId: [],
        tel: "",
        schoolName: "",
        terminalSchoolId: null
      },
      rules: {
        regionId: [
          {
            required: true,
            message: "请选择区域",
            trigger: "blur"
          }
        ],
        terminalSchoolId: [
          {
            required: true,
            message: "请选择学校名称",
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
        ]
      },
      tableData: [],
      totalCount: 0,
      schoolList: []
    };
  },
  computed: {
    ...mapGetters(["schoolId"])
  },
  methods: {
    handleCurrentChange(curr) {
      this.query.page = curr;
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
    },
    handleSearch() {
      this.querySchoolList(this.query);
    },
    handleChangeSchool(value) {
      let obj = this.schoolList.find(item => item.id === value);
      this.form.schoolName = obj.name;
    },
    handleEdit(row) {
      console.log(row);
    },
    //班级管理 老师管理 学生管理
    handleOpen(row, index) {
      if (index == 1) {
        this.$router.push({
          path: `/weixin/class/${row.schoolId}`
        });
      } else if (index == 2) {
        this.$router.push({
          path: `/weixin/teacher/${row.schoolId}`
        });
      } else {
        this.$router.push({
          path: `/weixin/student/${row.schoolId}`
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { regionId, ...args } = this.form;
          this.addLeaderInit(args);
        }
      });
    },
    //加载学校数据
    async queryRegion(value) {
      this.form.regionId = value;
      let last = value[value.length - 1];
      let res = await service.queryRegion({ queryId: last, queryType: 3 });
      if (res.errorCode === 0) {
        this.schoolList = res.data;
      } else {
        return false;
      }
    },
    //查询学校列表（微信端）
    async querySchoolList(params = {}) {
      let res = await service.querySchoolList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //预录入号码（微信端）
    async addLeaderInit(params = {}) {
      let res = await service.addLeaderInit(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.querySchoolList(this.query);
      }
    },
    //根据名称查询学校（微信端）
    async findSchool(params = {}) {
      let res = await service.findSchool(params);
      if (res.errorCode === 0) {
      }
    },
    //编辑学校（微信端）
    async updateSchool(params = {}) {
      let res = await service.updateSchool(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.querySchoolList(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
