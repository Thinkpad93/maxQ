<template>
  <div class="page">
    <template>
      <qx-treeTable :data="data" :columns="columns"></qx-treeTable> 
    </template>    
  </div>  
</template>
<script>
import treeTable from "@/components/treeTable";
export default {
  name: "menus",
  components: {
    "qx-treeTable": treeTable
  },
  data() {
    return {
      data: [],
      columns: [
        {
          text: '事件',
          value: 'event',
          width: 200
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '时间线',
          value: 'timeLine'
        },
        {
          text: '备注',
          value: 'comment'
        }        
      ]
    };
  },
  methods: {},
  created() {}
};
</script>
<style lang="less" scoped>
</style>
