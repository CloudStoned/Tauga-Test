const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const { notFoundHandler } = require('./middleware/error')
const { errorHandler } = require('./middleware/error.middleware')

function createApp() {
  const app = express()

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/api', routes)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}

module.exports = createApp()
