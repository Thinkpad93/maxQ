import {
  userLogin
} from '@/api/login';
import '@/mock/login';
import db from '@/libs/db';










const state = {
  // 用户名
  userInfo: {
    name: ''
  }
};
const getters = {};
const mutations = {

  //设置用户名
  setUserInfo(state, info) {
    state.userInfo = Object.assign({}, info);
    if (Object.keys(state.userInfo)) {
      this.commit('save', info);
    }
  },

  //将用户名保存到数据库
  save(state, key) {
    const row = Object.assign(db.get('userInfo').write(), key);
    if (Object.keys(row)) {
      db.set('userInfo', {
        name: row.name
      }).write();
    }
  },

  getDbState(state, key) {
    const row = db.get('userInfo').value();
    state.userInfo.name = row ? row.name : '';
  }


};
const actions = {
  // 用户登陆
  adminLogin({
    commit,
    state
  }, userInfo) {
    return new Promise((resolve, reject) => {
      userLogin(userInfo).then(res => {
        resolve(res)
        commit('setUserInfo', userInfo);
      }).catch(error => {
        reject();
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
