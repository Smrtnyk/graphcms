//require('@babel/register')
//require('@babel/polyfill')
//require('core-js')
//require('regenerator-runtime/runtime')

const server = require('../../src/server').default

module.exports = async () => {
  global.httpServer = await server.start({ port: 4000 })
}