//import db from '@/libs/db';


//保存登陆用户名
// export const SAVE_USER_INFO = (state, userInfo) => {
//   state.userInfo = Object.assign({}, userInfo);
// }

//将用户名保存到DB
// export const DB_SET_USER = (state, key) => {
//   const row = Object.assign({}, db.get('userInfo').write(), key);
//   if (Object.keys(row)) {
//     db.set('userInfo', {
//       name: row.name
//     }).write();
//   }
// }

//从DB获取用户名
// export const DB_GET_USER = (state) => {
//   const row = db.get('userInfo').value();
//   if (Object.keys(row)) {
//     state.userInfo.name = row ? row.name : '';
//   }
// }
