import {
  userLogin
} from '@/api/login';

import '@/mock/login';

const state = {
  // 用户信息
  userInfo: {
    name: ''
  }
};
const getters = {};
const mutations = {};
const actions = {
  // 用户登陆
  login({
    commit,
    state
  }, userInfo) {
    console.log(userInfo);  
    return new Promise((resolve, reject) => {
      userLogin(userInfo).then(res => {
        console.log(res);  
        resolve(res)
      }).catch(error => {
        reject();  
      })
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
