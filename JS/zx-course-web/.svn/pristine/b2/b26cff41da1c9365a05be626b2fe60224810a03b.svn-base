'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PATH: '"/proxy/apicourse/web"',
  LOGIN_PATH: '"http://test.zhixue.com"',
  POCKET_BASE_PATH: '"http://test.zhixue.com/pocket"',
  STATIC_PATH: '""'
})
