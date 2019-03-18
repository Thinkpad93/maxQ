<template>
  <div class="page"></div>
</template>
<script>
import service from "@/api";
export default {
  name: "worksAdd",
  data() {
    return {
      form: {
        title: "",
        type: 1,
        uploadType: 0,
        images: [],
        compressFile: ""
      }
    };
  },
  methods: {
    //作品上传
    async uploadWorks(params = {}) {
      let res = await service.uploadWorks(params);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
