import cookie from "@/libs/cookie";
import service from "@/api";
import db from "@/libs/db";

export default {
  namespaced: true,
  actions: {
    async login({
      dispatch
    }, {
      vm,
      name,
      password
    }) {
      let res = await service.QXLogin();
      if (res.id === 101) {
        cookie.set('uuid', `${name}`);
        cookie.set('token', `${password}`);
        await dispatch('user/set', {
          name: name
        }, {
          root: true
        });
        vm.$router.replace({
          path: '/'
        });
      }
    },
    logout({
      dispatch
    }, {
      vm
    }) {
      vm.$confirm(`确定退出登陆吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {}).catch(error => {
        return false;
      })
    },
    load({
      dispatch
    }) {

    }
  }
}
