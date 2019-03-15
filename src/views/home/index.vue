<template>
  <div class="page">
    <div class="exception-content">
      <img src="@/assets/empty-content.png" alt style="max-width: 260px;">
      <div>
        <h3>页面暂无内容</h3>
        <p v-if="$route.meta.title">抱歉，页面暂无内容，请看看其他页面</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.exception-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  img {
    margin-right: 50px;
  }
  h3 {
    color: rgb(51, 51, 51);
    font-size: 24px;
    margin: 20px 0;
  }
  p {
    color: rgb(102, 102, 102);
    font-size: 16px;
  }
}
</style>
