import service from "@/api";

export default {
  namespaced: true,
  state: {
    distpickerData: [],
    schoolInfo: {}
  },
  mutations: {
    GET_DISTPICKER: (state, data) => {
      state.distpickerData = data;
    }
  },
  actions: {
    qxregion({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        service.findAll({}).then(res => {
          if (res.errorCode === 0) {
            commit('GET_DISTPICKER', res.data);
          }
        })
      });
    }
  }
}
