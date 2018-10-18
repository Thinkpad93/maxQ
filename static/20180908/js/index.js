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
      componentValue: "大吉大利",
      contentId: 34,
    }, {
      componentValue: "肯定有一个ids[i]的值是，所以导致转换成int失败。",
      contentId: 35,
    }]
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
