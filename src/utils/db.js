import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);


// 初始化数据库
db.defaults({ userInfo: {} }).write();


export default db;
