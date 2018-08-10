//rule 是验证格式和字段名
//验证成功后一定要调用回调函数
export const isMac = (rule, value, callback) => {
  let mac = value.toLocaleUpperCase();
  let reg = new RegExp(/[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/);
  if (!reg.test(mac)) {
    return callback(new Error('输入的mac地址格式不正确，请以xx:xx:xx:xx:xx:xx的形式输入'));
  }
  callback();
}

export const isPhone = (rule, value, callback) => {
  if (!(/^1\d{10}$/.test(value))) {
    return callback(new Error('请正确输入手机号'));
  }
  callback();
}
