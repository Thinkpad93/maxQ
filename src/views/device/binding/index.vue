<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <qx-region-t @regionChange="handleRegionChange" :scopeType.sync="scopeType"></qx-region-t>
              </el-form-item>
              <el-form-item label="学校名称">
                <el-input v-model="query.schoolName" placeholder="请输入学校名称"></el-input>
              </el-form-item>                
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
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
      <div class="qx-pagination" v-if="totalCount">
        <el-pagination
          background
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </template>     
    <!-- 新增 or 编辑 -->
    <template>
      <el-dialog top="40px" :visible.sync="dialogFormVisible" @close="handleDialogClose">
        <span slot="title" class="dialog-title">{{ isShow ? '新增设备': '编辑设备' }}</span>
        <el-form :rules="rules" ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
          <template v-if="isShow">
            <el-form-item label="区域选择" prop="regionId">
              <qx-region @last="queryRegion" v-model="form.regionId"></qx-region>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="区域选择">
              <el-input v-model="selected" disabled></el-input>
            </el-form-item>
          </template>
          <template v-if="isShow">
            <el-form-item label="学校名称" prop="schoolId">
              <el-select v-model="form.schoolId" clearable placeholder="选择学校">
                <el-option
                  v-for="item in schoolList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>               
              </el-select>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="学校名称">
              <el-input v-model="form.schoolName" disabled></el-input>
            </el-form-item>
          </template>
          <el-form-item label="安装位置" prop="address">
            <el-input v-model="form.address" placeholder="请输入安装位置" maxlength="40"></el-input>
          </el-form-item>
          <el-form-item label="设备批次" prop="batch">
            <el-input v-model="form.batch" placeholder="请输入设备批次" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="设备序号" prop="serial">
            <el-input v-model="form.serial" placeholder="请选择设备序号" maxlength="30"></el-input>
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
          <el-form-item label="MAC地址" prop="mac">
            <el-input v-model="form.mac" placeholder="请输入MAC地址"></el-input>
          </el-form-item>  
          <el-form-item label="设备管理员" prop="manager">
            <el-input v-model="form.manager" placeholder="请输入设备管理员" maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>                          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm('form')">确定</el-button>
        </span>          
      </el-dialog>
    </template>
  </div>  
</template>
<script>
import service from "@/api";
import region from "@/components/region";
import regiont from "@/components/qxregion";
import { isMac, isPhone } from "@/utils/validator";
import { mapGetters } from "vuex";

export default {
  name: "binding",
  components: {
    "qx-region": region,
    "qx-region-t": regiont
  },
  data() {
    return {
      dialogFormVisible: false,
      isShow: true,
      formLabelWidth: "100px",
      selected: "",
      form: {
        regionId: [],
        labelIds: []
      },
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
      //默认参数
      query: {
        schoolName: "",
        scopeType: this.$store.getters.scopeType,
        scopeId: this.$store.getters.scopeId,
        page: 1,
        pageSize: 20
      },
      //分页
      schoolId: null,
      //学校名称
      schoolList: [],
      //请求的数据
      labelsList: [],
      tableData: [],
      totalCount: 0
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    },
    ...mapGetters(["scopeType"])
  },
  methods: {
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.showDeviceList();
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.showDeviceList();
    },
    //搜索
    handleSearch() {
      this.showDeviceList();
    },
    handleRegionChange(queryId, queryType) {
      this.query.scopeId = queryId;
      this.query.scopeType = queryType;
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    handleAdd() {
      this.isShow = true;
      this.dialogFormVisible = true;
      this.form = {
        regionId: [],
        labelIds: []
      };
    },
    handleEdit(row) {
      this.isShow = false;
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.queryProvinceCityRegionBySchoolId(row.schoolId);
    },
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isShow) {
            let { regionId, ...args } = this.form;
            this.addDeviceBind(args);
          } else {
            let { postTime, schoolName, ...args } = this.form;
            this.updateDeviceBind(args);
          }
        }
      });
    },
    //加载学校数据
    async queryRegion(value) {
      this.form.regionId = value;
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
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      } else if (res.errorCode === 1) {
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
      }
    },
    //新增设备绑定
    async addDeviceBind(params = {}) {
      let res = await service.addDeviceBind(params);
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.showDeviceList();
      } else if (res.errorCode === -1) {
        //MAC码已存在
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
        return false;
      }
    },
    //编辑设备绑定
    async updateDeviceBind(params = {}) {
      let res = await service.updateDeviceBind(params);
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
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
.dialog-title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
</style>
