const Mixin = {
  data() {
    return {
      //栏目优先级
      priorityList: [{
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ],
      //栏目属性
      scrollTypeList: [{
          name: "非滚动",
          value: 0
        },
        {
          name: "滚动",
          value: 1
        }
      ],
    }
  }
}



export default Mixin;
