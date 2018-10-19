//接收父页面的事件保存消息
//接收父页面的上一页下一页事件消息(如果有的情况下)
//提交保存
let d = {
  template: "#tpl",
  props: {
    value: {
      type: String,
      default: ""
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      innerText: this.value,
      isLocked: false
    };
  },
  watch: {
    value: function () {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    changeText: function () {
      this.$emit("input", this.$el.innerHTML);
    }
  }
};
const qx = new Vue({
  components: {
    "v-edit-div": d
  },
  data: {
    baseUrl: "http://192.168.18.107:8080/qxiao-cms/action/mod-xiaojiao/channel/content/saveContentDetail.do",
    query: {},
    contentDetail: [{
        componentValue: "这里记录过去一周，我看到的值得分享的东西，每周五发布。",
        contentId: 34,
      }, {
        componentValue: "上图中，按钮的宽度没变，但是输入框变宽了，等于当前行的宽度减去按钮的宽度。我们做一点改变，在按钮里面插入一张图片。",
        contentId: 35,
      },
      {
        componentValue: "前面说过，弹性布局默认不改变项目的宽度，但是它默认改变项目的高度。如果项目没有显式指定高度，就将占据容器的所有高度。 本例中，按钮变高了，导致表单元素也变高了，使得输入框的高度自动拉伸了。",
        contentId: 36
      }
    ]
  },
  methods: {
    //contentId
    //提交保存
    saveContentDetail: function () {
      let that = this;
      let obj = Object.assign({}, this.query, {
        contentDetail: this.contentDetail
      });
      axios
        .post(that.baseUrl, obj)
        .then(function (res) {
          that.handleSuccess(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //接收父页面的数据
    handleMessage: function (event) {
      //数据源
      let data = event.data;
      console.log(data);
      // switch (data.cmd) {
      //   case "get":
      //     this.handleGet(data.params.contentId);
      //     break;
      //   case "save":
      //     this.saveContentDetail();
      //     break;
      // }
    },
    handleGet(contentId) {
      let that = this;
      let params = new URLSearchParams();
      params.append("contentId", contentId);
      axios
        .post(
          "http://192.168.18.107:8080/qxiao-cms/action/mod-xiaojiao/channel/content/queryDetailTemplate.do",
          params
        )
        .then(function (res) {
          let {
            contentDetail,
            ...args
          } = res.data.data[0];
          that.contentDetail = contentDetail;
          that.query = Object.assign({}, args);
        })
        .catch(function () {});
    },
    //往父页面发送消息
    handleSuccess: function (res) {
      window.parent.postMessage({
        cmd: "success",
        params: {
          errorCode: res.data.errorCode,
          errorMsg: res.data.errorMsg
        }
      }, "*");
    }
  },
  mounted: function () {
    window.addEventListener("message", this.handleMessage);
  },
  activated: function () {
    //console.log("010101");
  }
}).$mount("#root");
