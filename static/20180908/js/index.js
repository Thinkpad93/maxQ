//接收父页面的事件保存消息
//接收父页面的上一页下一页事件消息(如果有的情况下)
//提交保存
const qxVM = new Vue({
  data: {
    baseUrl: "http://192.168.18.106:8080/qxiao-cms/action/mod-xiaojiao/channel/content/saveContentDetail.do",
    query: {},
    contentDetail: []
  },
  methods: {
    //contentId
    //提交保存
    saveContentDetail: function (params) {
      let that = this;
      axios.post(that.baseUrl, params).then(function (res) {
        that.handleSuccess({
          errorCode: res.data.errorCode,
          errorMsg: res.data.errorMsg
        });
      }).catch(function (error) {
        console.log(error);
      });
    },
    //接收父页面的数据
    handleMessage: function (event) {
      //数据源
      let data = event.data;
      switch (data.cmd) {
        case 'get':
          this.handleGet(data.params.contentId);
          break;
        case 'save':
          this.saveContentDetail(this.query.params);
          break;
      }
    },
    handleGet(contentId) {
      //this.query = Object.assign({}, data);
      //console.log(this.query);
      axios.post('http://192.168.18.106:8080/qxiao-cms/action/mod-xiaojiao/channel/content/queryDetailTemplate.do', {
        contentId: contentId
      }).then(function (res) {
        console.log(res);
      }).catch(function () {

      });
    },
    //往父页面发送消息
    handleSuccess: function (params) {
      window.parent.postMessage(params, "*");
    }
  },
  mounted: function () {
    window.addEventListener('message', this.handleMessage);
  },
}).$mount('#root');
