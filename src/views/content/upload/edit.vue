<template>
   <div class="page">
       <div class="upload-add">
           <el-row :gutter="10">
               <el-col :span="8">
                   <h2>{{ params.channelName }}</h2> 
               </el-col>
           </el-row>
       </div>
   </div> 
</template>
<script>
export default {
  name: "uploadEdit",
  data() {
    return {
      params: {}
    };
  },
  mounted() {},
  activated() {
    this.params = this.$route.params;
  }
};
</script>
<style lang="less" scoped>
</style>
