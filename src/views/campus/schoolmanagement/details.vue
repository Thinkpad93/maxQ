<template>
   <div class="page">
      {{ $route.path }} 
      {{ $route.query.schoolId }} 
   </div> 
</template>
<script>
export default {
    name: "schoolDetails",
    data() {
        return {}
    }    
}
</script>
<style lang="less" scoped>

</style>
