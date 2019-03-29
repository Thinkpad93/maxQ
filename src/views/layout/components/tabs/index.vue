<template>
  <div class="tabs-contaier">
    <router-link v-for="tab in tabList" :key="tab.path" :to="tab.path">
      {{ tab.meta.title }}
      <template v-if="tab.path !== '/home'">
        <i class="el-icon-close" @click.prevent.stop="removeAction(tab)"></i>
      </template>
    </router-link>
  </div>
  <!-- <div class="q-tabs">
    <el-tabs
      v-model="activeName2"
      type="card"
      :closable="true"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane v-for="tab in tabList" :key="tab.path" :name="tab.path" :label="tab.meta.title"></el-tab-pane>
    </el-tabs>
  </div>-->
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
    // activeName2: {
    //   get() {
    //     return this.$route.path;
    //   },
    //   set() {}
    // },
    ...mapState("tabs", ["tabList"])
  },
  methods: {
    ...mapActions("tabs", ["removes"]),
    removeAction(tab) {
      this.removes(tab).then(res => {
        if (tab.path === this.$route.path) {
          const latestView = res.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push({ path: "/" });
          }
        }
      });
    }
    // handleTabClick(tab) {
    //   if (tab.name === this.$route.path) {
    //     return;
    //   } else {
    //     this.$router.push({ path: tab.name });
    //   }
    // },
    // handleTabRemove(name) {
    //   if (name) {
    //     this.removes(name).then(res => {
    //       console.log(res);
    //       const latestView = res.slice(-1)[0];
    //       if (latestView) {
    //         this.$router.push(latestView);
    //       } else {
    //         this.$router.push({ path: "/" });
    //       }
    //     });
    //   }
    // }
  },
  mounted() {
    return this.$store.commit("tabs/adds", this.$route);
  }
};
</script>
<style lang="less" scoped>
.tabs-contaier {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 990;
  width: 100%;
  display: flex;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  a {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 40px;
    min-width: 50px;
    padding: 0 10px;
    color: #909399;
    font-size: 13px;
    i {
      display: inline-block;
      margin-left: 5px;
      border-radius: 50%;
      color: #fff;
      background-color: #ccc;
    }
    &.router-link-exact-active {
      color: #333;
      background-color: #f6f6f6;
      i {
        background-color: #409eff;
      }
    }
  }
}
// .q-tabs {
//   position: absolute;
//   left: 0;
//   top: 0;
//   z-index: 990;
//   width: 100%;
//   display: flex;
//   background-color: #fff;
// }
</style>
