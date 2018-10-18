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
    },
    SET_SCHOOLINFO: (state, data) => {
      state.schoolInfo = data;
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
    },
    //查询学校详情信息
    querySchoolInfo({
      commit,
      state
    }, schoolId) {
      console.log(schoolId);
      return new Promise((resolve, reject) => {
        service.querySchoolInfo({
          schoolId
        }).then(res => {
          if (res.errorCode === 0) {
            commit('SET_SCHOOLINFO', res.data);
          }
        })
      });
    }
  }
}
