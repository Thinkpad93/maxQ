<template>
  <div class="page">
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
                <qx-region @last="lastChange"></qx-region>
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
              :element-loading-text="loadingText"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
              <a href="javascript:;" @click="showDeviceDetail(item.deviceId)">
                <img src="http://temp.im/466x300/4CD964/fff" class="image">
              </a>
              <div class="layer">
                <h4>
                  <template v-if="item.schoolName !== null">{{ item.schoolName }}</template>
                  <template v-else>该设备无标题</template>
                </h4>
                <span>{{ item.postTime }}</span>
                <div class="status">
                  <span v-if="item.status === 0" style="color:#67C23A">正常</span>
                  <span v-else-if="item.status === 1" style="color:#F56C6C">故障</span>
                  <span v-else style="color:#909399">正常关机</span>
                </div>
                <div class="handle">
                  <el-button size="mini" type="text" @click="handleRestart(item)">重启</el-button>
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
        <el-row :gutter="10">
          <el-col :span="8">
            <img src="http://temp.im/300x600/4CD964/fff" class="image">
          </el-col>
          <el-col :span="16">
            <div class="list">
              <p>截屏时间：<span>{{ viewDevice.snapshotTime }}</span></p>
              <p>学校：<span>{{ viewDevice.schoolName }}</span></p>
              <p>设备编号：<span>{{ viewDevice.deviceNo }}</span></p>
              <p>设备IP：<span>{{ viewDevice.ip }}</span></p>
              <p>MAC地址：<span>{{ viewDevice.mac }}</span></p>
              <p>设备状态：<span>{{ viewDevice.status }}</span></p>
              <p>安装位置：<span>{{ viewDevice.address }}</span></p>
              <p>设备管理员：<span>{{ viewDevice.manager }}</span></p>
              <p>联系电话：<span>{{ viewDevice.phone }}</span></p>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </template>
  </div>  
</template>
<script>
import service from "@/api";
import region from "@/components/region";
export default {
  name: "monitoring",
  components: {
    'qx-region': region
  },
  data() {
    return {
      dialogAdd: false,
      dialogView: false,
      loading: false,
      loadingText: "",
      schoolList: [],
      schoolId: null,
      query: {
        schoolId: 0,
        status: 0,
        page: 1,
        pageSize: 20
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
      viewDevice: {},
      tableData: []
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    search() {
      if (this.schoolId === null) {
        this.$message({ message: "请选择学校名称", type: "warning" });
      } else {
        this.showDeviceStatus();
      }
    },
    async lastChange(value) {
      let last = value[value.length - 1];
      let res = await service.queryRegion({ queryId: last, queryType: 3 });
      if (res.errorCode === 0) {
        this.schoolList = res.data;
      } else {
        return false;
      }
    },
    handleSchool(value) {
      this.query.schoolId = value;
    },
    handleRegion(list) {
      if (Array.isArray(list)) {
        this.schoolList = list;
      }
    },
    handleSelect() {},
    handleRestart(item) {
      let that = this;
      let params = {
        deviceId: item.deviceId,
        cmdName: "content_update",
        cmdData: ""
      };
      that.loadingText = "设备重启中";
      that.$set(item, "loading", true);
      setTimeout(() => {
        that.sendDeviceCommand(params, item);
      }, 1000);
    },
    handleUpdate(item) {
      let that = this;
      let params = {
        deviceId: item.deviceId,
        cmdName: "content_refresh",
        cmdData: ""
      };
      that.loadingText = "设备刷新中";
      that.$set(item, "loading", true);
      setTimeout(() => {
        that.sendDeviceCommand(params, item);
      }, 1000);
    },
    handleMon() {},
    //显示设备详情
    async showDeviceDetail(deviceId) {
      let res = await service.showDeviceDetail({ deviceId });
      if (res.errorCode === 0) {
        this.viewDevice = res.data[0];
        this.dialogView = true;
      }
    },
    //显示设备状态列表
    async showDeviceStatus() {
      let res = await service.showDeviceStatus(this.query);
      if (res.errorCode === 0) {
        let data = res.data.data;
        if (!Array.isArray(data)) {
          data = [];
        } else {
          this.tableData = data;
        }
      }
    },
    //发送设备命令
    async sendDeviceCommand(params = {}, item) {
      let res = await service.sendDeviceCommand(params);
      if (res.errorCode === 0) {
        this.$set(item, "loading", false);
        this.$message({ message: `${res.errorMsg}`, type: "success" });
      }
    }
  },
  mounted() {
    this.showDeviceStatus();
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
  > a {
    display: block;
  }
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
.list {
  font-size: 15px;
  color: #333;
  p {
    padding: 15px 0;
    border-bottom: 1px solid rgba(220, 223, 230, 0.5);
  }
  span {
    color: #409eff;
  }
}
</style>
