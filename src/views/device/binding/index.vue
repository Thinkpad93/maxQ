<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">

                <region @change="handleRegion"></region>

              </el-form-item>
              <el-form-item label="学校名称">
                <el-select v-model="schoolId" clearable filterable placeholder="选择学校" @change="handleSchool">
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
                <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增绑定</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
     <!-- 表格数据 -->
     <template>
       <el-table :data="tableData" style="width: 100%" border stripe :height="tableHeight" size="mini" v-loading="loading">
         <el-table-column :resizable="false" label="设备ID" prop="deviceId" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true">
         </el-table-column>
         <el-table-column :resizable="false" label="设备编号" prop="batch" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="MAC地址" prop="mac" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="安装位置" prop="address" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="安装时间" prop="postTime"></el-table-column>
         <el-table-column :resizable="false" label="设备管理员" prop="manager"></el-table-column>
         <el-table-column :resizable="false" label="联系电话" prop="phone"></el-table-column>
         <el-table-column :resizable="false" label="操作" width="200">
           <template slot-scope="scope">
             <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
             <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
     </template>    
    <!-- 分页 -->
    <template>
      <div class="pagination" v-if="tableData.length">   
          <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-size="query.page_size"
            layout="total, prev, pager, next, jumper"
            :total="tableData[0].totalCount">
          </el-pagination> 
      </div>   
    </template>    
    <!-- 新增 -->
    <template>
       <el-dialog width="50%" center top="40px" title="新增设备绑定" :visible.sync="dialogAdd" :modal-append-to-body="false">
          <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
            <el-form-item label="区域选择" prop="area">

              <region @change="handleRegion"></region>

            </el-form-item>
            <el-form-item label="学校名称" prop="schoolId">
               <el-select v-model="addForm.schoolId" clearable filterable placeholder="选择学校">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option> 
                </el-select>              

            </el-form-item>
            <el-form-item label="安装位置" prop="address">
              <el-input v-model="addForm.address" placeholder="请输入安装位置" maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="设备批次" prop="batch">
              <el-input v-model="addForm.batch" placeholder="请输入设备批次" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="设备序号" prop="serial">
              <el-input v-model="addForm.serial" placeholder="请选择设备序号" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="冠名企业" prop="labelIds">
              <el-select v-model="addForm.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择冠名企业" @change="changeTag">
                <el-option
                  v-for="item in labelsList"
                  :key="item.labelId"
                  :label="item.name"
                  :value="item.labelId">
                </el-option>
              </el-select>              
            </el-form-item>
            <el-form-item label="MAC地址" prop="mac">
              <el-input v-model="addForm.mac" placeholder="请输入MAC地址"></el-input>
            </el-form-item>
            <el-form-item label="设备管理员" prop="manager">
              <el-input v-model="addForm.manager" placeholder="请输入设备管理员" maxlength="4"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="addForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-row style="text-align:center">
                <el-button size="mini" @click="dialogAdd = false">取消</el-button>
                <el-button :loading="btnloading" size="mini" type="primary" @click="addsForm('addForm')">绑定</el-button>
            </el-row>            
          </el-form>
       </el-dialog>      
    </template> 
     <!-- 编辑 -->
     <template>
       <el-dialog center top="40px" title="正在编辑" :visible.sync="dialogEdit" :modal-append-to-body="false" @open="show" @close="close">
         <el-form :rules="rules" ref="editForm" :model="edit" size="small" :label-width="formLabelWidth">
           <el-form-item label="学校名称">
             <el-input v-model="edit.schoolName" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="安装位置" prop="address">
             <el-input v-model="edit.address"></el-input>
           </el-form-item>
            <el-form-item label="设备批次" prop="batch">
              <el-input v-model="edit.batch" placeholder="请输入设备批次" :disabled="true"></el-input>
            </el-form-item>    
            <el-form-item label="设备序号" prop="serial">
              <el-input v-model="edit.serial" placeholder="请选择设备序号" :disabled="true" maxlength="30"></el-input>
            </el-form-item>  
            <!-- 如果存在冠名企业 -->  
            <template>
              <el-form-item label="冠名企业" prop="labelIds">
                <el-select v-model="edit.labelIds" value-key="labelId" multiple placeholder="请选择冠名企业" @change="changeTag">
                  <el-option
                    v-for="item in labelsList"
                    :key="item.labelId"
                    :label="item.name"
                    :value="item.labelId">
                  </el-option>
                </el-select>               
              </el-form-item>
            </template>
           <el-form-item label="MAC地址" prop="mac">
             <el-input v-model="edit.mac" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="设备管理员" prop="manager">
             <el-input v-model="edit.manager" maxlength="4"></el-input>
           </el-form-item>
           <el-form-item label="联系电话" prop="phone">
             <el-input v-model="edit.phone"></el-input>
           </el-form-item>
           <el-row style="text-align:center">
              <el-button size="mini" @click="dialogEdit = false">取消</el-button>
              <el-button :loading="btnloading" size="mini" type="primary" @click="editorForm('editForm')">确定</el-button>
           </el-row>
         </el-form>
       </el-dialog>
     </template> 
  </div>  
</template>
<script>
import {
  addDeviceBind,
  updateDeviceBind,
  deleteDeviceBind,
  showDeviceList
} from "@/api/device";
import { queryLabel } from "@/api/school";
import Mixin from "../mixin/binding";
import region from "@/components/region";


export default {
  name: "binding",
  mixins: [Mixin],
  components: {
    region
  },
  data() {
    return {
      loading: false,
      dialogAdd: false,
      dialogView: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      form: {},
      addForm: {
        labelIds: []
      },
      edit: {
        labelIds: []
      },
      //默认参数
      query: {
        schoolId: 0,
        page: 1,
        pageSize: 10
      },
      schoolId: null,
      //学校名称
      schoolList: [],
      //请求的数据
      labelsList: [],
      tableData: [],
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    //搜索
    search() {
      if (this.schoolId === null) {
        this.$message({ message: '请选择学校名称', type: 'warning'});
      }else {
        this.createTable();
      }
    },
    handleRegion(list) {
      if (Array.isArray(list)) {
        this.schoolList = list;
      }
    },
    changeTag(value) {
      //console.log(value);
    },
    handleSchool(value) {
      this.query.schoolId = value;
    },
    //pageSize 改变时会触发
    handleSizeChange(size) {
      //this.query.page_size = size;
    },
    //currentPage 改变时会触发
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.createTable();
    },
    handleEdit(row) {
      this.dialogEdit = true;
      if (row.labelIds === null) {
        row.labelIds = [];
      }
      this.$nextTick(function() {
        this.edit = Object.assign({}, row);
      });
    },
    handleSelect() {},
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        that.deleteTable(row.deviceId);
      });
    },
    addsForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addTable(this.addForm);
        } else {
          return false;
        }
      });
    },
    editorForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { postTime, schoolName, totalCount, ...row } = this.edit;
          console.log(row);
          console.log("==============================");
          this.updateTable(row);
        } else {
          return false;
        }
      });
    },  
    //查询标签
    getLabel() {
      queryLabel({ queryType: 3 }).then(res => {
        if (res.errorCode === 0) {
          this.labelsList = res.data;
        }
      });
    },
    //显示设备列表
    createTable() {
      this.loading = true;
      showDeviceList(this.query)
        .then(res => {
          if (res.errorCode === 0) {
            this.loading = false;
            this.tableData = res.data;
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    //新增设备绑定
    addTable(params = {}) {
      addDeviceBind(params).then(res => {
        if (res.errorCode === 0) {
          this.dialogAdd = false;
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable({
            schoolId: 0,
            page: 1,
            pageSize: 10
          });
        }
      });
    },
    //编辑设备绑定
    updateTable(params = {}) {
      updateDeviceBind(params).then(res => {
        this.dialogEdit = false;
        if (res.errorCode === 0) {
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable({
            schoolId: 0,
            page: 1,
            pageSize: 10
          });          
        }
      });
    },
    //删除设备绑定
    deleteTable(deviceId) {
      deleteDeviceBind({ deviceId }).then(res => {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        if (res.errorCode === 0) {
          this.createTable({
            schoolId: 0,
            page: 1,
            pageSize: 10
          });
        }
      });
    }
  },
  mounted() {
    this.getLabel();
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
</style>
