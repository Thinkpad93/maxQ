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
        <el-table-column label="内容标题" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="栏目名称" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="申请人" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="上传时间" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="审核时间" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" prop="contentId" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </template>
    <template>
      <el-dialog center top="40px" :visible.sync="dialogAdd">
        <el-form :rules="rules" ref="formRef" :model="form" status-icon size="mini" :label-width="formLabelWidth">
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
                v-for="item in labelsList"
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
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import region from "@/components/region";
export default {
  name: "prerelease",
  components: {
    'qx-region': region,
  },  
  data() {
    return {
      dialogAdd: false,
      query: {},
      form: {},
      rules: {},
      propertyidList: [],
      typeidList: [],      
      labelsList: [],
      tableData: []
    };
  },
  methods: {
    search() {},
    lastChange(value) {}
  }
};
</script>
<style lang="less" scoped>
</style>
