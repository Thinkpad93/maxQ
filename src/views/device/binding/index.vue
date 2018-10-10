<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <qx-region @last="queryRegion"></qx-region>
              </el-form-item>
              <el-form-item label="学校名称">
                <el-select v-model="schoolId" clearable filterable placeholder="选择学校" @change="handleSchool" @clear="handleClearSchool">
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
       <el-table :data="tableData" style="width: 100%" stripe :height="tableHeight" size="small">
         <el-table-column :resizable="false" label="设备ID" prop="deviceId" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true">
           <template slot-scope="scope">
             <span style="color:#409EFF">{{ scope.row.schoolName }}</span>
           </template>
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
      <qx-pagination 
        @page-change="pageChange" 
        @page-size="pageSize" 
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>     
    <!-- 新增 -->
    <template>
       <el-dialog width="50%" center top="40px" title="新增设备绑定" :visible.sync="dialogAdd">
          <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
            <el-form-item label="区域选择" prop="regionId">
              <qx-region @last="queryRegion" v-model="addForm.regionId"></qx-region>
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
              <el-select v-model="addForm.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择冠名企业">
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
       <el-dialog center top="40px" title="正在编辑" :visible.sync="dialogEdit" :modal-append-to-body="false">
         <el-form :rules="rules" ref="editForm" :model="edit" size="small" :label-width="formLabelWidth">
           <el-form-item label="区域">
             <el-input v-model="selected" :disabled="true"></el-input>
           </el-form-item>           
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
                <el-select v-model="edit.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择冠名企业">
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
import service from "@/api";
import pagination from "@/components/pagination";
import region from "@/components/region";
import { isMac, isPhone } from "@/utils/validator";

export default {
  name: "binding",
  components: {
    "qx-region": region,
    "qx-pagination": pagination
  },
  data() {
    return {
      dialogAdd: false,
      dialogView: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      selected: "",
      form: {},
      rules: {
        regionId: [
          {
            required: true,
            message: "请选择区域",
            trigger: "blur"
          }
        ],
        schoolId: [
          {
            required: true,
            message: "请选择学校名称",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入安装位置",
            trigger: "blur"
          }
        ],
        batch: [
          {
            required: true,
            message: "请输入设备批次",
            trigger: "blur"
          }
        ],
        serial: [
          {
            required: true,
            message: "请选择设备序号",
            trigger: "blur"
          }
        ],
        mac: [
          {
            required: true,
            message: "请输入MAC地址",
            trigger: "blur"
          },
          {
            required: true,
            validator: isMac,
            trigger: "blur"
          }
        ],
        manager: [
          {
            required: true,
            message: "请输入设备管理员",
            trigger: "blur"
          },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ]
      },
      addForm: {
        regionId: [],
        labelIds: []
      },
      edit: {
        labelIds: []
      },
      //默认参数
      query: {
        schoolId: 0,
        page: 1,
        pageSize: 20
      },
      totalCount: 0,
      //分页
      schoolId: null,
      //学校名称
      schoolList: [],
      //请求的数据
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
      this.showDeviceList();
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.showDeviceList();
    },
    //搜索
    search() {
      let page = this.query.page;
      if (this.schoolId === null) {
        this.$message({ message: "请选择学校名称", type: "warning" });
        return;
      }
      if (page > 1) {
        this.query.page = 1;
      }
      this.showDeviceList();
    },
    handleSchool(value) {
      this.query.schoolId = value;
    },
    handleClearSchool() {
      this.query.schoolId = 0;
    },
    handleEdit(row) {
      this.dialogEdit = true;
      if (row.labelIds === null) {
        row.labelIds = [];
      }
      this.edit = { ...row };
      this.queryProvinceCityRegionBySchoolId(row.schoolId);
    },
    handleSelect() {},
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteDeviceBind(row.deviceId);
        })
        .catch(error => {
          return false;
        });
    },
    addsForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { regionId, ...args } = this.addForm;
          this.addDeviceBind(args);
        } else {
          return false;
        }
      });
    },
    editorForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnloading = true;
          let { postTime, schoolName, totalCount, ...args } = this.edit;
          this.updateDeviceBind(args);
        } else {
          return false;
        }
      });
    },
    //加载学校数据
    async queryRegion(value) {
      this.addForm.regionId = value;
      let last = value[value.length - 1];
      let res = await service.queryRegion({ queryId: last, queryType: 3 });
      if (res.errorCode === 0) {
        this.schoolList = res.data;
      } else {
        return false;
      }
    },
    //根据学校Id查询区域
    async queryProvinceCityRegionBySchoolId(schoolId) {
      let res = await service.queryProvinceCityRegionBySchoolId({ schoolId });
      if (res.errorCode === 0) {
        let { province, city, region } = res.data[0];
        this.selected = `${province} / ${city} / ${region}`;
      }
    },
    //查询标签
    async queryLabel() {
      let res = await service.queryLabel({ queryType: 3 });
      if (res.errorCode === 0) {
        this.labelsList = res.data;
      }
    },
    //显示设备列表
    async showDeviceList() {
      let res = await service.showDeviceList(this.query);
      if (res.errorCode === 0) {
        let data = res.data.data;
        if (!Array.isArray(data)) {
          data = [];
        }
        this.totalCount = res.data.totalCount;
        this.tableData = data;
      } else if (res.errorCode === 1) {
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
      }
    },
    //新增设备绑定
    async addDeviceBind(params = {}) {
      let res = await service.addDeviceBind(params);
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.dialogAdd = false;
        this.showDeviceList();
      } else if (res.errorCode === 1) {
        //MAC码已存在
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
        return false;
      }
    },
    //编辑设备绑定
    async updateDeviceBind(params = {}) {
      let res = await service.updateDeviceBind(params);
      if (res.errorCode === 0) {
        this.dialogEdit = false;
        this.btnloading = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.showDeviceList();
      }
    },
    //删除设备绑定
    async deleteDeviceBind(deviceId) {
      let res = await service.deleteDeviceBind({ deviceId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.showDeviceList();
      }
    }
  },
  mounted() {
    this.queryLabel();
    this.showDeviceList();
  }
};
</script>
<style lang="less" scoped>
</style>
