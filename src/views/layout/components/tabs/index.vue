<template>
  <div class="q-tabs">
    <el-tabs
      v-model="activeName2"
      type="card"
      :closable="true"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane v-for="tab in tabList" :key="tab.path" :name="tab.path" :label="tab.meta.title"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
//在组件中分发 Action
import { mapState, mapActions } from "vuex";
export default {
  name: "tabs",
  data() {
    return {};
  },
  watch: {
    $route(news, old) {
      return this.$store.commit("tabs/adds", this.$route);
    }
  },
  computed: {
    activeName2: {
      get() {
        return this.$route.path;
      },
      set() {}
    },
    ...mapState("tabs", ["tabList"])
  },
  methods: {
    ...mapActions("tabs", ["removes"]),
    handleTabClick(tab) {
      if (tab.name === this.$route.path) {
        return;
      } else {
        this.$router.push({ path: tab.name });
      }
    },
    handleTabRemove(name) {
      if (name) {
        this.removes(name).then(res => {
          console.log(res);
          const latestView = res.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push({ path: "/" });
          }
        });
      }
    }
  },
  mounted() {
    return this.$store.commit("tabs/adds", this.$route);
  }
};
</script>
<style lang="less" scoped>
.q-tabs {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 990;
  width: 100%;
  display: flex;
  background-color: #fff;
}
</style>
