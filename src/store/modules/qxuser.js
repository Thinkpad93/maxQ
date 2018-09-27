import service from "@/api";
import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";


export default {
  namespaced: true,
  state: {
    token: getToken(),
    name: "",
    menu: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
    }
  },
  actions: {
    // 用户名登录
    qxLoginByUsername({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        service.login(userInfo).then(res => {
          if (res.errorCode === 0) {
            commit('SET_TOKEN', 'QX-Token');
            setToken('QX-Token');
            resolve(res);
          } else {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 获取用户信息
    qxGetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        service.QXLogin2({}).then(res => {
          const data = res.data;
          if (data.router && data.router.length) {
            commit('SET_MENU', data.router);
          }
          commit('SET_NAME', data.name);
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 登出
    qxLogout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        service.logout({}).then(res => {
          if (res.errorCode === 0) {
            commit('SET_TOKEN', '')
            removeToken();
            resolve(res);
          } else {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        })
      });
    }
  }
}
