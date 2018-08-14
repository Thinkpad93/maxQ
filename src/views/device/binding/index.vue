<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <!-- <el-cascader 
                  :options="region" 
                  :props="props" 
                  @active-item-change="handleRegion"></el-cascader> -->
                  <el-select v-model="area" placeholder="请选择省">
                    <el-option
                      v-for="item in schoolName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>                    
                  </el-select>    
                  <el-select v-model="area" placeholder="请选择市">
                    <el-option
                      v-for="item in schoolName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>                    
                  </el-select>  
                  <el-select v-model="area" placeholder="请选择区">
                    <el-option
                      v-for="item in schoolName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>                    
                  </el-select>                                                                                   
              </el-form-item>
              <el-form-item label="学校名称">
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
           <!-- <template slot-scope="scope">
             <a href="javascript:;" style="color:#409EFF">{{ scope.row.schoolName }}</a>
             <el-dialog center title="查看详情" :visible.sync="dialogView">
               <el-row :gutter="10" v-if="Object.keys(edit).length">
                 <el-col :span="6"><p class="">区域： 广东省广州市天河区</p></el-col>
                 <el-col :span="6"><p class="">学校名称：{{ edit.schoolName }}</p></el-col>
                 <el-col :span="6"><p class="">安装位置：{{ edit.address }}</p></el-col>
                 <el-col :span="6"><p class="">学校编号：001</p></el-col>
                 <el-col :span="6"><p class="">设备批次：20180508V1.0</p></el-col>
                 <el-col :span="6"><p class="">设备序号：001</p></el-col>
                 <el-col :span="6"><p class="">冠名企业：01</p></el-col>
                 <el-col :span="6"><p class="">MAC地址：{{ edit.mac }}</p></el-col>
                 <el-col :span="6"><p class="">安装日期：{{ edit.postTime }}</p></el-col>
                 <el-col :span="6"><p class="">设备管理员：{{ edit.manager }}</p></el-col>
                 <el-col :span="6"><p class="">联系电话：{{ edit.phone }}</p></el-col>
               </el-row>
               <el-row v-else><p>发生了点错误~</p></el-row>
             </el-dialog>
           </template> -->
         </el-table-column>
         <el-table-column :resizable="false" label="设备编号" prop="deviceNo" :show-overflow-tooltip="true"></el-table-column>
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
            <!-- <el-form-item label="区域选择" prop="area">
              <el-row :gutter="5">
                <el-col :span="7">
                  <el-select v-model="addForm.provinceText">
                    <el-option v-for="item in province" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>                  
                </el-col>
                <el-col :span="7">
                  <el-select v-model="addForm.city">
                    <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="addForm.area">
                    <el-option v-for="item in area" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>                  
                </el-col>
              </el-row>
            </el-form-item> -->
            <el-form-item label="学校名称" prop="schoolId">
              <el-input v-model="addForm.schoolId" placeholder="请输入学校名称" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="安装位置" prop="address">
              <el-input v-model="addForm.address" placeholder="请输入安装位置" maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="设备批次" prop="batch">
              <el-input v-model="addForm.batch" placeholder="请输入设备批次" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="设备序号" prop="serial">
              <el-input v-model="addForm.serial" placeholder="请选择设备序号" maxlength="30"></el-input>
              <!-- <el-select v-model="addForm.serial" placeholder="请选择设备序号">
                <el-option
                  v-for="item in schoolName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>            
              </el-select>               -->
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
import { queryLabel } from "@/api/label";
import { queryRegion } from "@/api/school";
import Mixin from "../mixin/binding";

export default {
  name: "binding",
  mixins: [Mixin],
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
      restaurants: [],
      state1: "",
      area: "",
      //学校名称
      schoolName: [
        { value: "1", label: "棠东小学" },
        { value: "2", label: "棠下一小" },
        { value: "3", label: "东风中小学" },
        { value: "4", label: "棠下小学" }
      ],
      //请求的数据
      labelsList: [],

      tableData: [],
      editrules: {}
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
    search() {},
    handleRegion(val) {},
    changeTag(value) {
      //console.log(value);
    },
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" }
      ];
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
          console.log(this.addForm);
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
          this.updateTable(row);
        } else {
          return false;
        }
      });
    },
    //查询区域
    getRegion() {
      queryRegion({ queryId: 0, queryType: 0 }).then(res => {
        console.log(res);
      });
    },
    //查询标签
    getLabel() {
      queryLabel({ queryType: 3 }).then(res => {
        if (res.data.errorCode === 0) {
          this.labelsList = res.data.data;
        }
      });
    },
    //显示设备列表
    createTable() {
      this.loading = true;
      showDeviceList(this.query)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.edit = {};
            this.loading = false;
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    //新增设备绑定
    addTable(params = {}) {
      addDeviceBind(params).then(res => {
        if (res.data.errorCode === 0) {
          this.dialogAdd = false;
          this.$message({ message: `${res.data.errorMsg}`, type: "success" });
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
        if (res.data.errorCode === 0) {
          this.$message({ message: `${res.data.errorMsg}`, type: "success" });
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
        console.log(res);
        if (res.data.errorCode === 0) {
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
    this.getRegion();
    this.getLabel();
    this.createTable();
    this.restaurants = this.loadAll();
  }
};
</script>
<style lang="less" scoped>
</style>
