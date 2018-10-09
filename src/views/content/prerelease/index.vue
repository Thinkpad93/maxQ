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
        <el-table-column label="内容ID" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="学校ID" prop="schoolId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="账户类型" prop="type" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">促进会</span>
            <span v-else-if="scope.row.type === 1">学校</span>
            <span v-else-if="scope.row.type === 2">教育局</span>
            <span v-else>培训机构</span>
          </template>
        </el-table-column>
        <el-table-column label="发布来源" prop="resources" :show-overflow-tooltip="true"></el-table-column>
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
        @page-size="pageSize" 
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>      
    <!-- 预发布 -->
    <template>
      <el-dialog title="预发布" center top="40px" :visible.sync="dialogAdd">
        <el-form :rules="rules" ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="内容标题" prop="title">
            <el-input v-model="form.title" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布来源" prop="resources">
            <el-input v-model="form.resources" disabled></el-input>
          </el-form-item>          
          <el-form-item label="发布区域" prop="regionId">
            <qx-region @last="lastChange" v-model="form.regionId"></qx-region>
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
          <el-form-item label="冠名企业" prop="sponsorIds">
            <el-checkbox-group v-model="form.sponsorIds">
              <el-checkbox :label="1">广州市华侨文化发展基金会</el-checkbox>
              <el-checkbox :label="2">广州市科普知识促进会</el-checkbox>
            </el-checkbox-group>
            <!-- <el-select v-model="form.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择冠名企业">
              <el-option
                v-for="item in labelsList"
                :key="item.labelId"
                :label="item.name"
                :value="item.labelId">
              </el-option>              
            </el-select> -->
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
      dialogAdd: false,
      query: {
        title: "",
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
      form: {
        scopeType: 3,
        scopeId: null,
        regionId: [],
        sponsorIds: [0, 1]
      },
      rules: {
        regionId: [
          {
            required: true,
            message: "请选择发布区域",
            trigger: "blur"
          }
        ],
        propertyId: [
          { required: true, message: "请选择学校性质", trigger: "blur" }
        ],
        propertyId: [
          { required: true, message: "请选择学校性质", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择学校类型", trigger: "blur" }
        ],
        labelIds: [
          { required: true, message: "请选择学校标签", trigger: "blur" }
        ]
      },
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
      this.queryPrepublishContentList(this.query);
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.queryPrepublishContentList(this.query);
    },
    search() {
      if (this.query.title != "") {
        this.queryPrepublishContentList(this.query);
      }
    },
    handleRelease(row) {
      let { contentId, resources, title } = row;
      this.dialogAdd = true;
      this.form = Object.assign({}, this.form, { contentId, resources, title });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { regionId, scopeId, resources, title, ...args } = this.form;
          if (Array.isArray(regionId)) {
            scopeId = regionId[regionId.length - 1];
          }
          let obj = Object.assign({}, args, { scopeId });
          this.prepublishContent(obj);
        }
      });
    },
    async lastChange(value) {
      this.form.regionId = value;
    },
    //进行内容预发布
    async prepublishContent(params = {}) {
      let res = await service.prepublishContent(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogAdd = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryPrepublishContentList(this.query);
      }
    },
    //查询标签 1.学校 3.冠名企业
    async queryLabel(queryType) {
      let res = await service.queryLabel({ queryType });
      if (res.errorCode === 0) {
        if (queryType == 1) {
          this.schoolLabel = res.data;
        } else if (queryType == 3) {
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
    //查询预发布内容列表
    async queryPrepublishContentList(params = {}) {
      let res = await service.queryPrepublishContentList(params);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    }
  },
  mounted() {
    this.queryPrepublishContentList(this.query);
    this.queryLabel(1);
    //this.queryLabel(3);
    this.querySchoolCategory({ queryType: 0 });
    this.querySchoolCategory({ queryType: 1 });
  }
};
</script>
<style lang="less" scoped>
</style>
