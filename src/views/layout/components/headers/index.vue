<template>
   <header id="header">
     <h1 class="h1">
       <img src="../../../../images/all.png"></img>  
     </h1>   
     <div class="toggle-aside" @click="toggle">
       <i class="icon iconfont icon-weibiaoti26"></i>
     </div>
   </header>   
</template>
<script>
export default {
    name: 'headers',
    data() {
        return {}
    },
    methods: {
       toggle() {
        this.$emit('toggle');
       }
    }    
}
</script>
<style lang="less" scoped>
#header {
  height: 60px;  
  background-color: #ebf1f6;  
  h1 {
    float: left;
    width: 200px;
    text-align: center;
    img {
       width: 120px;
       height: 60px;
    }
  } 
  .toggle-aside {
    float: left;
    cursor: pointer;
    line-height: 60px;
    i {
      font-size: 26px;
      color: #606266;
    }
  }
}
</style>
