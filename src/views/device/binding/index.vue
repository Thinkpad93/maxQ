<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="form" size="small" label-width="70px" label-position="left">
              <el-form-item label="学校名称">
                <el-select v-model="form.schoolName" filterable placeholder="请选择学校名称">
                  <el-option
                    v-for="item in schoolName"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>            
                </el-select>
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
       <el-table :data="tableData" style="width: 100%" border stripe size="mini" v-loading="loading">
         <el-table-column :resizable="false" label="序号" prop="deviceId"></el-table-column>
         <el-table-column :resizable="false" label="学校名称" prop="schoolName">
           <template slot-scope="scope">
             <a href="javascript:;">{{ scope.row.schoolName }}</a>
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
             <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row, 'edit')">编辑</el-button>
             <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
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
      form: {},
      edit: {},
      //默认参数
      query: {
        schoolid: 0,
        page: 1,
        page_size: 10
      },
      //学校名称
      schoolName: [
        { value: "1", label: "棠东小学" },
        { value: "2", label: "棠下一小" },
        { value: "3", label: "东风中小学" },
        { value: "4", label: "棠下小学" }
      ],      
      tableData: []
    };
  },
  methods: {
    //搜索
    search() {

    },
    handleEdit() {},
    handleDel() {},
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
  }
};
</script>
<style lang="less" scoped>
</style>
