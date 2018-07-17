'use strict'

const config = require('./config')
const { Producer, Message } = require('redis-smq')

try {
  const producer = new Producer(config.queueName, config)

  function produceMessage () {
    // todo: build a new message.
    const message = new Message()
    message.setBody({
      type: 'mail',
      title: 'message queue',
      content: 'a test message'
    })
    producer.produceMessage(message, (err) => {
      if (err) throw err
      setTimeout(produceMessage, 10000)
    })
  }

  produceMessage()
} catch (err) {
  console.log(err)
}
