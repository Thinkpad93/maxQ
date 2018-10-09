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
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
