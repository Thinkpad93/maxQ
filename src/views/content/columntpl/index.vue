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
                    <a href="javascript:;" style="color:#409EFF" @click="handleView">{{ scope.row.name }}</a>
                </template>                    
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button> 
                    <template v-if="scope.row.isdefault">
                        <el-button :disabled="scope.row.isdefault === true" size="mini" type="success" v-if="scope.row.isdefault">默认模板</el-button>   
                    </template>   
                    <template v-else>
                        <el-button size="mini" type="info" @click="setDefautl(scope.row)">设置默认模板</el-button>
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
        <el-dialog width="90%" center @open="show" @close="close" top="0px" title="新增栏目模板" :visible.sync="dialogAdd" :modal-append-to-body="false">
           <el-form :rules="rules" ref="tplform" :model="tplform" size="mini" :label-width="formLabelWidth" label-position="left" style="width: 500px;">
                <el-form-item label="栏目模板名称" prop="name">
                    <el-input v-model="tplform.name" placeholder="请输入栏目名称"></el-input>
                </el-form-item>  
                <el-form-item label="栏目模板描述" prop="description">
                    <el-input v-model="tplform.description" :rows="4" placeholder="请输入栏目描述"></el-input>
                </el-form-item> 
                <el-form-item label="模板类型">
                    <el-radio-group v-model="tplform.type">
                    <el-radio :label="0">非缺省模板</el-radio>
                    <el-radio :label="1">缺省模板</el-radio>
                    </el-radio-group>
                </el-form-item>                   
                <el-form-item>
                    <el-button type="primary" @click="addTemplate('tplform')">保存</el-button>
                    <el-button :disabled="disabled === 0" icon="el-icon-plus" type="success" @click="addTablerow">新增模板详细项</el-button>
                </el-form-item>                                            
           </el-form> 
           <!-- 表格 -->
           <el-table ref="tpladd" :data="tplAddData" style="width: 100%" :height="450" border stripe size="mini">
               <el-table-column width="400" property="rule" label="播放时段">
                   <template slot-scope="scope">
                       <template v-if="scope.row.show">
                            <p>{{ scope.row.playStartTime }} - {{ scope.row.playEndTime }}</p>
                       </template>                         
                       <template>
                            <el-time-picker
                                is-range
                                v-model="value4"
                                size="mini"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                            </el-time-picker>                             
                       </template>
                   </template>
               </el-table-column>
               <el-table-column property="rule" label="栏目名称">
                   <template slot-scope="scope">
                       <template v-if="scope.row.show">
                           <p>{{ scope.row.channelid }}</p>
                       </template>
                       <template v-else>
                            <el-select v-model="scope.row.channelid" placeholder="请选择" size="mini">
                                <el-option v-for="item in channelList" 
                                    :key="item.channelId" 
                                    :value="item.channelId"
                                    :label="item.name">
                                </el-option>
                            </el-select>                           
                       </template>
                   </template>
               </el-table-column>
               <el-table-column property="scrollType" label="栏目属性">
                   <template slot-scope="scope">
                        <template v-if="scope.row.show">
                            <p>{{ scope.row.scrollType }}</p>
                        </template>                       
                       <template v-else>
                            <el-select v-model="scope.row.scrollType" placeholder="请选择" size="mini">
                                <el-option v-for="item in scrollTypeList" :key="item.value" :value="item.value" :label="item.name"></el-option>
                            </el-select>                           
                       </template>
                   </template>
               </el-table-column>
               <el-table-column property="priority" label="播放优先级">
                   <template slot-scope="scope">
                        <template v-if="scope.row.show">
                            <p>{{ scope.row.priority }}</p>
                        </template>                       
                       <template v-else>
                            <el-select v-model="scope.row.priority" placeholder="请选择" size="mini">
                                <el-option v-for="item in priorityList" :key="item.value" :value="item.value"></el-option>
                            </el-select>                           
                       </template>
                   </template>
               </el-table-column>
               <el-table-column property="validType" label="栏目有效期">
                   <template slot-scope="scope">
                       <template v-if="scope.row.show">
                           <p>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</p>
                       </template>
                       <template v-else>
                           <el-popover placement="bottom" trigger="click" width="400">
                               <p class="simInput" slot="reference">
                                   <span v-if="scope.row.validType === 0">长期</span>
                                   <span v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</span>  
                               </p>
                               <template>
                                    <el-row>
                                        <el-radio v-model="radio" :label="0">长期</el-radio>
                                        <el-radio v-model="radio" :label="1">自定义</el-radio>
                                    </el-row>
                               </template> 
                               <template v-if="radio == 1">
                                    <el-row :gutter="10">
                                        <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            v-model="validityData"
                                            size="mini"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickerOptions0">
                                        </el-date-picker>  
                                    </el-row>                                   
                               </template>                                 
                               <el-row>
                                   <el-button size="mini">取消</el-button>
                                   <el-button size="mini" type="primary">确定</el-button>
                               </el-row>
                           </el-popover>
                           <!-- <p class="simInput" slot="reference">
                                <span v-if="scope.row.validType === 0">长期</span>
                                <span v-else>{{ scope.row.validStartTime }} 至 {{ scope.row.validEndTime }}</span>                                  
                           </p>
                           <el-popover placement="bottom" trigger="click" width="400">
                               
                               <p>这是一段内容这是一段内容确定删除吗？</p>
                                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                           </el-popover> -->
                           <!-- <el-dialog append-to-body center title="选择栏目有效期" :visible.sync="dialogValidity" @open="validityShow(scope.row)">
                                <template>
                                    <el-row style="margin-bottom:15px;">
                                        <el-radio v-model="radio" :label="0">长期</el-radio>
                                        <el-radio v-model="radio" :label="1">自定义</el-radio>
                                    </el-row>
                                </template> 
                                <template v-if="radio == 1">
                                    <el-row :gutter="10">
                                        <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            v-model="validityData"
                                            size="mini"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickerOptions0">
                                        </el-date-picker>  
                                    </el-row>                                   
                                </template>   
                                <div slot="footer" class="dialog-footer">
                                    <el-button size="mini" @click="dialogValidity = false">取消</el-button>
                                    <el-button size="mini" type="primary" @click="validitySave(scope.row)">确定</el-button>
                                </div>                                                               
                           </el-dialog> -->
                       </template>
                   </template>
               </el-table-column>
               <el-table-column label="操作">
                   <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handleTplSave(scope.$index, scope.row)" v-show="!scope.row.show">保存</el-button>
                        <el-button size="mini" type="primary" @click="handleTplEdit(scope.$index, scope.row)" v-show="scope.row.show">编辑</el-button>                       
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
  addChannelTemplate,
  addChannelTemplateDetail
} from "@/api/content";
export default {
  name: "columnTpl",
  data() {
    return {
      dialogAdd: false,
      dialogValidity: false,
      loading: false,
      disabled: 0,
      formLabelWidth: "100px",
      radio: 0,
      value4: [new Date(), new Date()],
      query: {
        templateName: "",
        page: 1,
        pageSize: 10
      },
      totalCount: 0, //分页总数
      rules: {},
      tplform: {
        type: 0
      },
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
      tplAddData: [
        // {
        //   templateId: 0,
        //   channelId: 0,
        //   playStartTime: "10:00:00",
        //   playEndTime: "11:00:00",
        //   scrollType: 0,
        //   priority: 1,
        //   validType: 1,
        //   validStartTime: "2018-6-30",
        //   validEndTime: "2018-7-30"
        // }
      ],
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
    search() {},
    show() {},
    close() {},
    handleEdit() {},
    handleDel() {},
    handleView() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleTplSave(index, row) {},
    handleTplEdit(index, row) {},
    addTemplate(formName) {
      this.$refs[formName].validate(valid => {});
    },
    addTablerow() {},
    validityShow() {},
    validitySave() {},
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
    //显示栏目模板列表
    createTable() {
      queryChannelTemplate(this.query).then(res => {
        if (res.errorCode === 0) {
          this.tableData = res.data.data;
          this.totalCount = res.data.totalCount;
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
</style>
