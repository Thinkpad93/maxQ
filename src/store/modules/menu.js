import db from "@/libs/db";

export default {
  namespaced: true,
  state: {
    menuList: []
  },
  mutations: {
    dbset(state, menuList) {
      let row = db.set('sys.menuList', menuList).write();
    },
    dbget(state) {
      let menu = db.get('sys.menuList').value();
      return menu.length ? state.menuList = menu : state.menuList = [];
    }
  },
  actions: {
    addMenu({
      commit,
      state
    }, router) {
      state.menuList = router;
      commit('dbset', state.menuList);
    }
  }
}
