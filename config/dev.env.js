'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.18.199:8081/qxiao-cms/"'
  //BASE_API: '"http://192.168.18.253:8081/qxiao-cms/"'
})
