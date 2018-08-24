<template>
  <div>
    <el-cascader
      v-model="selected"
      :options="allData"
      @change="handleRegionChange"
      :props="props"
    ></el-cascader>           
  </div>  
</template>
<script>
import { findAll } from "@/api/school";
export default {
  name: "region",
  props: {},
  data() {
    return {
      selected: [],
      allData: [],
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
    };
  },
  watch: {},
  methods: {
    handleRegionChange(value) {
      if (value.length >= 3) {
        let last = value[value.length -  1]; // 区
        this.$emit('last', last);
      }
    },
    //初始化
    //查询省市区所有数据
    init() {
      findAll({}).then(res => {
        if (res.errorCode === 0) {
          this.allData = res.data;
        }
      });
    },   
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
</style>
