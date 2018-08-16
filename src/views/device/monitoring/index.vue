<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <region @change="handleRegion"></region>
              </el-form-item>  
              <el-form-item label="学校名称">
                <el-select v-model="schoolId" clearable filterable placeholder="选择学校" @change="handleSchool">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option> 
                </el-select>
              </el-form-item>                         
              <el-form-item label="设备状态">
                <el-select v-model="query.status" clearable placeholder="请选择设备状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>                  
                </el-select>
              </el-form-item> 
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              </el-form-item>              
            </el-form>
          </div>
        </el-col>
      </el-row>      
    </template> 
    <!-- 设备列表 -->
    <template>
      <div class="container-block">
        <el-row :gutter="20">
          <el-col :span="4" v-for="(item,index) in tableData" :key="index">
            <div class="waterfall-panel"
              v-loading="item.loading"
              element-loading-text="设备刷新中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
              <a href="javascript:;">
                <img src="http://temp.im/466x300/4CD964/fff" class="image">
              </a>
              <div class="layer">
                <h4>{{ item.schoolName }}</h4>
                <span>{{ item.postTime }}</span>
                <div class="status">
                  <span v-if="item.status === 0" style="color:#67C23A">正常</span>
                  <span v-else-if="item.status === 1" style="color:#F56C6C">故障</span>
                  <span v-else style="color:#909399">正常关机</span>
                </div>
                <div class="handle">
                  <el-button size="mini" type="text" @click="handleRestart">重启</el-button>
                  <el-button size="mini" type="text" @click="handleUpdate(item)">刷新</el-button>
                  <el-button size="mini" type="text" @click="handleMon">实时监控</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!-- 设备详情 -->
    <template>
      <el-dialog width="50%" center top="40px" title="设备详情查看" :visible.sync="dialogView" :modal-append-to-body="false">
        
      </el-dialog>
    </template>
  </div>  
</template>
<script>
import { showDeviceStatus, sendDeviceCommand } from "@/api/device";
import region from "@/components/region";
export default {
  name: "monitoring",
  components: {
    region
  },  
  data() {
    return {
      dialogAdd: false,
      dialogView: false,
      loading: false,
      //学校名称
      schoolList: [],
      schoolId: null,
      query: {
        schoolId: 0,
        status: 0,
        page: 1,
        pageSize: 10
      },
      options: [
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "故障"
        },
        {
          value: 2,
          label: "正常关机"
        }
      ],
      tableData: []
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    search() {},
    handleRegion(list) {
      if (Array.isArray(list)) {
        this.schoolList = list;
      }
    },    
    handleSelect() {},
    handleRestart() {
      this.$confirm("您确定要对设备进行重启操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });      
    },
    handleUpdate(item) {
      let that = this;
      that.$set(item, "loading", true);
      setTimeout(() => {
        this.$set(item, "loading", false);
        this.$message({ message: "设备刷新成功", type: "success" });
      }, 2000);
    },
    handleMon() {},
    //显示设备状态列表
    createTable() {
      showDeviceStatus(this.query).then(res => {
        console.log(res);
        if (res.errorCode === 0) {
          this.tableData = res.data;  
        }
      })
    }
  },
  mounted() {
    this.createTable();
  }
};
</script>
<style lang="less" scoped>
.container-block {
  padding: 20px 20px 0 20px;
  background-color: #fff;
}
.waterfall-panel {
  border-radius: 2px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
}
.layer {
  padding: 10px;
  h4 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  > span {
    color: #9a9a9a;
    display: block;
  }
}
.status {
  margin: 5px 0;
}
</style>
