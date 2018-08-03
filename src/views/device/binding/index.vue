<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="form" size="small" label-width="70px" label-position="left">
              <el-form-item>
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
                <el-button icon="el-icon-plus" type="info" @click="dialogAdd = true">新增绑定</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
     <!-- 表格数据 -->
     <template>
       <el-table :data="computed_page" style="width: 100%" border stripe height="690" size="mini" v-loading="loading">
         <el-table-column :resizable="false" label="序号" prop="deviceId"></el-table-column>
         <el-table-column :resizable="false" label="学校名称" prop="schoolName">
           <template slot-scope="scope">
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
           </template>
         </el-table-column>
         <el-table-column :resizable="false" label="设备编号" prop="deviceNo" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="MAC地址" prop="mac" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="安装位置" prop="address" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column :resizable="false" label="安装时间" prop="postTime"></el-table-column>
         <el-table-column :resizable="false" label="设备管理员" prop="manager"></el-table-column>
         <el-table-column :resizable="false" label="联系电话" prop="phone"></el-table-column>
         <el-table-column :resizable="false" label="操作">
           <template slot-scope="scope">
             <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
             <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination> 
      </div>   
    </template>    
    <!-- 新增 -->
    <template>
      
    </template> 
     <!-- 编辑 -->
     <template>
       <el-dialog center top="40px" title="正在编辑" :visible.sync="dialogEdit" :modal-append-to-body="false">
         <el-form :rules="editrules" ref="editForm" :model="edit" size="small" :label-width="formLabelWidth">
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
              <el-select v-model="edit.serial" placeholder="请选择设备序号" :disabled="true">
                <el-option
                  v-for="item in schoolName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>            
              </el-select>              
            </el-form-item>    
            <el-form-item label="冠名企业" prop="sponsors">
              <el-select v-model="edit.sponsors" multiple placeholder="请选择冠名企业" @change="changeTag">
                <el-option
                  v-for="item in sponsorsList"
                  :key="item.labelId"
                  :label="item.name"
                  :value="item.labelId">
                </el-option>
              </el-select>               
            </el-form-item>
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
import { showDeviceList } from "@/api/device";
import "@/mock/binding";

export default {
  name: "binding",
  data() {
    return {
      loading: false,
      dialogAdd: false,
      dialogView: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      form: {},
      edit: {
        sponsors: [1]
      },
      //默认参数
      query: {
        schoolid: 0,
        page: 1,
        page_size: 10
      },
      restaurants: [],
      state1: '',
      //学校名称
      schoolName: [
        { value: "1", label: "棠东小学" },
        { value: "2", label: "棠下一小" },
        { value: "3", label: "东风中小学" },
        { value: "4", label: "棠下小学" }
      ],  
      //请求的数据
      sponsorsList: [
        {
          labelId: 1,
          name: "美食",
          description: "",
          type: 3
        },
        {
          labelId: 2,
          name: "没有选择了",
          description: "",
          type: 3
        },
        {
          labelId: 22,
          name: "品牌曝光",
          description: "",
          type: 3
        }
      ],          
      tableData: [],
      editrules: {}
    };
  },
  computed: {
    computed_page() {
      return this.tableData.slice(
        (this.query.page - 1) * this.query.page_size,
        this.query.page * this.query.page_size
      );
    }
  },  
  methods: {
    //搜索
    search() {

    },
    changeTag() {},
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },        
      ]
    },
    //pageSize 改变时会触发
    handleSizeChange(size) {
      this.page_size = size;
    },
    //currentPage 改变时会触发
    handleCurrentChange() {},    
    handleEdit(row) {
      this.dialogEdit = true;
    },
    handleSelect() {},
    handleDel(row) {
      let { schoolName } = row;
      this.$confirm(`你确定真的要删除${schoolName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        this.deleteDevice(row.deviceId);
      });      
    },
    //显示设备列表
    getDeviceList() {
      let that = this;
      that.loading = true;
      showDeviceList(that.query).then(response => {
        console.log(response);
        this.loading = false;
        this.tableData = response.data;
      });
    }
  },
  mounted() {
    this.getDeviceList();
    this.restaurants = this.loadAll();
  }
};
</script>
<style lang="less" scoped>
</style>
