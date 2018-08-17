<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="学校名称">
                <el-select v-model="query.schoolId" clearable filterable placeholder="选择学校" @change="handleSchool">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option> 
                </el-select>
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
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" border stripe size="mini" v-loading="loading">
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
      <el-dialog center @open="show" @close="close" top="40px" title="新增检修记录" :visible.sync="dialogAdd" :modal-append-to-body="false">
        <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="区域选择" prop="area">
            <region @change="handleRegionInner"></region>
          </el-form-item>    
          <el-form-item label="学校名称" prop="schoolId">
            <el-select v-model="addForm.schoolId" clearable filterable placeholder="选择学校">
              <el-option
                v-for="item in schoolListInner"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option> 
            </el-select>              
          </el-form-item>                
          <!-- <el-form-item label="学校名称" prop="schoolid">
            <el-input v-model="addForm.schoolid" placeholder="请输入学校名称" maxlength="20"></el-input>
          </el-form-item> -->
          <el-form-item label="故障时间" prop="faultTime">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="addForm.faultTime"
              type="datetime"
              placeholder="选择故障时间">
            </el-date-picker>            
          </el-form-item>
          <el-form-item label="检修时间" prop="repairTime">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="addForm.repairTime"
              type="datetime"
              placeholder="选择检修时间">
            </el-date-picker>             
          </el-form-item>          
          <el-form-item label="故障描述" prop="faultDescription">
            <el-input type="textarea" v-model="addForm.faultDescription" :rows="4" placeholder="请输入故障描述"></el-input>
          </el-form-item>
          <el-form-item label="检修结果" prop="repairResult">
            <el-input type="textarea" v-model="addForm.repairResult" :rows="4" placeholder="请输入检修结果"></el-input>
          </el-form-item>
          <el-form-item label="检修人员" prop="repairMan">
            <el-input v-model="addForm.repairMan" placeholder="请输入检修人员" maxlength="4"></el-input>
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
      <el-dialog center @open="show" @close="close" top="40px" title="编辑检修记录" :visible.sync="dialogEdit" :modal-append-to-body="false">
        <el-form :rules="rules" ref="editForm" :model="edit" size="small" :label-width="formLabelWidth">
          <!-- <el-form-item label="学校名称" prop="schoolName">
            <el-input v-model="edit.schoolName" maxlength="20" :disabled="true"></el-input>
          </el-form-item> -->
          <el-form-item label="故障时间" prop="faultTime">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="edit.faultTime"
              type="datetime"
              placeholder="选择故障时间">
            </el-date-picker>   
          </el-form-item>
          <el-form-item label="检修时间" prop="repairTime">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="edit.repairTime"
              type="datetime"
              placeholder="选择检修时间">
            </el-date-picker>               
          </el-form-item>
          <el-form-item label="故障描述" prop="faultDescription">
            <el-input type="textarea" v-model="edit.faultDescription" :rows="4" placeholder="请输入故障描述"></el-input>
          </el-form-item>
          <el-form-item label="检修结果" prop="repairResult">
            <el-input type="textarea" v-model="edit.repairResult" :rows="4" placeholder="请输入检修结果"></el-input>
          </el-form-item>
          <el-form-item label="检修人员" prop="repairMan">
            <el-input v-model="edit.repairMan" placeholder="请输入检修人员" maxlength="4"></el-input>
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
import { showRepairList, addDeviceRepair, updateDeviceRepair, deleteDeviceRepair } from "@/api/device";
import region from "@/components/region";
export default {
  name: "record",
  components: {
    region
  },
  data() {
    return {
      loading: false,
      dialogAdd: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      //默认参数
      query: {
        schoolId: 0,
        page: 1,
        pageSize: 10
      },
      //学校名称
      schoolList: [],
      schoolListInner: [],
      rules: {
        schoolId: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        faultTime: [
          { required: true, message: "请选择故障时间", trigger: "blur" }
        ],
        repairTime: [
          { required: true, message: "请选择检修时间", trigger: "blur" }
        ],
        faultDescription: [
          { required: true, message: "请输入故障描述", trigger: "blur" }
        ],
        repairResult: [
          { required: true, message: "请输入检修结果", trigger: "blur" }
        ],
        repairMan: [
          { required: true, message: "请输入检修人员", trigger: "blur" }
        ]
      },
      addForm: {},
      edit: {},
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
    show() {},
    close() {},
    search() {},
    handleRegion() {},
    handleRegionInner(list) {
      if (Array.isArray(list)) {
        this.schoolListInner = list;
      }
    },    
    handleSchool() {},
    handleEdit(row) {
      this.dialogEdit = true;
      this.$nextTick(function() {
        this.edit = Object.assign({}, row);
      });      
    },
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        that.deleteTable(row.repairId);
      }).catch(error => {
        return false;
      });      
    },
    addsForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnloading = true;
          this.addTable(this.addForm);
        }else {
          return false;
        }
      });
    },
    editorForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnloading = true;
          let { address, deviceNo, schoolName, postTime, deviceId, ...z } = this.edit;
          this.updateTable(z);
        }else {
          return false;
        }
      });
    },
    //显示检修列表
    createTable() {
      showRepairList(this.query).then(res => {
         if (res.errorCode === 0) {
           this.tableData = res.data;
         }
      });
    },
    //新增检修记录
    addTable(params = {}) {
      addDeviceRepair(params).then(res => {
        if (res.errorCode === 0) {
          this.dialogAdd = false;
          this.btnloading = false;
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable(this.query);
        }else {
          this.btnloading = false;
          this.$message({ message: `${res.errorMsg}`, type: "error" });
        }
      })
    },
    //编辑检修记录
    updateTable(params = {}) {
      updateDeviceRepair(params).then(res => {
        if (res.errorCode === 0) {
          this.dialogEdit = false;
          this.btnloading = false;
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable(this.query);
        }
      });
    },
    //删除检修记录
    deleteTable(repairId) {
      deleteDeviceRepair({ repairId }).then(res => {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.createTable(this.query);
      })
    }
  },
  mounted() {
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
</style>
