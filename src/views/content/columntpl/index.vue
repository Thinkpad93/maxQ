<template>
   <div class="page">
    <!-- 表单 -->
    <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                        <el-form-item label="栏目模板">
                            <el-input v-model="query.channelName" placeholder="请输入栏目模板" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                            <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增栏目模板</el-button>
                        </el-form-item>   
                    </el-form>
                </div>
            </el-col>
        </el-row> 
    </template> 
    <!-- 表格数据 -->
    <template>
        <el-table :data="tableData" style="width: 100%" border stripe size="mini" v-loading="loading">
            <el-table-column label="序号" prop="id"></el-table-column>
            <el-table-column label="栏目模板" prop="tpl">
                <template slot-scope="scope">
                    <a href="javascript:;" style="color:#409EFF" @click="handleView">{{ scope.row.tpl }}</a>
                </template>                    
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button> 
                    <template v-if="scope.row.isdefault">
                        <el-button :disabled="scope.row.isdefault === true" size="mini" type="success" v-if="scope.row.isdefault">默认模板</el-button>   
                    </template>   
                    <template v-else>
                        <el-button size="mini" type="info" @click="setDefautl(scope.row)">设置默认模板</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </template>    
   </div> 
</template>
<script>
import { queryChannelTemplate } from "@/api/content";
export default {
  name: "columnTpl",
  data() {
    return {
      dialogAdd: false,
      loading: false,
      query: {
        templateName: "",
        page: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  methods: {
    search() {},
    handleEdit() {},
    handleDel() {},
    handleView() {},
    //显示栏目模板列表
    createTable() {
      queryChannelTemplate(this.query).then(res => {
        if (res.errorCode === 0) {
          this.tableData = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
</style>
