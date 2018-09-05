<template>
  <div>
    <el-cascader
      :clearable="true"
      :disabled="disabled"
      :value="value"
      :options="allData"
      @change="handleRegionChange"
      @input="input"
      :props="propss"
    ></el-cascader>           
  </div>  
</template>
<script>
import { findAll } from "@/api/school";
export default {
  name: "region",
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      allData: [],
      //selected: [],
      propss: {
        value: "id",
        label: "name",
        children: "children"
      },
    };
  },
  watch: {},
  methods: {
    input() {},
    handleRegionChange(value) {
      if (Array.isArray(value)) {
        this.$emit('last', value);
      }
      // if (value.length >= 3) {
      //   let last = value[value.length -  1]; // 区
      //   this.$emit('last', last);
      // }
    },
    //初始化查询省市区所有数据
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
