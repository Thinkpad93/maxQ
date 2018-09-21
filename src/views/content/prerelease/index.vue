<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="内容标题">
                <el-input v-model="query.title" placeholder="请输入内容标题" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="small">
        <el-table-column label="内容编号" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="申请人" prop="userName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上传时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" prop="contentId" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleRelease(scope.row)">预发布</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template>
      <qx-pagination 
        @page-change="pageChange" 
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>      
    <!-- 预发布 -->
    <template>
      <el-dialog title="预发布" center top="40px" :visible.sync="dialogAdd">
        <el-form :rules="rules" ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="内容标题" prop="name">
            <el-input v-model="form.name" placeholder="请输入栏目名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布区域" prop="name">
            <qx-region @last="lastChange"></qx-region>
          </el-form-item>
          <el-form-item label="发布来源" prop="name">
            <el-input v-model="form.name" placeholder="请输入发布来源"></el-input>
          </el-form-item>
          <el-form-item label="学校性质" prop="propertyId">
            <el-select v-model="form.propertyId" placeholder="请选择学校性质">
              <el-option
                v-for="item in propertyidList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>            
            </el-select>                          
          </el-form-item>  
          <el-form-item label="学校类型" prop="typeId">
            <el-select v-model="form.typeId" placeholder="请选择学校类型">
              <el-option
                v-for="item in typeidList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>            
            </el-select>                           
          </el-form-item>                   
          <el-form-item label="学校标签" prop="labelIds">
            <el-select v-model="form.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择学校标签">
              <el-option
                v-for="item in schoolLabel"
                :key="item.labelId"
                :label="item.name"
                :value="item.labelId">
              </el-option>              
            </el-select>
          </el-form-item>
          <el-form-item label="冠名企业" prop="labelIds">
            <el-select v-model="form.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择冠名企业">
              <el-option
                v-for="item in labelsList"
                :key="item.labelId"
                :label="item.name"
                :value="item.labelId">
              </el-option>              
            </el-select>
          </el-form-item>
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('form')">预发布</el-button>
          </el-row>          
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import service from "@/api";
import region from "@/components/region";
import pagination from "@/components/pagination";
export default {
  name: "prerelease",
  components: {
    "qx-region": region,
    "qx-pagination": pagination
  },
  data() {
    return {
      formLabelWidth: "100px",
      dialogAdd: true,
      query: {
        title: "",
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
      form: {},
      rules: {},
      propertyidList: [],
      typeidList: [],
      schoolLabel: [],
      labelsList: [],
      tableData: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    pageChange(curr) {
      this.query.page = curr;
      this.createTable();
    },
    search() {},
    handleRelease(row) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    //查询标签 1.学校 3.冠名企业
    async queryLabel(queryType) {
      let res = await service.queryLabel({ queryType });
      if (res.errorCode === 0) {
        if (queryType == 1) {
          this.schoolLabel = res.data;
        }else if (queryType == 3) {
          this.labelsList = res.data;
        }
      }
    },    
    //查询学校类别
    async querySchoolCategory(params = {}) {
      let res = await service.querySchoolCategory(params);
      if (res.errorCode === 0) {
        if (params.queryType) {
          this.typeidList = res.data;
        } else {
          this.propertyidList = res.data;
        }
      }
    },
    async lastChange(value) {},
    async createTable() {
      let res = await service.queryPrepublishContentList(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    }
  },
  mounted() {
    this.createTable();
    this.queryLabel(1);
    this.queryLabel(3);
    this.querySchoolCategory({ queryType: 0 });
    this.querySchoolCategory({ queryType: 1 });
  }
};
</script>
<style lang="less" scoped>
</style>
