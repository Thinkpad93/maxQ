<template>
   <div class="page">
     <!-- 表单 -->
     <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <!-- <el-form-item label="区域选择">
                <qx-region @last="lastChange"></qx-region>
              </el-form-item>  
              <el-form-item label="学校名称">
                <el-select v-model="query.schoolId" clearable filterable placeholder="选择学校" @change="handleSchool">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option> 
                </el-select>
              </el-form-item>    -->
              <qx-region-t @regionChange="handleRegionChange"></qx-region-t>
              <el-form-item label="学校名称">
                <el-input v-model.trim="query.schoolName" placeholder="请输入学校名称" maxlength="40"></el-input>
              </el-form-item>  
              <el-form-item label="账号名称">
                <el-input v-model.trim="query.userName" placeholder="请输入账号" maxlength="40"></el-input>
              </el-form-item>                                       
              <el-form-item>
                <!-- <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button> -->
                <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增账号</el-button>
              </el-form-item>                          
            </el-form>
          </div>
        </el-col>
      </el-row> 
     </template> 
     <!-- 表格数据 -->
     <template>
       <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="small">
         <el-table-column label="用户ID" prop="accountId" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="账号" prop="userName" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="用户角色" prop="roleName" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="负责人" prop="masterName" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="负责人电话" prop="masterPhone" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="所属学校" prop="name" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="添加时间" prop="postTime" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column label="账号状态" prop="status" :show-overflow-tooltip="true">
           <template slot-scope="scope">
             <el-switch 
              v-model="scope.row.status" 
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66" 
              inactive-color="#ff4949" 
              @change="handleSwitch(scope.row)"></el-switch>
           </template>
         </el-table-column>
         <el-table-column label="操作" prop="" :show-overflow-tooltip="true">
           <template slot-scope="scope">
             <el-button size="mini" type="primary" @click="handleReset(scope.row)">重置密码</el-button>
           </template>
         </el-table-column>
       </el-table>
     </template> 
     <!-- 新增账号 -->
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
     <template>
       <el-dialog center top="40px" title="新增账号" :visible.sync="dialogAdd">
         <el-form :rules="rules" ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth" label-position="left">
           <el-form-item label="账号" prop="userName">
             <el-input v-model="form.userName" placeholder="请输入账号名称"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
             <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="checkPass">
             <el-input type="password" v-model="form.checkPass" placeholder="请确认密码"></el-input>
           </el-form-item>
           <el-form-item label="用户角色" prop="roleId">
             <el-select v-model="form.roleId" placeholder="选择用户角色">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>                
             </el-select>
           </el-form-item>
           <el-form-item label="账户类型" prop="type">
             <el-select v-model="form.type" placeholder="选择账户类型" @change="handleType">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>               
             </el-select>
           </el-form-item>  
           <template v-if="form.type === 1">
              <el-form-item label="区域选择" prop="regionId">
                <qx-region @last="lastChange" v-model="form.regionId"></qx-region>
              </el-form-item>
           </template>
           <template v-else>
             <qx-region-t :clear="false" @regionChange="handleRegionChanges"></qx-region-t>         
           </template>
           <template v-if="form.type === 1">
            <el-form-item label="对应学校" prop="schoolId">
              <el-select v-model="form.schoolId" placeholder="选择学校" @change="handleSchool" :disabled="disabled === 1">
                <el-option
                  v-for="item in schoolList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option> 
              </el-select>
            </el-form-item>
           </template>
           <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('form')">保存</el-button>             
           </el-row>
         </el-form>
       </el-dialog>
     </template>
     <!-- 重置密码 -->
     <template>
       <el-dialog center top="40px" title="重置密码" :visible.sync="dialogReset">
         <el-form :rules="rules2" ref="reset" :model="reset" status-icon size="small" :label-width="formLabelWidth" label-position="left">
           <el-form-item label="学校名称" prop="name">
             <el-input v-model="reset.name" disabled></el-input>
           </el-form-item>
           <el-form-item label="账号" prop="userName">
             <el-input v-model="reset.userName" disabled></el-input>
           </el-form-item>
           <el-form-item label="输入新密码" prop="password">
             <el-input type="password" v-model="reset.password" placeholder="输入新密码"></el-input>
           </el-form-item>
           <el-form-item label="确认新密码" prop="checkPass">
             <el-input type="password" v-model="reset.checkPass" placeholder="确认新密码"></el-input>
           </el-form-item>
           <el-row style="text-align:center">
            <el-button size="mini" @click="dialogReset = false">取消</el-button>
            <el-button size="mini" type="primary" @click="resetForm('reset')">保存</el-button>             
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
import regiont from "@/components/qxregion";
import typeList from "@/mixins/typeList";
export default {
  name: "account",
  mixins: [typeList],
  components: {
    "qx-region": region,
    "qx-region-t": regiont,
    "qx-pagination": pagination
  },
  data() {
    let checkUserName = async (rule, value, callback) => {
      let res = await service.queryAccountName({ userName: value });
      if (res.errorCode === 0) {
        callback();
      } else {
        callback(new Error(`${res.errorMsg}`));
      }
    };
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== (this.form.password || this.reset.password)) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    return {
      dialogAdd: false,
      dialogReset: false,
      formLabelWidth: "100px",
      disabled: 0,
      query: {
        //regionId: "regionId",
        queryId: 0,
        queryType: 0,
        schoolName: "",
        userName: "",
        page: 1,
        pageSize: 20
      },
      form: {
        queryType: null,
        queryId: null,
        password: "",
        regionId: null
      },
      reset: {
        accountId: null,
        name: "",
        password: ""
      },
      totalCount: 0, //分页总数
      rules: {
        userName: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { validator: checkUserName, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: checkPass, trigger: "blur" }],
        roleId: [{ required: true, message: "选择用户角色", trigger: "blur" }],
        type: [{ required: true, message: "选择用户类型", trigger: "blur" }],
        regionId: [
          { required: true, message: "选择对应区域", trigger: "blur" }
        ],
        schoolId: [{ required: true, message: "选择学校", trigger: "blur" }]
      },
      rules2: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, validator: checkPass, trigger: "blur" }]
      },
      schoolList: [],
      roleList: [],
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
      this.queryFuzzy();
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.queryFuzzy();
    },
    // search() {
    //   this.queryFuzzy(this.query);
    // },
    handleSearch() {
      this.queryFuzzy(this.query);
    },
    handleRegionChange(queryId, queryType) {
      if (queryId || queryType) {
        this.query.queryId = queryId;
        this.query.queryType = queryType;
      }
    },
    handleRegionChanges(queryId, queryType) {
      this.form.queryId = queryId;
      this.form.queryType = queryType;
      this.form.regionId = queryId;
      this.queryRegion(queryId, queryType);
    },
    handleType(value) {
      if (value !== 1) {
        this.disabled = 1;
      } else {
        this.disabled = 0;
      }
    },
    handleSchool(value) {
      this.form.schoolId = value;
    },
    handleSwitch(row) {
      let { status, accountId } = row;
      this.changeStatus({ accountId, status: status ? 1 : 0 });
    },
    handleReset(row) {
      let { userName, name, accountId } = row;
      this.dialogReset = true;
      this.reset = Object.assign({}, { userName, name, accountId });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //this.$refs["region"].clearValidate();
          let { regionId, queryId, queryType, checkPass, ...args } = this.form;
          if (Array.isArray(regionId)) {
            queryId = regionId[regionId.length - 1]; //区域ID
            queryType = 2;
          }
          let obj = Object.assign({}, args, { queryId, queryType });
          this.addAccount(obj);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { accountId, password, userName } = this.reset;
          this.resetPassword({ accountId, password, userName });
        } else {
          return false;
        }
      });
    },
    //加载学校数据
    async queryRegion(queryId, queryType) {
      if (queryType === 2) {
        queryType = 3;
        let res = await service.queryRegion({ queryId, queryType });
        if (res.errorCode === 0) {
          this.schoolList = res.data;
        } else {
          return false;
        }
      }
    },
    async lastChange(value) {
      this.form.regionId = value;
      let last = value[value.length - 1];
      let res = await service.queryRegion({ queryId: last, queryType: 3 });
      if (res.errorCode === 0) {
        this.schoolList = res.data;
      } else {
        return false;
      }
    },
    //检查用户名是否重复
    async queryAccountName(params = {}) {
      let res = await service.queryAccountName(params);
    },
    //用户角色
    async queryRoleName(params = {}) {
      let res = await service.queryRoleName(params);
      if (res.errorCode === 0) {
        this.roleList = res.data;
      }
    },
    //新增用户账号
    async addAccount(params = {}) {
      let res = await service.addAccount(params);
      if (res.errorCode === 0) {
        this.dialogAdd = false;
        this.$refs.form.resetFields();
        this.queryFuzzy();
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    },
    //重置密码
    async resetPassword(params = {}) {
      let res = await service.resetPassword(params);
      if (res.errorCode === 0) {
        this.dialogReset = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    },
    //修改账号状态
    async changeStatus({ accountId, status }) {
      let res = await service.changeStatus({ accountId, status });
      if (res.errorCode === 0) {
        this.queryFuzzy();
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    },
    //用户列表
    async queryFuzzy() {
      let res = await service.queryFuzzy(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    }
  },
  mounted() {
    this.queryFuzzy();
    this.queryRoleName();
  }
};
</script>
<style lang="less" scoped>
</style>
