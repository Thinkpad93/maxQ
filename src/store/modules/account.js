import cookie from "@/libs/cookie";
import service from "@/api";

const state = {};

const mutations = {};

const actions = {
  //登陆
  async login({
    dispatch,
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
