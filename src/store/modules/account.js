import service from "@/api";

const state = {};

const mutations = {};

const actions = {
  async login({
    commit,
    state
  }, userInfo) {
    let res = await service.qxLogin({});
    console.log(userInfo);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
