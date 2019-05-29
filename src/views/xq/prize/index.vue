<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="query"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="奖项名称">
            <el-input v-model="query.schoolName" placeholder="请输入奖项名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="query.channelId" placeholder="请选择">
              <el-option
                v-for="item in prizeTypelList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
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
      <base-table :data="tableData" :columns="columns">
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </base-table>
    </div>
    <!-- 新增 or 编辑 -->
    <el-dialog top="40px" title="学生点评" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" status-icon>
        <el-form-item
          label="奖项名称"
          prop="commentContent"
          :rules="[
          { required: true, message: '请输入奖项名称', trigger: 'blur' }
        ]"
        >
          <el-input v-model="form.commentContent" placeholder="请输入奖项名称"></el-input>
        </el-form-item>
        <el-form-item
          label="兑换数量"
          prop="commentContent"
          :rules="[
          { required: true, message: '请输入兑换数量', trigger: 'blur' }
        ]"
        >
          <el-input v-model="form.commentContent" placeholder="请输入兑换数量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
import QTable from "@/components/QTable";
export default {
  name: "",
  components: {
    "base-table": QTable
  },
  data() {
    return {
      dialogFormVisible: false,
      columns: [
        {
          label: "序号",
          prop: "deviceId"
        },
        {
          label: "奖项名称",
          prop: "deviceId"
        },
        {
          label: "兑换Q星",
          prop: "deviceId"
        },
        {
          label: "类型",
          prop: "deviceId"
        }
      ],
      prizeTypelList: [
        {
          id: 1,
          name: "全部"
        },
        {
          id: 2,
          name: "自定义"
        },
        {
          id: 3,
          name: "默认"
        }
      ],
      query: {},
      form: {},
      tableData: []
    };
  },
  methods: {
    handleSearch() {},
    handleAdd() {},
    handleEdit(row) {},
    handleDel(row) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
