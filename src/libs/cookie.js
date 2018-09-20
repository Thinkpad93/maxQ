/*
 * @Author: 1993n 
 * @Date: 2018-09-20 17:48:57 
 * @Last Modified by: 1993n
 * @Last Modified time: 2018-09-20 18:06:28
 */
import Cookies from 'js-cookie';

const cookie = {};

/**
 * 
 * @param {String} name 
 * @param {String} value 
 * @param {Object} cookieSetting 
 */
cookie.set = (name, value, cookieSetting = {}) => {
  return Cookies.set(`qx-${name}`, value, cookieSetting)
}

//获取cookie
cookie.get = (name) => {
  return Cookies.get(`qx-${name}`);
}

//删除cookie
cookie.remove = (name) => {
  return Cookies.remove(`qx-${name}`);
}

export default cookie;
