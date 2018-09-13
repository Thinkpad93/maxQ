<template>
   <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <region @last="lastChange"></region>
              </el-form-item>
              <el-form-item label="学校名称">
                <el-select v-model="query.schoolId" clearable filterable placeholder="选择学校" @clear="handleClearSchool">
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
                <el-button icon="el-icon-plus" type="primary" @click="dialogChannel = true">新增</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" stripe size="mini" v-loading="loading">
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
              <el-input @focus="selectContent(scope.$index)" v-model="scope.row.multipleTable" placeholder="选择播放内容" readonly size="mini"></el-input>
              <el-dialog center title="选择内容" :visible.sync="dialogContent" @open="show(scope.row)" @close="close">
                <el-table ref="gr" @selection-change="selectCheckbox" :data="playContendata" style="width: 100%" border stripe size="mini">
                  <el-table-column type="selection" width="55" align="ceneter"></el-table-column>
                  <el-table-column property="rule" label="播放内容" width="250">
                    <template slot-scope="scope">
                      {{ scope.row.rule }}
                    </template>
                  </el-table-column>
                  <el-table-column property="time" label="发布时间" width="250" align="ceneter">
                    <template slot-scope="scope">{{ scope.row.time }}</template>
                  </el-table-column>
                  <el-table-column property="playtime" label="单次播放时长" align="ceneter">
                    <template slot-scope="scope">{{ scope.row.playtime }}</template>
                  </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                  <el-button size="mini" type="primary" @click="dialogContent = false">取消</el-button>
                  <el-button size="mini" type="danger" @click="toggleSelection">确定</el-button>
                </div>
              </el-dialog>
            </template>
            <template v-else>
              <a href="javascript:;" style="color:#409EFF" @click="viewChannelContent(scope.row)">查看</a>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.state === 0" size="mini" type="success" @click="handleSave(scope.$index, scope.row)" v-show="scope.row.show">保存</el-button>
            <el-button :disabled="scope.row.state === 0" size="mini" type="text" @click="handleEdit(scope.$index, scope.row)" v-show="!scope.row.show">编辑</el-button>
            <el-button :disabled="scope.row.state === 0" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)" v-show="!scope.row.show">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>   
    <!-- 新增学校播放频道 -->
    <template>
      <el-dialog center top="40px" title="新增学校播放频道" :visible.sync="dialogChannel">
        <el-form 
        :rules="rules" 
        ref="channelForm" 
        :model="channelForm" 
        status-icon size="mini" :label-width="formLabelWidth">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="学校ID">
              <el-input v-model="channelForm.schoolId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="播放时段" prop="playTime">
              <el-time-picker
                style="width:100%;"
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
                :disabled="channelForm.validType === 0"
                style="width:100%;"
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="栏目名称" prop="channelId">
              <el-select v-model="channelForm.channelId" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in channelList" 
                  :key="item.channelId" 
                  :value="item.channelId"
                  :label="item.name">
                </el-option>
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="栏目属性" prop="scrollType">
              <el-radio-group v-model="channelForm.scrollType">
                <el-radio :label="0">非滚动</el-radio>
                <el-radio :label="1">滚动</el-radio>
              </el-radio-group>
            </el-form-item>   
          </el-col>   
          <el-col :span="12">
            <el-form-item label="栏目有效期" prop="validType">
              <el-radio-group v-model="channelForm.validType">
                <el-radio :label="0">长期</el-radio>
                <el-radio :label="1">按时段有效</el-radio>
              </el-radio-group>                            
            </el-form-item>               
          </el-col>                 
        </el-row>
        <el-row :gutter="20" style="text-align:center">
          <el-button size="mini" @click="dialogChannel = false">取消</el-button>
          <el-button size="mini" type="primary" @click="addChannelForm('channelForm')">保存</el-button>
        </el-row>            
        </el-form>
      </el-dialog>
    </template>       
   </div> 
</template>
<script>
import service from "@/api";
import region from "@/components/region";
import Mixin from "@/mixins/priority";
import { disabledDate, hours } from "@/utils/tools";
export default {
  name: "playform",
  mixins: [Mixin],
  components: {
    region
  },
  data() {
    return {
      dialogAdd: false,
      dialogValidity: false,
      dialogContent: false,
      loading: false,
      btnloading: false,
      saveloading: false,
      dialogChannel: false,
      formLabelWidth: "100px",
      schoolId: null,
      radio: 0,
      schoolList: [],
      value4: hours(),
      validityData: [],
      pickerOptions: {
        disabledDate
      },
      contentsList: [],
      playContendata: [],
      channelList: [],
      query: {
        schoolId: 2
      },
      channelForm: {
        schoolId: 2,
        scrollType: 0,
        validType: 0,
        contents: []
      },
      rules: {},
      tableData: []
    };
  },
  methods: {
    search() {
      if (this.query.schoolId === null) {
        return;
      }
      this.createTable();
    },
    show() {},
    close() {},
    toggleSelection() {},
    selectCheckbox() {},
    setEditState(row, params) {
      for (let o in params) {
        this.$set(row, o, params[o])
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
          this.$delete(e, 'show');
          this.$delete(e, 'state');
        });
      }
    },
    handleRegion() {},
    handleSchool() {},
    handleClearSchool() {
      this.query.schoolId = null;
    },
    handleEdit(index, row) {
      let tableData = this.tableData;
      this.setEditState(row, { show: true, state: 1 });
      this.setEditStateAll(tableData, { show: false, state: 0 });
      this.value4[0] = row.playStartTime;
      this.value4[1] = row.playEndTime;
    },
    handleDelete(index, row) {},
    handleSave(index, row) {
      this.$confirm(`确定要保存吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(error => {
          this.delEditState(this.tableData);
          return false;
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
    addChannelForm() {},
    lastChange(value) {
      let last = value[value.length - 1];
      queryRegion({ queryId: last, queryType: 3 }).then(res => {
        if (res.errorCode === 0) {
          this.schoolList = res.data;
        } else {
          return false;
        }
      });
    },
    viewChannelContent(row) {
      let { channelId, schoolId } = row;
      this.queryChannelContentAction({ channelId, schoolId });
    },
    //查询栏目名称
    async queryChannelInner() {
      let res = await service.queryChannelAll({});
        if (res.errorCode === 0) {
          this.channelList = res.data;
        }      
    },
    //查询频道对应内容列表
    async queryChannelContentAction(params = {}) {
      let res = await service.queryChannelContent(params);
      console.log(res);
    },
    //新增学校播放频道
    async addTable(params = {}) {
      let res = await service.addSchoolPlayChannel(params);
    },
    //显示学校播放表单列表
    async createTable() {
      let res = await service.querySchoolPlayChannel(this.query);
        if (res.errorCode === 0) {
          this.tableData = res.data;
        }      
    },
    //编辑学校播放频道
    async updateTable(params = {}) {
      let res = await service.updateSchoolPlayChannel(params);
      if (res.errorCode === 0) {

      }
    },
    //删除学校播放频道
    async deleteTable(params = {}) {
      let res = await service.deleteSchoolPlayChannel(params);
      if (res.errorCode === 0) {

      }
    }
  },
  mounted() {
    this.createTable();
    this.queryChannelInner();
  }
};
</script>
<style lang="less" scoped>
</style>
