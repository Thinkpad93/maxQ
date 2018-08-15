import { isMac, isPhone } from "@/utils/validator";
const Mixin = {
  data() {
    return {
      rules: {
        schoolId: [
          {
            required: true,
            message: "请选择学校名称",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入安装位置",
            trigger: "blur"
          }
        ],
        batch: [
          {
            required: true,
            message: "请输入设备批次",
            trigger: "blur"
          }
        ],
        serial: [
          {
            required: true,
            message: "请选择设备序号",
            trigger: "blur"
          }
        ],
        // labelIds: [
        //   {
        //     required: true,
        //     message: "请选择冠名企业",
        //     trigger: "blur"
        //   }
        // ],
        mac: [
          {
            required: true,
            message: "请输入MAC地址",
            trigger: "blur"
          },
          {
            required: true,
            validator: isMac,
            trigger: "blur"
          }
        ],
        manager: [
          {
            required: true,
            message: "请输入设备管理员",
            trigger: "blur"
          },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ]
      },      
    }
  },
  methods: {
    show() {
      this.$nextTick(function () {  
        //this.edit.sponsors.push(2, 22);
      });
    },
    close() {}
  }
}


export default Mixin;
