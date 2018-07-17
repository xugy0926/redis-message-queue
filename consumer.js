'use strict'

const config = require('./config')
const redisSMQ = require('redis-smq')
const mailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const author = {
  host: 'smtp.mxhichina.com', // change your email host
  port: 465,
  auth: {
    user: 'noreply@xugaoyang.com', // change your user
    pass: '****' // change your pass
  }
}

const transporter = mailer.createTransport(smtpTransport(author))

function sendmail(message) {
  if (message.type === 'email') {
    let mailOptions = {
      from: '"xugaoyang" <noreply@xugaoyang.com>', // change your name
      to: 'i@xugaoyang.com', // change your to user
      subject: 'message queue',
      text: JSON.stringify(message)
    }
  
    transporter.sendMail(mailOptions, err => {
      if (err) {
        console.log(err)
      } else {
        console.log('success')
      }
    })
  } else {
    console.log('no support type.');
  }
}

const Consumer = redisSMQ.Consumer

class QueueConsumer extends Consumer {
  consume (message, cb) {
    // todo: do something.
    sendmail(message)
    cb()
  }
}

QueueConsumer.queueName = config.queueName

const consumer = new QueueConsumer(config, {
  messageConsumeTimeout: 2000
})

consumer.run()
