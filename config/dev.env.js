'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://120.77.233.111:8080/qxiao-cms/"'
  BASE_API: '"http://192.168.18.113:8081/qxiao-cms/"'
})
