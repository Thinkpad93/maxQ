import db from "@/libs/db";

export default {
  namespaced: true,
  state: {
    //用户信息
    info: {
      name: ""
    }
  },
  mutations: {
    dbset(state, key) {
      db.set('sys.name', key).write();
    },
    dbget(state) {
      let name = db.get('sys.name').value();
      return name ? state.info.name = name : 'QX管理员';
    }
  },
  actions: {
    set({
      commit,
      dispatch,
      state
    }, params) {
      return new Promise(async resolve => {
        state.info.name = params.name;
        commit('dbset', state.info.name);
        resolve();
      });
    }
  }
}
