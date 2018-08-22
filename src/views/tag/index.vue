<template>
   <div class="page">
     <template>
        <el-cascader
            size="mini"
            v-model="selectedOptions3"
            :options="options2"
            @active-item-change="handleItemChange"
            :props="props"
        ></el-cascader>
     </template>  
     <template>
         <el-table :data="tableData" style="width: 100%" border stripe size="mini" empty-text="没有标签哦" v-loading="loading">
             <el-table-column label="标签ID" prop="labelId"></el-table-column>
            <el-table-column label="标签名称" prop="tagName" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <template v-if="scope.row.show">
                            <el-input v-model="scope.row.name" size="mini"></el-input>
                        </template>
                        <template v-else>
                            <p>{{ scope.row.name }}</p>
                        </template>
                    </template>
            </el-table-column>
            <el-table-column label="描述" prop="description" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <template v-if="scope.row.show">
                            <el-input v-model="scope.row.desription" size="mini"></el-input>
                        </template>
                        <template v-else>
                            <p>{{ scope.row.desription }}</p>
                        </template>                        
                    </template>
                </el-table-column>
                <el-table-column label="标签类型" prop="type">
                    <template slot-scope="scope">
                        <template v-if="scope.row.show">
                            <el-select v-model="scope.row.type" size="mini">
                                <el-option
                                    v-for="item in labelsList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>            
                            </el-select>   
                        </template>
                        <template v-else>
                            <p v-if="scope.row.type === 0">缺省</p>
                            <p v-else-if="scope.row.type === 1">特色</p>
                            <p v-else-if="scope.row.type === 2">商圈</p>
                            <p v-else="scope.row.type === 3">冠名企业</p>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <template v-if="scope.row.show">
                            <el-button size="mini" type="success" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                        </template>
                        <template v-else>
                            <el-button :disabled="scope.row.state === 0" icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        </template>
                    </template>
                </el-table-column>
         </el-table>
     </template>  
   </div> 
</template>
<script>
import { queryRegion, queryLabel } from "@/api/school";
export default {
  name: "tag",
  data() {
    return {
      loading: false,
      region: {
        queryId: 0,
        queryType: 0
      },
      options2: [],
      selectedOptions3: [],
      props: {
        value: "value",
        label: "name",
        children: "cities"
      },
      labelsList: [],
      tableData: []
    };
  },
  methods: {
    handleItemChange(val) {
      let len = val.length;
      //省
      if (len == 1) {
        this.region.queryId = val[0];
        this.region.queryType = 1;
        // queryRegion(this.region).then(res => {
        //   if (res.errorCode === 0) {
        //     this.options2[len - 1].cities = res.data.map((v, i) => {
        //       return {
        //         value: v.id,
        //         label: v.name,
        //         cities: []
        //       };
        //     });
        //   }
        // });
      }
      //市
      if (len == 2) {
        this.region.queryId = val[val.length - 1];
        this.region.queryType = 2;
        queryRegion(this.region).then(res => {
          if (res.errorCode === 0) {
            this.options2[len - 1].cities[len].cities = res.data.map((v, i) => {
              return {
                value: v.id,
                label: v.name
              };
            });
          }
        });
      }
      //区
      if (len == 3) {
        console.log(len);
        //this.options2[0].cities[0].cities = [{  value: 'xiaolv', label: '效率' }]
      }

      // let va = val[0];
      // let rObj = {};

      // let newt = this.options2.forEach(element => {
      //   if (element.value == va) {
      //     rObj = Object.assign({}, element);
      //   }
      // });
      // queryRegion({ queryId: rObj.value, queryType: 1 }).then(res => {
      //   this.options2[0].cities = res.data.map((v, i) => {
      //     return {
      //       value: v.id,
      //       label: v.name,
      //       cities: []
      //     };
      //   });
      // });
    },
    handleEdit(row) {
      this.$set(row, "show", true);
      this.$set(row, "state", 1);
    },
    handleSave(index, row) {},
    //初始数据加载
    getRegiosList(params = {}) {
      queryRegion(params).then(res => {
        if (res.errorCode === 0) {
          this.options2 = res.data.map((v, i) => {
            return {
              value: v.id,
              label: v.name,
              cities: []
            };
          });
        }
      });
    },
    //查询标签
    getLabel() {
      queryLabel({ queryType: 0 }).then(res => {
        if (res.errorCode === 0) {
          this.tableData = res.data;
          this.labelsList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getLabel();
    this.getRegiosList({ queryId: 0, queryType: 0 });
  }
};
</script>
<style lang="less" scoped>
</style>
