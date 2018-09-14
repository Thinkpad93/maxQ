<template>
  <div class="tabs-control">
    <el-tabs class="" 
        type="card" 
        v-model="activeName" 
        :closable="true"
        @tab-click="handleClick">
        <el-tab-pane 
            v-for="(tab, index) in tabList"
            :key="index"
            :label="tab.meta.title" 
            :name="tab.name">
        </el-tab-pane> 
    </el-tabs>    
  </div>  
</template>
<script>
//在组件中分发 Action
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "tabs",
  data() {
    return {
      activeName: "first"
    };
  },
  watch: {
    $route(news, old) {
      this.addTabs();
    }
  },
  computed: {
    ...mapState("tabs", {
      tabList: state => state.tabList
    })
  },
  methods: {
    addTabs() {
      this.$store.commit("tabs/ADD_TABS", this.$route);
    },
    handleClick(tab) {
      let route = this.tabList.find(t => t.name === tab.name);
      if (route) {
        this.$router.push({ path: `${route.path}` });
      }
    }
  },
  mounted() {
    this.addTabs();
  }
};
</script>
<style lang="less" scoped>
.tabs-control {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 990;
  width: 100%;
}
</style>
