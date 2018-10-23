<template>
   <div class="page">
    <!-- 表单 -->
    <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                        <el-form-item label="栏目模板">
                            <el-input v-model="query.templateName" placeholder="请输入栏目模板" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                            <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增栏目模板</el-button>
                        </el-form-item>   
                    </el-form>
                </div>
            </el-col>
        </el-row> 
    </template> 
    <!-- 表格数据 -->
    <template>
        <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
            <el-table-column label="栏目模板ID" prop="templateId" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="栏目模板" prop="name" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span style="color:#409EFF">{{ scope.row.name }}</span>
                </template>                    
            </el-table-column>
            <el-table-column label="栏目模板描述" prop="description" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作" width="500">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleDetail(scope.row)">新增模板详细</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改模板详细</el-button>
                    <!-- 默认模板不能删除 -->
                    <template v-if="scope.row.type">
                        <el-button :disabled="scope.row.type === 1" size="mini" type="info">默认模板</el-button>   
                    </template>   
                    <template v-else>
                        <el-button size="mini" type="primary" @click="setChannelDefautl(scope.row)">设置默认模板</el-button>
                    </template>
                    <el-button size="mini" type="danger" @click="handleDel(scope.$index,scope.row)" v-if="!scope.row.type">删除</el-button> 
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
    <!-- 新增栏目模板 -->
    <template>
      <el-dialog center top="40px" title="新增栏目模板" :visible.sync="dialogAdd">
        <el-form ref="tplform" :model="tplform" size="mini" :label-width="formLabelWidth" label-position="left">
          <el-form-item label="模板名称" prop="name" :rules="[
            { required: true, message: '请输入栏目模板名称', trigger: 'blur' }
          ]">
            <el-input v-model="tplform.name" placeholder="请输入模板名称"></el-input>
          </el-form-item>  
          <el-form-item label="模板描述" prop="description" :rules="[
            { required: true, message: '请输入栏目模板描述', trigger: 'blur' }
          ]">
            <el-input type="textarea" v-model="tplform.description" :rows="5" placeholder="请输入模板描述"></el-input>
          </el-form-item>                  
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button size="mini" type="primary" @click="addTemplate('tplform')">保存</el-button>
          </el-row>                                            
        </el-form> 
      </el-dialog>
    </template> 

    <!-- 新增栏目模板详细项 -->
    <template>
      <el-dialog width="70%" center top="40px" title="新增栏目模板详细项" :visible.sync="dialogDetail" @close="close">
        <el-form ref="tplDetailform" :model="tplDetailform" size="mini" :label-width="formLabelWidth" label-position="left">
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="栏目模板ID">
                <el-input v-model="tplDetailform.templateId" :disabled="true"></el-input>
              </el-form-item>  
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="播放时段" prop="playTime" :rules="[
            { required: true, message: '请选择播放时段', trigger: 'blur' }
          ]">
                <el-time-picker
                  style="width:100%;"
                  is-range
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                  v-model="tplDetailform.playTime"
                  size="mini"
                  :clearable="false"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>                           
              </el-form-item>  
            </el-col>
            <el-col :span="10">
              <el-form-item label="时间段选择" prop="validTime">
                <el-date-picker
                  :disabled="tplDetailform.validType === 0"
                  style="width:100%;"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  v-model="tplDetailform.validTime"
                  size="mini"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>                          
              </el-form-item>                 
            </el-col>
          </el-row>   
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="栏目名称" prop="channelId" :rules="[
            { required: true, message: '请选择栏目名称', trigger: 'blur' }
          ]">
                <el-select v-model="tplDetailform.channelId" placeholder="请选择" size="mini" @change="selectChannelName" style="width:100%;">
                  <el-option v-for="item in channelList" 
                    :key="item.channelId" 
                    :value="item.channelId"
                    :label="item.name">
                  </el-option>
                </el-select>                             
              </el-form-item>              
            </el-col>
            <el-col :span="10">
              <el-form-item label="播放优先级" prop="priority" :rules="[
            { required: true, message: '请选择播放优先级', trigger: 'blur' }
          ]">
                <el-select v-model="tplDetailform.priority" placeholder="请选择" size="mini" style="width:100%;">
                  <el-option 
                    v-for="item in priorityList" 
                    :key="item.value" 
                    :value="item.value"
                    :label="item.label">
                  </el-option>
                </el-select> 
              </el-form-item>               
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="栏目属性" prop="scrollType">
                <el-radio-group v-model="tplDetailform.scrollType">
                  <el-radio :label="0">非滚动</el-radio>
                  <el-radio :label="1">滚动</el-radio>
                </el-radio-group>
              </el-form-item>   
            </el-col>
            <el-col :span="10">
              <el-form-item label="栏目有效期" prop="validType">
                <el-radio-group v-model="tplDetailform.validType">
                  <el-radio :label="0">长期</el-radio>
                  <el-radio :label="1">按时段有效</el-radio>
                </el-radio-group>                            
              </el-form-item>               
            </el-col>
          </el-row>                             
          <el-form-item>
            <el-button @click="resetForm('tplDetailform')">重置</el-button>
            <el-button type="primary" @click="addTablerow('tplDetailform')">新增模板详细项</el-button>
          </el-form-item>                            
        </el-form>
        <div class="plac"></div> 
        <el-alert title="已新增的模板详细项" type="info" :closable="false"></el-alert>
        <el-table :data="tplAddData" style="width: 100%" :height="250" stripe size="mini">
          <el-table-column label="播放时段">
            <template slot-scope="scope">
              <p>{{ scope.row.playStartTime }} - {{ scope.row.playEndTime }}</p>                        
            </template>
          </el-table-column>  
          <el-table-column property="channelName" label="栏目名称">
            <template slot-scope="scope">
              <p>{{ scope.row.channelName }}</p>
            </template>
          </el-table-column>  
          <el-table-column property="scrollType" label="栏目属性">
            <template slot-scope="scope">
              <p v-if="scope.row.scrollType === 0">非滚动</p>
              <p v-else>滚动</p>                     
            </template>
          </el-table-column>
          <el-table-column property="priority" label="播放优先级">
            <template slot-scope="scope">
              <p>{{ scope.row.priority }}</p>                    
            </template>
          </el-table-column>
          <el-table-column property="validType" label="栏目有效期">
            <template slot-scope="scope">
              <p v-if="scope.row.validType === 0">长期</p>
              <p v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</p>
            </template>
          </el-table-column>                          
        </el-table>
      </el-dialog>  
    </template> 
    <!-- 编辑栏目模板详细项 -->
    <template>
      <el-dialog width="80%" title="编辑栏目模板详细项" center top="40px" :visible.sync="dialogEdit">
        <!-- <el-alert title="已有的模板详细项" type="success" :closable="false"></el-alert> -->
        <el-table :data="tplEditData"  style="width: 100%" :height="450" stripe size="mini">
          <el-table-column width="400" label="播放时段">
            <template slot-scope="scope">                       
              <template v-if="scope.row.show">
                <el-time-picker
                  is-range
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                  v-model="value4"
                  size="mini"
                  :clearable="false"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>                             
              </template>   
              <template v-else>
                <p>{{ scope.row.playStartTime }} - {{ scope.row.playEndTime }}</p>
              </template>                                             
            </template>
          </el-table-column>  
          <el-table-column property="channelId" label="栏目名称">
            <template slot-scope="scope">
              <template v-if="scope.row.show">
                <el-select v-model="scope.row.channelId" placeholder="请选择" size="mini">
                  <el-option v-for="item in channelList" 
                    :key="item.channelId" 
                    :value="item.channelId"
                    :label="item.name">
                  </el-option>
                </el-select>                           
              </template>  
              <template v-else>
                <p>{{ scope.row.channelName }}</p>
              </template>                                            
            </template>
          </el-table-column> 
          <el-table-column property="scrollType" label="栏目属性">
            <template slot-scope="scope">                     
              <template v-if="scope.row.show">
                <el-select v-model="scope.row.scrollType" placeholder="请选择" size="mini">
                  <el-option v-for="item in scrollTypeList" :key="item.value" :value="item.value" :label="item.name"></el-option>
                </el-select>                           
              </template>
              <template v-else>
                <p v-if="scope.row.scrollType === 0">非滚动</p>
                <p v-else>滚动</p>
              </template>                         
            </template>                   
          </el-table-column>  
          <el-table-column property="priority" label="播放优先级">
            <template slot-scope="scope">                    
              <template v-if="scope.row.show">
                <el-select v-model="scope.row.priority" placeholder="请选择" size="mini">
                  <el-option v-for="item in priorityList" :key="item.value" :value="item.value"></el-option>
                </el-select>                           
              </template>
              <template v-else>
                <p>{{ scope.row.priority }}</p>
              </template>                          
            </template>                   
          </el-table-column> 
          <el-table-column property="validType" label="栏目有效期">
            <template slot-scope="scope">
              <template v-if="scope.row.show">
                <p class="simInput" @click="validitySelect(scope.row)">
                  <span v-if="scope.row.validType === 0">长期</span>
                  <span v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</span>
                </p>
                <el-dialog append-to-body center title="选择栏目有效期" :visible.sync="dialogValidity" 
                @close="validityHide(scope.row)" @open="validityShow(scope.row)">
                  <template>
                    <el-radio-group v-model="radio">
                      <el-radio :label="0">长期</el-radio>
                      <el-radio :label="1">按时段有效</el-radio>
                    </el-radio-group>  
                  </template> 
                  <div style="margin:20px 0 0 20px"></div>
                  <template v-if="radio === 1">
                    <el-row>
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        v-model="validityData"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-row>                      
                  </template>  
                  <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogValidity = false">取消</el-button>
                    <el-button size="mini" type="primary" @click="validitySave(scope.row)">确定</el-button>
                  </div>                                   
                </el-dialog>                
              </template>
              <template v-else>
                <p v-if="scope.row.validType === 0">长期</p>
                <p v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</p>
              </template>              
            </template>
          </el-table-column>    
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.state === 0" size="mini" type="success" @click="handleInnerSave(scope.$index, scope.row)" v-show="scope.row.show">保存</el-button>
              <el-button :disabled="scope.row.state === 0" size="mini" v-show="scope.row.show" @click="handleCancel(scope.row)">取消</el-button>
              <el-button :disabled="scope.row.state === 0" size="mini" type="primary" @click="handleInnerEdit(scope.$index, scope.row)" v-show="!scope.row.show">编辑</el-button>
              <el-button :disabled="scope.row.state === 0" size="mini" type="danger" @click="handleInnerDelete(scope.$index, scope.row)" v-show="!scope.row.show">删除</el-button>
            </template>
          </el-table-column>                                                  
        </el-table>
      </el-dialog>
    </template>
   </div> 
</template>
<script>
import service from "@/api";
import pagination from "@/components/pagination";
import { scrollType, priority } from "@/mixins";
import { disabledDate, hours } from "@/utils/tools";

export default {
  name: "columnTpl",
  mixins: [scrollType, priority],
  components: {
    "qx-pagination": pagination
  },
  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      dialogDetail: false,
      dialogView: false,
      dialogValidity: false,
      disabled: 0,
      is: null, //判断是新增窗口还是编辑窗口
      formLabelWidth: "100px",
      radio: 0,
      templateId: null, //栏目模板ID
      channelName: "",
      value4: hours(),
      validityData: [],
      pickerOptions: {
        disabledDate
      },
      query: {
        templateName: "",
        page: 1,
        pageSize: 20
      },
      totalCount: 0, //分页总数
      tplform: {
        type: 0
      },
      tplDetailform: {
        templateId: null,
        validType: 0,
        scrollType: 0,
        playTime: hours(),
        validTime: []
      },
      channelList: [], //栏目
      tplAddData: [],
      tplEditData: [],
      tableData: [],
      viewTableData: []
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    },
    hours() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );
      const end = new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      );
      return [start, end];
    }
  },
  methods: {
    pageChange(curr) {
      this.query.page = curr;
      this.queryChannelTemplate();
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.queryChannelTemplate();
    },
    handleSearch() {
      this.queryChannelTemplate();
    },
    show() {},
    close() {
      this.resetForm("tplDetailform");
    },
    selectChannelName(value) {
      let obj = {};
      obj = this.channelList.find(item => item.channelId === value);
      this.channelName = obj.name;
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.tplDetailform.templateId = row.templateId;
      this.queryChannelTemplateDetail(row.templateId, "edit");
    },
    handleDetail(row) {
      this.dialogDetail = true;
      this.tplDetailform.templateId = row.templateId;
    },
    handleDel(index, row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteChannelTemplate(index, row.templateId);
        })
        .catch(error => {
          return false;
        });
    },
    handleView(row) {
      this.dialogView = true;
      this.queryChannelTemplateDetail(row.templateId, "view");
    },
    handleCancel() {
      this.tplEditData.forEach((elem, value) => {
        this.$set(elem, "show", false);
        this.$set(elem, "state", 1);
      });
    },
    handleInnerSave(index, row) {
      this.$confirm(`确定要保存吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$set(row, "show", false);
          this.disabled = 0;
          this.tplEditData.forEach((e, v) => {
            this.$delete(e, "show");
            this.$delete(e, "state");
          });
          let { show, state, channelName, postTime, ...z } = row;
          let templateId = this.tplDetailform.templateId;
          let obj = Object.assign({}, z, {
            templateId,
            playStartTime: this.value4[0],
            playEndTime: this.value4[1]
          });
          this.updateChannelTemplateDetail(obj);
        })
        .catch(error => {
          this.disabled = 0;
          this.tplEditData.forEach((e, v) => {
            this.$delete(e, "show");
            this.$delete(e, "state");
          });
          return false;
        });
    },
    handleInnerEdit(index, row) {
      this.disabled = 1; //编辑状态不可新增
      this.$set(row, "show", true);
      this.$set(row, "state", 1);
      this.setEditState(this.tplEditData);
      this.value4[0] = row.playStartTime;
      this.value4[1] = row.playEndTime;
    },
    handleInnerDelete(index, row) {
      this.$confirm(`确定保存吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteChannelTemplateDetail(row.id);
        })
        .catch(error => {
          return false;
        });
    },
    setChannelDefautl(row) {
      this.$confirm(`确定设置成默认模板吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateDefaultTemplate(row.templateId);
        })
        .catch(error => {
          return false;
        });
    },
    setEditState(tableData) {
      if (Array.isArray(tableData)) {
        tableData.forEach((e, v) => {
          if (!e.show) {
            this.$set(e, "show", false);
            this.$set(e, "state", 0);
          }
        });
      }
    },
    addTemplate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addChannelTemplate(this.tplform);
        }
      });
    },
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addTablerow(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let channelName = this.channelName;
          let { playTime, validTime, ...z } = this.tplDetailform;
          let validStartTime = "";
          let validEndTime = "";
          if (validTime.length && z.validType === 1) {
            validStartTime = validTime[0];
            validEndTime = validTime[1];
          }
          //提交的参数
          let obj = Object.assign({}, z, {
            playStartTime: playTime[0],
            playEndTime: playTime[1],
            validStartTime,
            validEndTime
          });
          this.addChannelTemplateDetail(obj);
        }
      });
    },
    //赋值自定义有效期时间
    validityShow(row) {},
    validityHide() {
      let that = this;
      setTimeout(() => {
        that.validityData = [];
      });
    },
    //保存有效期选择
    validitySave(row) {
      let radio = this.radio;
      if (radio) {
        row.validStartTime = this.validityData[0];
        row.validEndTime = this.validityData[1];
        row.validType = 1;
      } else {
        row.validType = 0;
        row.validStartTime = "";
        row.validEndTime = "";
      }
      this.dialogValidity = false;
    },
    validitySelect(row) {
      this.dialogValidity = true;
      if (row.validType) {
        this.validityData.push(row.validStartTime);
        this.validityData.push(row.validEndTime);
      }
      return row.validType === 0 ? (this.radio = 0) : (this.radio = 1);
    },
    //查询栏目名称
    async queryChannelAll() {
      let res = await service.queryChannelAll({});
      if (res.errorCode === 0) {
        this.channelList = res.data;
      }
    },
    //新增栏目模板
    async addChannelTemplate(params = {}) {
      let res = await service.addChannelTemplate(params);
      if (res.errorCode === 0) {
        //添加成功后在进行添加详细项
        this.dialogAdd = false;
        this.queryChannelTemplate();
        this.resetForm("tplform");
      } else if (res.errorCode === 1) {
        this.$message({ message: `${res.errorMsg}`, type: "warning" });
      }
    },
    //编辑栏目模板
    async updateChannelTemplate(params) {
      let res = await service.updateChannelTemplate(params).then(res => {
        console.log(res);
      });
    },
    //删除栏目模板
    async deleteChannelTemplate(index, templateId) {
      let res = await service.deleteChannelTemplate({ templateId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryChannelTemplate();
        //this.tableData.splice(index, 1);
      }
    },
    //删除栏目模板详细项
    async deleteChannelTemplateDetail(id) {
      let res = await service.deleteChannelTemplateDetail({ id });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryChannelTemplateDetail(this.tplDetailform.templateId, "edit");
      }
    },
    //新增栏目模板详细项
    async addChannelTemplateDetail(params = {}) {
      let res = await service.addChannelTemplateDetail(params);
      if (res.errorCode === 0) {
        let channelName = this.channelName;
        let { templateId, ...z } = params;
        this.tplAddData.push(
          Object.assign({}, z, {
            channelName
          })
        );
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    },
    //修改栏目模板详细项
    async updateChannelTemplateDetail(params = {}) {
      let res = await service.updateChannelTemplateDetail(params);
      if (res.errorCode === 0) {
        this.queryChannelTemplateDetail(this.tplDetailform.templateId, "edit");
      }
    },
    //查询栏目模板详细
    async queryChannelTemplateDetail(templateId, str) {
      let res = await service.queryChannelTemplateDetail({ templateId });
      if (res.errorCode === 0) {
        if (str === "view") {
          this.viewTableData = res.data;
        } else {
          this.tplEditData = res.data;
        }
      }
    },
    //显示栏目模板列表
    async queryChannelTemplate() {
      let res = await service.queryChannelTemplate(this.query);
      if (res.errorCode === 0) {
        let data = res.data.data;
        if (!Array.isArray(data)) {
          data = [];
        } else {
          this.tableData = data;
        }
        this.totalCount = res.data.totalCount;
      }
    },
    //设置默认栏目模板
    async updateDefaultTemplate(templateId) {
      let res = await service.updateDefaultTemplate({ templateId, type: 1 });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.queryChannelTemplate();
      }
    }
  },
  mounted() {
    this.queryChannelTemplate();
    this.queryChannelAll();
  }
};
</script>
<style lang="less" scoped>
.plac {
  margin-top: 50px;
}
.handle-btn {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: right;
}
</style>
