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
    type: null, //账号类型 0-促进会 1-学校 2-教育局 3-培训机构
    menu: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_TYPE: (state, type) => {
      state.type = type;
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
            commit('SET_TOKEN', res.data.Authorization);
            setToken(res.data.Authorization);
            resolve(res);
          } else {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    //获取用户权限菜单，登陆后的操作
    querySystemMenus({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        service.querySystemMenus({}).then(res => {
          if (res.errorCode === 0) {
            if (res.data.router) {
              commit('SET_NAME', res.data.name);
              commit('SET_TYPE', res.data.type);
              commit('SET_MENU', res.data.router);
            }
            resolve(res);
          } else if (res.errorCode === -1) {
            console.log("获取用户权限菜单，登陆后的操作")
            commit('SET_TOKEN', '')
            removeToken();
            location.reload();
          }
        }).catch(error => {
          reject(error);
        })
      });
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
