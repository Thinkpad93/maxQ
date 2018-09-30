<template>
  <div>
    <el-cascader
      :clearable="true"
      :disabled="disabled"
      :value="value"
      :options="distpickerData"
      @change="handleRegionChange"
      @input="input"
      :props="propss"
    ></el-cascader>           
  </div>  
</template>
<script>
import { mapState } from "vuex";
import service from "@/api";
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
      //allData: [],
      propss: {
        value: "id",
        label: "name",
        children: "children"
      }
    };
  },
  computed: {
    ...mapState("comm", ["distpickerData"])
  },
  watch: {},
  methods: {
    input() {},
    handleRegionChange(value) {
      if (Array.isArray(value)) {
        this.$emit("last", value);
      }
    }
    //初始化查询省市区所有数据
    // async init() {
    //   let res = await service.findAll({});
    //   if (res.errorCode === 0) {
    //     this.allData = res.data;
    //   }
    // },
  },
  mounted() {
    //this.init();
  }
};
</script>
<style lang="less" scoped>
</style>
