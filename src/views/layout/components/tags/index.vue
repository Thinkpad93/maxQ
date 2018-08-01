<template>
  <div class="tags-contaier">
    <router-link 
        v-for="tag in tagList" 
        :key="tag.path" 
        :to="tag.path">
        {{ tag.name }}
        <template v-if="tag.path !== '/home'">
          <i class='el-icon-close' @click.prevent.stop="closeTag(tag)"></i>
        </template>
    </router-link>      
  </div>  
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "tags",
  data() {
    return {};
  },
  watch: {
    $route(news, old) {
      this.addTag();
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tag.tagList
    })
  },
  methods: {
    addTag() {
      let route = this.$route.name ? this.$route : false;
      if (!route) {
        return false;
      }
      this.$store.commit("TAG_ADD", route);
    },
    closeTag(tag) {}
  },
  mounted() {
    this.addTag();
  }
};
</script>
<style lang="less" scoped>
.tags-contaier {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 990;
  width: 100%;
  display: flex;
  background-color: #fff;
  box-shadow: 0 1px 13px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  a {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 30px;
    min-width: 50px;
    padding: 0 10px;
    color: #909399;
    font-size: 12px;
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
</style>
