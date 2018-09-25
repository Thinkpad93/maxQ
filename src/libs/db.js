/*
 * @Author: 1993n 
 * @Date: 2018-09-20 17:52:18 
 * @Last Modified by: 1993n
 * @Last Modified time: 2018-09-25 18:57:55
 */

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);


// 初始化数据库
db.defaults({
  sys: {
    name: ''
  }
}).write();


export default db;
