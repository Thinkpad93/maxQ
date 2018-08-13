<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="form" size="small" label-width="70px" label-position="left">
              <el-form-item>
                <el-autocomplete
                  class="inline-input"
                  v-model="state1"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入学校名称"
                  @select="handleSelect"
                ></el-autocomplete>                
              </el-form-item>           
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>      
    </template>     
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" border stripe size="mini" v-loading="loading">
          <el-table-column :resizable="false" width="100" label="序号" prop="repairId" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="设备编号" prop="deviceNo" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="安装位置" prop="address" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="故障时间" prop="faultTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="故障描述" prop="faultDescription" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="检修时间" prop="repairTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="检修结果" prop="repairResult" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="检修人员" prop="repairMan" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="操作" width="200">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
            </template>            
          </el-table-column>
      </el-table>        
    </template> 
    <!-- 新增检修记录 -->
    <template>
      <el-dialog :close-on-click-modal="false" center @open="show" @close="close" top="40px" title="新增检修记录" :visible.sync="dialogAdd" :modal-append-to-body="false">
        <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="学校名称" prop="schoolid">
            <el-input v-model="addForm.schoolid" placeholder="请输入学校名称" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="故障时间" prop="fault_time">
            <el-date-picker
              v-model="addForm.fault_time"
              type="date"
              placeholder="选择故障时间">
            </el-date-picker>            
          </el-form-item>
          <el-form-item label="检修时间" prop="repair_time">
            <el-date-picker
              v-model="addForm.repair_time"
              type="date"
              placeholder="选择检修时间">
            </el-date-picker>             
          </el-form-item>          
          <el-form-item label="故障描述" prop="fault_description">
            <el-input type="textarea" v-model="addForm.fault_description" :rows="4" placeholder="请输入故障描述"></el-input>
          </el-form-item>
          <el-form-item label="检修结果" prop="repair_result">
            <el-input type="textarea" v-model="addForm.repair_result" :rows="4" placeholder="请输入检修结果"></el-input>
          </el-form-item>
          <el-form-item label="检修人员" prop="repair_man">
            <el-input v-model="addForm.repair_man" placeholder="请输入检修人员" maxlength="4"></el-input>
          </el-form-item>
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button :loading="btnloading" size="mini" type="primary" @click="addsForm('addForm')">保存</el-button>
          </el-row>             
        </el-form>
      </el-dialog>
    </template>   
    <!-- 编辑检修记录 -->
    <template>
      <el-dialog :close-on-click-modal="false" center @open="show" @close="close" top="40px" title="编辑检修记录" :visible.sync="dialogEdit">
        <el-form :rules="rules" ref="editForm" :model="edit" size="small" :label-width="formLabelWidth">
          <el-form-item label="学校名称" prop="schoolid">
            <el-input v-model="edit.schoolid" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="故障时间" prop="fault_time">
            <el-date-picker
              v-model="edit.fault_time"
              type="date"
              placeholder="选择故障时间">
            </el-date-picker>   
          </el-form-item>
          <el-form-item label="检修时间" prop="repair_time">
            <el-date-picker
              v-model="edit.repair_time"
              type="date"
              placeholder="选择检修时间">
            </el-date-picker>               
          </el-form-item>
          <el-form-item label="故障描述" prop="fault_description">
            <el-input type="textarea" v-model="edit.fault_description" :rows="4" placeholder="请输入故障描述"></el-input>
          </el-form-item>
          <el-form-item label="检修结果" prop="repair_result">
            <el-input type="textarea" v-model="edit.repair_result" :rows="4" placeholder="请输入检修结果"></el-input>
          </el-form-item>
          <el-form-item label="检修人员" prop="repair_man">
            <el-input v-model="edit.repair_man" placeholder="请输入检修人员" maxlength="4"></el-input>
          </el-form-item>
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogEdit = false">取消</el-button>
            <el-button :loading="btnloading" size="mini" type="primary" @click="editorForm('editForm')">保存</el-button>
          </el-row>              
        </el-form>
      </el-dialog>
    </template>        
  </div>  
</template>
<script>
export default {
  name: "record",
  data() {
    return {
      loading: false,
      dialogAdd: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      //默认参数
      query: {
        schoolid: 0,
        page: 1,
        page_size: 10
      }, 
      restaurants: [],
      state1: '',      
      rules: {
        schoolid: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        fault_time: [
          { required: true, message: "请选择故障时间", trigger: "blur" }
        ],
        repair_time: [
          { required: true, message: "请选择检修时间", trigger: "blur" }
        ],
        fault_description: [
          { required: true, message: "请输入故障描述", trigger: "blur" }
        ],
        repair_result: [
          { required: true, message: "请输入检修结果", trigger: "blur" }
        ],
        repair_man: [
          { required: true, message: "请输入检修人员", trigger: "blur" }
        ]
      },
      addForm: {},
      edit: {},
      tableData: []           
    };
  },
  methods: {
    show() {},
    close() {}, 
    search() {},
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },        
      ]
    },
    handleSelect() {},        
  },
  mounted() {
    this.restaurants = this.loadAll();
  }   
};
</script>
<style lang="less" scoped>
</style>
