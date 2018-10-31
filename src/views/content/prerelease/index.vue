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
        <el-table-column width="150" label="内容编号" type="index" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="内容标题" prop="title" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="申请人" prop="userName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上传时间" prop="publishTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="审核时间" prop="checkTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleRelease(scope.row)">预发布</el-button>
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
        <el-form ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="内容标题" prop="title">
            <el-input v-model="form.title" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布来源" prop="resources">
            <el-input v-model="form.resources" disabled></el-input>
          </el-form-item>  
          <template v-if="type !== 1">
            <qx-region-t @regionChange="handleRegionChange"></qx-region-t>      
            <el-form-item label="学校性质" prop="propertyId">
              <el-select v-model="form.propertyId" clearable placeholder="请选择学校性质">
                <el-option
                  v-for="item in propertyidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>            
              </el-select>                          
            </el-form-item>  
            <el-form-item label="学校类型" prop="typeId">
              <el-select v-model="form.typeId" clearable placeholder="请选择学校类型">
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
            </el-form-item>
          </template>    
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogAdd = false">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm('form')">确定</el-button>
        </span>         
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/api";
import regiont from "@/components/qxregion";
import pagination from "@/components/pagination";
export default {
  name: "prerelease",
  components: {
    "qx-region-t": regiont,
    "qx-pagination": pagination
  },
  data() {
    return {
      formLabelWidth: "100px",
      dialogAdd: false,
      query: {
        title: "",
        page: 1,
        pageSize: 20
      },
      totalCount: 0,
      form: {
        scopeType: null,
        scopeId: null,
        propertyId: null,
        typeId: null,
        labelIds: [],
        //regionId: [],
        sponsorIds: []
      },
      rules: {
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
    //type 账号类型 0-促进会 1-学校 2-教育局 3-培训机构
    ...mapGetters(["type"]),
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
    handleRegionChange(queryId, queryType) {
      this.form.scopeId = queryId;
      this.form.scopeType = queryType;
    },
    handleRelease(row) {
      let { contentId, resources, title } = row;
      this.dialogAdd = true;
      this.form = Object.assign({}, this.form, { contentId, resources, title });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { title, resources, ...args } = this.form;
          // let { regionId, scopeId, resources, title, ...args } = this.form;
          // if (regionId.length) {
          //   scopeId = regionId[regionId.length - 1];
          // } else {
          //   scopeId = null;
          // }
          //let obj = Object.assign({}, args, { scopeId });
          console.log(args);
          this.prepublishContent(args);
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
        this.$refs.form.resetFields(); //清空表单的值
      } else if (res.errorCode === -1) {
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
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
    this.queryLabel(1);
    this.querySchoolCategory({ queryType: 0 });
    this.querySchoolCategory({ queryType: 1 });
  },
  activated() {
    this.queryPrepublishContentList(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
