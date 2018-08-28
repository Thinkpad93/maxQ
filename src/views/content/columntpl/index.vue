<template>
   <div class="page">
    <!-- 表单 -->
    <template>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="page-form">
                    <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
                        <el-form-item label="栏目模板">
                            <el-input v-model="query.channelName" placeholder="请输入栏目模板" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                            <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增栏目模板</el-button>
                        </el-form-item>   
                    </el-form>
                </div>
            </el-col>
        </el-row> 
    </template> 
    <!-- 表格数据 -->
    <template>
        <el-table :data="tableData" style="width: 100%" :height="tableHeight" border stripe size="mini" v-loading="loading">
            <el-table-column label="栏目模板ID" prop="templateId" width="400"></el-table-column>
            <el-table-column label="栏目模板" prop="name">
                <template slot-scope="scope">
                    <a href="javascript:;" style="color:#409EFF" @click="handleView(scope.row)">{{ scope.row.name }}</a>
                </template>                    
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                    <!-- 默认模板不能删除 -->
                    <el-button size="mini" type="danger" @click="handleDel(scope.row)" v-if="!scope.row.type">删除</el-button> 
                    <template v-if="scope.row.type">
                        <el-button :disabled="scope.row.type === 1" size="mini" type="success">默认模板</el-button>   
                    </template>   
                    <template v-else>
                        <el-button size="mini" type="info" @click="setChannelDefautl(scope.row)">设置默认模板</el-button>
                    </template>
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
            :page-size="query.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination> 
      </div>   
    </template>      
    <!-- 新增栏目模板 -->  
    <template>
        <el-dialog width="80%" @open="addShow" @close="close" center top="0px" title="新增栏目模板" :visible.sync="dialogAdd">
           <el-row :gutter="50">
              <el-col :span="8">
                <el-form :rules="rules" ref="tplform" :model="tplform" size="mini" :label-width="formLabelWidth" label-position="left">
                    <el-form-item label="模板名称" prop="name">
                        <el-input v-model="tplform.name" placeholder="请输入模板名称"></el-input>
                    </el-form-item>  
                    <el-form-item label="模板描述" prop="description">
                        <el-input v-model="tplform.description" placeholder="请输入模板描述"></el-input>
                    </el-form-item>                  
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-plus" @click="addTemplate('tplform')">新增模板名称</el-button>
                    </el-form-item>                                            
                </el-form> 
              </el-col> 
              <el-col :span="16">
                <el-form :rules="rules2" ref="tplDetailform" :model="tplDetailform" size="mini" :label-width="formLabelWidth" label-position="left">
                    <el-form-item label="栏目模板ID">
                        <el-input v-model="tplDetailform.templateId" :disabled="true" style="width:350px;"></el-input>
                    </el-form-item>
                    <el-form-item label="播放时段" prop="playTime" required>
                        <el-time-picker
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
                    <template v-if="tplDetailform.validType === 1">
                        <el-form-item label="时间段选择" prop="validTime" required>
                            <el-date-picker
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
                    </template>                      
                    <el-form-item label="栏目名称" prop="channelId">
                        <el-select v-model="tplDetailform.channelId" placeholder="请选择" size="mini" @change="selectChannelName">
                            <el-option v-for="item in channelList" 
                                :key="item.channelId" 
                                :value="item.channelId"
                                :label="item.name">
                            </el-option>
                        </el-select>                             
                    </el-form-item>
                    <el-form-item label="播放优先级" prop="priority">
                        <el-select v-model="tplDetailform.priority" placeholder="请选择" size="mini">
                            <el-option 
                            v-for="item in priorityList" 
                            :key="item.value" 
                            :value="item.value"
                            :label="item.label">
                            </el-option>
                        </el-select> 
                    </el-form-item>   
                    <el-form-item label="栏目属性" prop="scrollType">
                        <el-radio-group v-model="tplDetailform.scrollType">
                          <el-radio :label="0">非滚动</el-radio>
                          <el-radio :label="1">滚动</el-radio>
                        </el-radio-group>
                    </el-form-item>                                     
                    <el-form-item label="栏目有效期" prop="validType">
                        <el-radio-group v-model="tplDetailform.validType">
                            <el-radio :label="0">长期</el-radio>
                            <el-radio :label="1">按时段有效</el-radio>
                        </el-radio-group>                            
                    </el-form-item>                                      
                    <el-form-item>
                        <el-button icon="el-icon-plus" type="primary" @click="addTablerow('tplDetailform')">新增模板详细项</el-button>
                    </el-form-item>
                </el-form>  
              </el-col> 
           </el-row> 
           <el-alert title="已新增的模板详细项" type="info" :closable="false"></el-alert>
           <!-- 表格 -->
           <el-table ref="tpladd" :data="tplAddData" style="width: 100%" :height="250" border stripe size="mini">
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
    <!-- 修改栏目模板 -->  
    <template>
        <el-dialog width="80%" center @open="editShow" @close="close" top="0px" title="编辑栏目模板" :visible.sync="dialogEdit">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form :rules="rules" ref="tpleditform" :model="tpleditform" size="mini" :label-width="formLabelWidth" label-position="left">
                    <el-form-item label="模板名称" prop="name">
                        <el-input v-model="tpleditform.name" placeholder="请输入栏目名称"></el-input>
                    </el-form-item>  
                    <el-form-item label="模板描述" prop="description">
                        <el-input v-model="tpleditform.description" placeholder="请输入栏目描述"></el-input>
                    </el-form-item>                   
                    <el-form-item>
                        <el-button type="primary" @click="editTemplate('tpleditform')">保存</el-button>
                    </el-form-item>                                            
              </el-form> 
            </el-col>
            <el-col :span="12">
                <el-form :rules="rules2" ref="tplDetailform" :model="tplDetailform" size="mini" :label-width="formLabelWidth" label-position="left">
                    <el-form-item label="栏目模板ID">
                        <el-input v-model="tplDetailform.templateId" :disabled="true" style="width:350px;"></el-input>
                    </el-form-item>
                    <el-form-item label="播放时段" prop="playTime" required>
                        <el-time-picker
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
                    <template v-if="tplDetailform.validType === 1">
                        <el-form-item label="时间段选择" prop="validTime" required>
                            <el-date-picker
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
                    </template>                      
                    <el-form-item label="栏目名称" prop="channelId">
                        <el-select v-model="tplDetailform.channelId" placeholder="请选择" size="mini" @change="selectChannelName">
                            <el-option v-for="item in channelList" 
                                :key="item.channelId" 
                                :value="item.channelId"
                                :label="item.name">
                            </el-option>
                        </el-select>                             
                    </el-form-item>
                    <el-form-item label="播放优先级" prop="priority">
                        <el-select v-model="tplDetailform.priority" placeholder="请选择" size="mini">
                            <el-option 
                            v-for="item in priorityList" 
                            :key="item.value" 
                            :value="item.value"
                            :label="item.label">
                            </el-option>
                        </el-select> 
                    </el-form-item>   
                    <el-form-item label="栏目属性" prop="scrollType">
                        <el-radio-group v-model="tplDetailform.scrollType">
                          <el-radio :label="0">非滚动</el-radio>
                          <el-radio :label="1">滚动</el-radio>
                        </el-radio-group>
                    </el-form-item>                                     
                    <el-form-item label="栏目有效期" prop="validType">
                        <el-radio-group v-model="tplDetailform.validType">
                            <el-radio :label="0">长期</el-radio>
                            <el-radio :label="1">按时段有效</el-radio>
                        </el-radio-group>                            
                    </el-form-item>                                      
                    <el-form-item>
                        <el-button icon="el-icon-plus" type="primary" @click="addTablerow('tplDetailform')">新增模板详细项</el-button>
                    </el-form-item>
                </el-form>  
            </el-col>
          </el-row>
          <el-alert title="已有的模板详细项" type="info" :closable="false"></el-alert>
           <!-- 表格 -->
           <el-table ref="tpledit" :data="tplEditData" style="width: 100%" :height="450" border stripe size="mini">
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
                            <p class="simInput">
                              <span v-if="scope.row.validType === 0">长期</span>
                              <span v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</span>
                            </p>
                        </template>
                        <template v-else>
                            <p v-if="scope.row.validType === 0">长期</p>
                            <p v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</p>
                        </template>
                   </template>
               </el-table-column>
               <el-table-column label="操作">
                   <template slot-scope="scope">
                        <el-button :disabled="scope.row.state === 0" size="mini" type="success" @click="handleInnerSave(scope.$index, scope.row)" v-show="scope.row.show">保存</el-button>
                        <el-button :disabled="scope.row.state === 0" size="mini" type="primary" @click="handleInnerEdit(scope.$index, scope.row)" v-show="!scope.row.show">编辑</el-button>
                        <el-button :disabled="scope.row.state === 0" size="mini" type="danger" @click="handleInnerDelete(scope.$index, scope.row)" v-show="!scope.row.show">删除</el-button>
                   </template>
               </el-table-column>
           </el-table>
        </el-dialog>
    </template>
    <!-- 查看栏目模板详细 -->
    <template>
        <el-dialog width="60%" center @open="show" @close="close" top="0px" title="栏目模板详情查看" :visible.sync="dialogView">
            <el-table :data="viewTableData" style="width: 100%" border stripe size="mini">
                <el-table-column label="播放时段" prop="name">
                    <template slot-scope="scope">
                        <p>{{ scope.row.playStartTime }} 至 {{ scope.row.playEndTime }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="栏目名称" prop="channelName"></el-table-column>
                <el-table-column label="栏目属性" prop="scrollType"></el-table-column>
                <el-table-column label="播放优先级" prop="priority"></el-table-column>
                <el-table-column label="栏目有效期" prop="validType">
                    <template slot-scope="scope">
                        <p v-if="scope.row.validType === 0">长期</p>
                        <p v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </template>
   </div> 
</template>
<script>
import {
  queryChannelAll,
  queryChannelTemplate,
  queryChannelTemplateDetail,
  addChannelTemplate,
  addChannelTemplateDetail,
  updateChannelTemplate,
  updateDefaultTemplate,
  deleteChannelTemplate,
  deleteChannelTemplateDetail
} from "@/api/content";
import { disabledDate, hours } from "@/utils/tools";

export default {
  name: "columnTpl",
  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      dialogView: false,
      dialogValidity: false,
      loading: false,
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
      rules: {
        name: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入栏目模板描述", trigger: "blur" }
        ]
      },
      rules2: {
        playTime: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        validTime: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "请输入栏目模板名称", trigger: "blur" }
        ]
      },
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
      tpleditDetailform: {
        templateId: null,
        validType: 0,
        scrollType: 0,
        playTime: hours(),
        validTime: []
      },
      tpleditform: {},
      channelList: [], //栏目
      scrollTypeList: [
        {
          name: "非滚动",
          value: 0
        },
        {
          name: "滚动",
          value: 1
        }
      ], //栏目属性
      priorityList: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 }
      ], // 播放优先级别

      //初始数据
      initTableData: {
        channelId: 1,
        playStartTime: "",
        playEndTime: "",
        scrollType: 0,
        priority: 1,
        validType: 0,
        validStartTime: "",
        validEndTime: ""
      },
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
    search() {},
    addShow() {
      this.is = 0;
    },
    editShow() {
      this.is = 1;
    },
    show() {},
    close() {},
    selectChannelName(value) {
      let obj = {};
      obj = this.channelList.find(item => item.channelId === value);
      this.channelName = obj.name;
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.tpleditform = Object.assign({}, row);
      this.tplDetailform.templateId = row.templateId;
      //this.tpleditDetailform.templateId = row.templateId;
      this.queryChannelTemplateDetailAction(row.templateId, "edit");
    },
    handleDel(row) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteChannelTemplateAction(row.templateId);
        })
        .catch(error => {
          return false;
        });
    },
    handleView(row) {
      this.dialogView = true;
      this.queryChannelTemplateDetailAction(row.templateId, "view");
    },
    handleInnerSave(index, row) {
      this.disabled = 0;
      this.$set(row, "show", false);
    },
    handleInnerEdit(index, row) {
      this.disabled = 1; //编辑状态不可新增
      this.$set(row, "show", true);
    },
    handleInnerDelete(index, row) {
      console.log(row);
      this.deleteChannelTemplateDetailAction(row.id);
    },
    setChannelDefautl(row) {
      let { templateId } = row;
      this.updateDefaultTemplateAction(templateId);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleTplEdit(index, row) {
      this.$set(row, "show", false);
    },
    addTemplate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addChannelTemplateAction(this.tplform);
        }
      });
    },
    editTemplate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.tpleditform);
          let { name, description, templateId } = this.tpleditform;
          this.updateChannelTemplateAction({ 
            name,
            description,
            templateId
           });
        }
      });
    },
    addTablerow(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.tplDetailform.templateId == null) {
            this.$message({
              message: `请先添加栏目模板生成模板ID`,
              type: "warning"
            });
            return false;
          }
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
          this.addChannelTemplateDetailAction(obj);
        }
      });
    },
    validityShow() {},
    //保存有效期
    validitySave() {
      this.dialogValidity = false;
    },
    validitySelect(row) {
      this.dialogValidity = true;
    },
    //查询栏目名称
    queryChannelInner() {
      queryChannelAll({}).then(res => {
        if (res.errorCode === 0) {
          this.channelList = res.data;
        }
      });
    },
    //新增栏目模板
    addChannelTemplateAction(params = {}) {
      addChannelTemplate(params).then(res => {
        if (res.errorCode === 0) {
          //添加成功后在进行添加详细项
          this.tplDetailform.templateId = res.data.templateId;
          this.createTable();
        } else if (res.errorCode === 1) {
          this.$message({ message: `${res.errorMsg}`, type: "warning" });
        }
      });
    },
    //编辑栏目模板
    updateChannelTemplateAction(params) {
      updateChannelTemplate(params).then(res => {
        console.log(res);
      })
    },
    //删除栏目模板
    deleteChannelTemplateAction(templateId) {
      deleteChannelTemplate({ templateId }).then(res => {
        if (res.errorCode === 0) {
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable();
        }
      });
    },
    //删除栏目模板详细项
    deleteChannelTemplateDetailAction(id) {
      deleteChannelTemplateDetail({ id }).then(res => {
        if (res.errorCode === 0) {

        }
      });
    },
    //新增栏目模板详细项
    addChannelTemplateDetailAction(params = {}) {
      addChannelTemplateDetail(params).then(res => {
        if (res.errorCode === 0) {
          let channelName = this.channelName;
          let { templateId, ...z } = params;
          if (this.is === 0) {
            this.tplAddData.push(
              Object.assign({}, z, {
                channelName
              })
            );
          }
          if (this.is === 1) {
            this.queryChannelTemplateDetailAction(this.tpleditform.templateId,"edit");  
          }
          this.$message({ message: `${res.errorMsg}`, type: "success" });
        }
      });
    },
    //查询栏目模板详细
    queryChannelTemplateDetailAction(templateId, str) {
      queryChannelTemplateDetail({ templateId }).then(res => {
        if (res.errorCode === 0) {
          if (str === "view") {
            this.viewTableData = res.data;
          } else {
            this.tplEditData = res.data;
          }
        }
      });
    },
    //显示栏目模板列表
    createTable() {
      queryChannelTemplate(this.query).then(res => {
        if (res.errorCode === 0) {
          this.tableData = res.data.data;
          this.totalCount = res.data.totalCount;
        }
      });
    },
    //设置默认栏目模板
    updateDefaultTemplateAction(templateId) {
      updateDefaultTemplate({ templateId, type: 1 }).then(res => {
        if (res.errorCode === 0) {
          this.$message({ message: `${res.errorMsg}`, type: "success" });
          this.createTable();
        }
      });
    }
  },
  mounted() {
    this.createTable();
    this.queryChannelInner();
  }
};
</script>
<style lang="less" scoped>
.plac {
  min-height: 100px;
}
.handle-btn {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: right;
}
</style>
