<template>
  <div class="page">
    <!-- 表格数据 -->
    <template>
      <el-table :data="computed_page" style="width: 100%" border stripe size="mini" v-loading="loading">
          <el-table-column :resizable="false" width="100" label="序号" prop="repairId" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="学校名称" prop="schoolName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="设备编号" prop="deviceNo" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="安装位置" prop="address" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="故障时间" prop="faultTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="故障描述" prop="faultDescription" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="检修时间" prop="repairTime" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="检修结果" prop="repairResult" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="检修人员" prop="repairMan" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column :resizable="false" label="操作" width="200">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
            </template>            
          </el-table-column>
      </el-table>        
    </template> 
    <!-- 新增检修记录 -->
    <template>
      <el-dialog :close-on-click-modal="false" center @open="show" @close="close" top="40px" title="新增检修记录" :visible.sync="dialogAdd">
        <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="学校名称" prop="schoolid">
            <el-input v-model="addForm.schoolid" placeholder="请输入学校名称" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="故障时间" prop="fault_time">
            <el-date-picker
              v-model="addForm.fault_time"
              type="date"
              placeholder="选择故障时间">
            </el-date-picker>            
          </el-form-item>
          <el-form-item label="检修时间" prop="repair_time">
            <el-date-picker
              v-model="addForm.repair_time"
              type="date"
              placeholder="选择检修时间">
            </el-date-picker>             
          </el-form-item>          
          <el-form-item label="故障描述" prop="fault_description">
            <el-input type="textarea" v-model="addForm.fault_description" :rows="4" placeholder="请输入故障描述"></el-input>
          </el-form-item>
          <el-form-item label="检修结果" prop="repair_result">
            <el-input type="textarea" v-model="addForm.repair_result" :rows="4" placeholder="请输入检修结果"></el-input>
          </el-form-item>
          <el-form-item label="检修人员" prop="repair_man">
            <el-input v-model="addForm.repair_man" placeholder="请输入检修人员" maxlength="4"></el-input>
          </el-form-item>
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button :loading="btnloading" size="mini" type="primary" @click="addsForm('addForm')">保存</el-button>
          </el-row>             
        </el-form>
      </el-dialog>
    </template>   
    <!-- 编辑检修记录 -->
    <template>
      <el-dialog :close-on-click-modal="false" center @open="show" @close="close" top="40px" title="编辑检修记录" :visible.sync="dialogEdit">
        <el-form :rules="rules" ref="editForm" :model="edit" size="small" :label-width="formLabelWidth">
          <el-form-item label="学校名称" prop="schoolid">
            <el-input v-model="edit.schoolid" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="故障时间" prop="fault_time">
            <el-date-picker
              v-model="edit.fault_time"
              type="date"
              placeholder="选择故障时间">
            </el-date-picker>   
          </el-form-item>
          <el-form-item label="检修时间" prop="repair_time">
            <el-date-picker
              v-model="edit.repair_time"
              type="date"
              placeholder="选择检修时间">
            </el-date-picker>               
          </el-form-item>
          <el-form-item label="故障描述" prop="fault_description">
            <el-input type="textarea" v-model="edit.fault_description" :rows="4" placeholder="请输入故障描述"></el-input>
          </el-form-item>
          <el-form-item label="检修结果" prop="repair_result">
            <el-input type="textarea" v-model="edit.repair_result" :rows="4" placeholder="请输入检修结果"></el-input>
          </el-form-item>
          <el-form-item label="检修人员" prop="repair_man">
            <el-input v-model="edit.repair_man" placeholder="请输入检修人员" maxlength="4"></el-input>
          </el-form-item>
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogEdit = false">取消</el-button>
            <el-button :loading="btnloading" size="mini" type="primary" @click="editorForm('editForm')">保存</el-button>
          </el-row>              
        </el-form>
      </el-dialog>
    </template>        
  </div>  
</template>
<script>
export default {
  name: "record",
  data() {
    return {
      loading: false,
      dialogAdd: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      //默认参数
      query: {
        schoolid: 0,
        page: 1,
        page_size: 10
      },            
    };
  },
  methods: {
    show() {},
    close() {},    
  }
};
</script>
<style lang="less" scoped>
</style>
