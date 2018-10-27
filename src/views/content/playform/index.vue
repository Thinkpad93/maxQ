<template>
   <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <qx-region-t @regionChange="handleRegionChange"></qx-region-t>
              <el-form-item label="学校名称">
                <el-autocomplete 
                  v-model="query.schoolName" 
                  placeholder="请输入学校名称" 
                  :trigger-on-focus="false"
                  :fetch-suggestions="querySearch"
                  @select="handleSelectSchool">
                </el-autocomplete>
              </el-form-item>                  
              <el-form-item>
                <el-button :disabled="disabled === 1" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                <el-button :disabled="disabled === 1" icon="el-icon-plus" type="primary" @click="handleaddChannel">新增</el-button>
                <el-button :disabled="disabled === 1" type="primary" @click="handleUpdate">更新表单到终端</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" stripe size="mini">
        <el-table-column width="400" label="播放时段">
          <template slot-scope="scope">
            <template v-if="scope.row.show">
              <el-time-picker
                @change="handleChangeTime"
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
        <el-table-column label="栏目名称" prop="channelId">
          <template slot-scope="scope">
            <template v-if="scope.row.show">
              <el-select v-model="scope.row.channelId" placeholder="请选择" size="mini">
                <el-option v-for="item in channelList" :key="item.channelId" :value="item.channelId" :label="item.name"></el-option>
              </el-select>
            </template>
            <template v-else>
              <p>{{scope.row.channelName}}</p>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="栏目属性" prop="scrollType">
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
        <el-table-column label="播放优先级" prop="priority">
          <template slot-scope="scope">
            <template v-if="scope.row.show">
              <el-select v-model="scope.row.priority" placeholder="请选择" size="mini">
                <el-option 
                  v-for="item in priorityList" 
                  :key="item.value" 
                  :value="item.value"
                  :label="item.label"></el-option>
              </el-select>
            </template>
            <template v-else>
              <p>{{scope.row.priority}}</p>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="栏目有效期" prop="validType">
          <template slot-scope="scope">
            <template v-if="scope.row.show">
              <p class="simInput" @click="validitySelect(scope.row)">
                <span v-if="scope.row.validType === 0">长期有效</span>
                <span v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</span>
              </p>
              <el-dialog width="40%" center title="选择栏目有效期" append-to-body :visible.sync="dialogValidity" @close="validityHide(scope.row)" @open="validityShow(scope.row)">
                <template>
                  <template>
                    <el-radio-group v-model="radio">
                      <el-radio :label="0">长期</el-radio>
                      <el-radio :label="1">按时段有效</el-radio>
                    </el-radio-group>  
                  </template> 
                </template>
                <div style="margin:20px 0 0 20px"></div>
                <template v-if="radio == 1">
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
              <p v-if="scope.row.validType === 0">长期有效</p>
              <p v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</p>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="播放内容" prop="content">
          <template slot-scope="scope">
            <template v-if="scope.row.show">
              <p class="simInput" @click="dialogContent = true">查看播放内容</p>
            </template>
            <template v-else>
              <!-- <a href="javascript:;" style="color:#409EFF" @click="viewChannelContent(scope.row)">查看</a> -->
              <el-popover placement="left" trigger="hover">
                <el-table :data="scope.row.contents" border stripe size="mini">
                  <el-table-column width="260" property="title" label="播放内容" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <a href="javascript:;" style="color:#409EFF">{{ scope.row.title }}</a>
                    </template>
                  </el-table-column>
                </el-table>
                <a href="javascript:;" style="color:#409EFF" slot="reference">查看</a>
              </el-popover>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :loading="saveloading" :disabled="scope.row.state === 0" size="mini" type="success" @click="handleSave(scope.row)" v-show="scope.row.show">保存</el-button>
            <el-button :disabled="scope.row.state === 0" size="mini" v-show="scope.row.show" @click="handleCancel(scope.row)">取消</el-button>
            <el-button :disabled="scope.row.state === 0" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-show="!scope.row.show">编辑</el-button>
            <el-button :disabled="scope.row.state === 0" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-show="!scope.row.show">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>   
    <!-- 播放内容 -->
    <template>
      <el-dialog :close-on-click-modal="false" center title="播放内容" :visible.sync="dialogContent" @open="show" @close="close">
        <el-table ref="playCon" 
          @selection-change="selectCheckbox" 
          :data="playContendata" style="width: 100%" border stripe size="mini">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="title" label="播放内容"></el-table-column>
          <el-table-column property="postTime" label="发布时间"></el-table-column>
          <el-table-column property="duration" label="单次播放时长"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogContent = false">取消</el-button>
          <el-button size="mini" type="primary" @click="toggleSelection">确定</el-button>
        </div>
      </el-dialog>      
    </template>
    <!-- 新增学校播放频道 -->
    <template>
      <el-dialog center top="40px" title="新增学校播放频道" :visible.sync="dialogChannel">
        <el-form 
        :rules="rules" 
        ref="channelForm" 
        :model="channelForm" 
        status-icon size="small" :label-width="formLabelWidth">
            <!-- <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="学校ID">
                  <el-input v-model="channelForm.schoolId" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="栏目名称" prop="channelId">
                  <el-select v-model="channelForm.channelId" placeholder="请选择" style="width:100%;" @change="handleQueryContent">
                    <el-option v-for="item in channelList" 
                      :key="item.channelId" 
                      :value="item.channelId"
                      :label="item.name">
                    </el-option>
                  </el-select>                  
                </el-form-item>                
              </el-col>
              <el-col :span="12">
                <el-form-item label="栏目属性" prop="scrollType">
                  <el-select v-model="channelForm.scrollType" @change="handleQueryContents" style="width:100%;">
                    <el-option v-for="item in scrollTypeList" :key="item.value" :value="item.value" :label="item.name"></el-option>
                  </el-select>              
                </el-form-item>  
              </el-col>
              <el-col :span="12">
                <el-form-item label="栏目有效期" prop="validType">
                  <el-select v-model="channelForm.validType" style="width:100%;">
                    <el-option v-for="item in validTypelist" :key="item.value" :value="item.value" :label="item.name"></el-option>
                  </el-select> 
                </el-form-item>  
              </el-col>
              <el-col :span="12">
                <el-form-item label="播放优先级" prop="priority">
                  <el-select v-model="channelForm.priority" placeholder="请选择" style="width:100%;">
                    <el-option 
                      v-for="item in priorityList" 
                      :key="item.value" 
                      :value="item.value"
                      :label="item.label">
                    </el-option>
                  </el-select> 
                </el-form-item>  
              </el-col>
              <el-col :span="12">
                <el-form-item label="播放时段" prop="playTime">
                  <el-time-picker
                    is-range
                    format="HH:mm:ss"
                    value-format="HH:mm:ss"
                    v-model="channelForm.playTime"
                    :clearable="false"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>                
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="时间段选择" prop="validTime">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="channelForm.validTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>                
                </el-form-item>                    
              </el-col>
              <el-col :span="12">
                <el-form-item label="播放内容" prop="contents">
                  <el-select v-model="channelForm.contents" value-key="contentId" multiple collapse-tags placeholder="请选择播放内容" style="width:100%;">
                    <el-option
                      v-for="item in contentsList"
                      :key="item.contentId"
                      :label="item.title"
                      :value="item.contentId">
                    </el-option>
                  </el-select>  
                </el-form-item>  
              </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogChannel = false">取消</el-button>
          <el-button size="small" type="primary" @click="addChannelForm('channelForm')">保存</el-button>
        </span>        
      </el-dialog>
    </template>       
   </div> 
</template>
<script>
import service from "@/api";
import region from "@/components/region";
import regiont from "@/components/qxregion";
import { scrollType, priority, validType } from "@/mixins";
import { disabledDate, hours } from "@/utils/tools";
export default {
  name: "playform",
  mixins: [scrollType, priority, validType],
  components: {
    region,
    "qx-region": region,
    "qx-region-t": regiont
  },
  data() {
    return {
      disabled: 0,
      dialogValidity: false,
      dialogContent: false,
      btnloading: false,
      saveloading: false,
      dialogChannel: false,
      formLabelWidth: "100px",
      countCheckbox: [], //记录选择的行数checkbox
      schoolId: null,
      radio: 0,
      schoolList: [],
      value4: hours(),
      isChangeTime: false, //用户是否修改了播放时段
      validityData: [],
      pickerOptions: {
        disabledDate
      },
      contentsList: [],
      playContendata: [],
      channelList: [],
      query: {
        schoolName: "",
        scopeType: "",
        scopeId: ""
      },
      channelForm: {
        schoolId: null,
        scrollType: 0,
        validType: 1,
        contents: []
      },
      rules: {
        contents: [
          { required: true, message: "请选择播放内容", trigger: "blur" }
        ],
        playTime: [
          { required: true, message: "请选择播放时段", trigger: "blur" }
        ],
        // validTime: [
        //   { required: true, message: "请选择时间段", trigger: "blur" }
        // ],
        channelId: [
          { required: true, message: "请选择栏目名称", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "请选择播放优先级", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  methods: {
    handleSearch() {
      if (this.query.schoolName && this.schoolId) {
        this.querySchoolPlayChannel(this.schoolId);
      }
    },
    async querySearch(queryString, cb) {
      let { scopeId, scopeType } = this.query;
      if (queryString) {
        let res = await service.selectSchoolNameLike({
          scopeId,
          scopeType,
          schoolName: queryString
        });
        if (res.errorCode === 0) {
          cb(res.data);
        }
      }
    },
    //根据关键字查询学校名称
    handleSelectSchool(value) {
      this.schoolId = value.schoolId;
      this.channelForm.schoolId = value.schoolId;
      //this.query.schoolName = value.value;
    },
    handleRegionChange(queryId, queryType) {
      this.query.scopeId = queryId;
      this.query.scopeType = queryType;
    },
    show() {
      this.$nextTick(() => {
        let countCheckbox = this.countCheckbox;
        let playContendata = this.playContendata;
        if (!countCheckbox.length) {
          playContendata.forEach(row => {
            if (!row.status) {
              this.$refs.playCon.toggleRowSelection(row);
            }
          });
        }
      });
    },
    close() {
      this.$nextTick(() => {});
    },
    toggleSelection() {
      this.dialogContent = false;
    },
    selectCheckbox(selection) {
      this.countCheckbox = [].concat(selection);
    },
    setEditState(row, params) {
      for (let o in params) {
        this.$set(row, o, params[o]);
      }
    },
    setEditStateAll(tableData, params) {
      if (Array.isArray(tableData)) {
        tableData.forEach((e, v) => {
          if (!e.show) {
            for (let o in params) {
              this.$set(e, o, params[o]);
            }
          }
        });
      }
    },
    delEditState(tableData) {
      if (Array.isArray(tableData)) {
        tableData.forEach((e, v) => {
          this.$delete(e, "show");
          this.$delete(e, "state");
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //更新表单播放列表
    handleUpdate() {
      if (this.schoolId || this.tableData.length) {
        this.updatePlayList(this.schoolId);
      }
    },
    //新增学校播放表单
    handleaddChannel() {
      if (this.schoolId || this.tableData.length) {
        this.dialogChannel = true;
        this.channelForm.schoolId = this.schoolId || this.tableData[0].schoolId;
      } else {
        return false;
      }
    },
    handleChangeTime(value) {
      this.isChangeTime = true;
    },
    handleQueryContent(value) {
      let schoolId = this.channelForm.schoolId;
      let scrollType = this.channelForm.scrollType;
      this.queryPlayContent({ schoolId, channelId: value, scrollType });
    },
    handleQueryContents(value) {
      let schoolId = this.channelForm.schoolId;
      let channelId = this.channelForm.channelId;
      this.queryPlayContent({ schoolId, channelId, scrollType: value });
    },
    handleEdit(index, row) {
      let { channelId, schoolId, scrollType } = row;
      let tableData = this.tableData;
      this.setEditState(row, { show: true, state: 1 });
      this.setEditStateAll(tableData, { show: false, state: 0 });
      this.value4[0] = row.playStartTime;
      this.value4[1] = row.playEndTime;
      this.disabled = 1;
      this.queryPlayContent({ channelId, schoolId, scrollType }, "edit");
    },
    handleDelete(index, row) {
      let { itemId, schoolId } = row;
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSchoolPlayChannel({ itemId, schoolId });
        })
        .catch(error => {
          return false;
        });
    },
    //取消操作
    handleCancel(row) {
      this.disabled = 0;
      this.tableData.forEach((elem, value) => {
        this.$set(elem, "show", false);
        this.$set(elem, "state", 1);
      });
    },
    handleSave(row) {
      var countCheckbox = this.countCheckbox; //选中的数据
      var playContendata = this.playContendata.slice();
      var { show, state, channelName, postTime, ...args } = row;
      var content = [];
      var one = [];
      var obj = {};
      if (countCheckbox.length) {
        content = countCheckbox.map(item => {
          return { contentId: item.contentId, status: 0 };
        });
        playContendata.forEach(oldItem => {
          if (
            !content.find(newItem => {
              return oldItem.contentId == newItem.contentId;
            })
          ) {
            one.push({ contentId: oldItem.contentId, status: 1 });
          }
        });
      } else {
        content = playContendata.map(item => {
          return { contentId: item.contentId, status: item.status };
        });
      }
      if (this.isChangeTime) {
        args.playStartTime = this.value4[0];
        args.playEndTime = this.value4[1];
      }
      obj = Object.assign({}, args, {
        contents: content.concat(one)
      });
      this.saveloading = true;
      this.updateSchoolPlayChannel(obj);
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
    addChannelForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { playTime, validTime, contents, ...args } = this.channelForm;
          let obj = {};
          let validObj = {};
          let one = [];
          if (args.validType === 1) {
            validObj = {
              validStartTime: validTime[0],
              validEndTime: validTime[1]
            };
          } else {
            validObj = { validStartTime: "", validEndTime: "" };
          }
          this.contentsList.forEach(oldItem => {
            if (
              contents.find(newItem => {
                return oldItem.contentId == newItem;
              })
            ) {
              one.push({
                contentId: oldItem.contentId,
                status: oldItem.status
              });
            }
          });
          obj = Object.assign({}, args, {
            contents: one,
            playStartTime: playTime[0],
            playEndTime: playTime[1],
            ...validObj
          });
          this.addSchoolPlayChannel(obj);
        }
      });
    },
    viewChannelContent(row) {
      let { channelId, schoolId } = row;
    },
    //查询栏目名称
    async queryChannelAll() {
      let res = await service.queryChannelAll({});
      if (res.errorCode === 0) {
        this.channelList = res.data;
      }
    },
    //查询频道对应内容列表 添加和编辑时有用
    async queryPlayContent(params = {}, str = "add") {
      let res = await service.queryPlayContent(params);
      if (res.errorCode === 0) {
        if (str === "add") {
          this.channelForm.contents = [];
          this.contentsList = res.data;
        } else {
          this.playContendata = res.data;
        }
      }
    },
    //更新表单播放列表
    async updatePlayList(schoolId) {
      let res = await service.updatePlayList({ schoolId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    },
    //新增学校播放频道
    async addSchoolPlayChannel(params = {}) {
      let res = await service.addSchoolPlayChannel(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogChannel = false;
        this.resetForm("channelForm");
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.querySchoolPlayChannel(this.schoolId);
      }
    },
    //显示学校播放表单列表
    async querySchoolPlayChannel(schoolId) {
      let res = await service.querySchoolPlayChannel({ schoolId });
      if (res.errorCode === 0) {
        if (res.data.length) {
          this.tableData = res.data;
        } else {
          this.tableData = [];
        }
      }
    },
    //编辑学校播放频道
    async updateSchoolPlayChannel(params = {}) {
      let res = await service.updateSchoolPlayChannel(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.saveloading = false;
        this.disabled = 0;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.querySchoolPlayChannel(this.schoolId);
      }
    },
    //删除学校播放频道
    async deleteSchoolPlayChannel(params = {}) {
      let res = await service.deleteSchoolPlayChannel(params);
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.querySchoolPlayChannel(this.schoolId);
      }
    }
  },
  mounted() {
    this.queryChannelAll();
  }
};
</script>
<style lang="less" scoped>
</style>
