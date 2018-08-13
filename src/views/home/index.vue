<template>
   <div class="page">
    <template>
        <el-progress type="circle" :percentage="0"></el-progress>
        <el-progress type="circle" :percentage="25"></el-progress>
        <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
        <el-progress type="circle" :percentage="100" status="success"></el-progress>
        <el-progress type="circle" :percentage="50" status="exception"></el-progress>      
    </template>
    </div> 
</template>
<script>
export default {
  name: "home",
  data() {
    return {};
  },
  created() {}
};
</script>
<style lang="less" scoped>
</style>
