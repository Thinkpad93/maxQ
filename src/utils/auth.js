import Cookies from 'js-cookie';


//const TokenKey = 'QX-Token';
//const Token = 'Authorization';

export function getToken() {
  return Cookies.get('Authorization');
}

export function setToken(token) {
  return Cookies.set('Authorization', token);
}

export function removeToken() {
  return Cookies.remove('Authorization');
}
