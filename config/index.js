'use strict'

const path = require('path')

module.exports = {
  queueName: 'this-is-a-redis-queue',
  redis: {
    host: '127.0.0.1',
    port: 32772
  },
  monitor: {
    enabled: true,
    host: '127.0.0.1',
    port: 3000
  }
}
