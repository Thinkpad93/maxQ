//栏目优先级
export const priority = {
  data() {
    return {
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
    }
  }
}

//栏目属性
export const scrollType = {
  data() {
    return {
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

//栏目有效期
export const validType = {
  data() {
    return {
      validTypelist: [{
          name: "长期",
          value: 0
        },
        {
          name: "自定义",
          value: 1
        }
      ]
    }
  }
}

//账号类型
export const accountType = {
  data() {
    return {
      typeList: [{
          id: 0,
          name: "促进会"
        },
        {
          id: 1,
          name: "学校"
        },
        {
          id: 2,
          name: "教育局"
        },
        {
          id: 3,
          name: "培训机构"
        }
      ],
    }
  }
}


//设备状态
export const device = {
  data() {
    return {
      deviceStatus: [{
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "故障"
        },
        {
          value: 2,
          label: "正常关机"
        }
      ]
    }
  }
}

//内容属性
export const contentProperty = {
  data() {
    return {
      contentPropertyList: [{
          value: 0,
          label: "原创"
        },
        {
          value: 1,
          label: "摘要"
        }
      ],
    }
  }
}

//展示形式
export const contentTemplate = {
  data() {
    return {
      contentTemplateList: [{
          value: 3,
          label: "纯图片"
        },
        {
          value: 4,
          label: "上视频下图片"
        },
        {
          value: 5,
          label: "上图片下视频"
        },
        {
          value: 6,
          label: "门户网站"
        }
      ],
    }
  }
}

//审核状态
export const verifyStatus = {
  data() {
    return {
      verifyStatusList: [{
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "审核通过"
        },
        {
          value: 2,
          label: "审核不通过 "
        }
      ]
    }
  }
}

//学校性质
export const property = {
  data() {
    return {
      propertyidList: [{
          id: 1,
          name: "公立"
        },
        {
          id: 2,
          name: "私立"
        },
        {
          id: 3,
          name: "民办"
        }
      ]
    }
  }
}

//学校类型
export const typeid = {
  data() {
    return {
      typeidList: [{
          id: 1,
          name: "学龄前"
        },
        {
          id: 2,
          name: "小学"
        },
        {
          id: 3,
          name: "初中"
        },
        {
          id: 4,
          name: "高中"
        },
        {
          id: 5,
          name: "大学"
        }
      ]
    }
  }
}
