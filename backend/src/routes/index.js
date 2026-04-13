const express = require('express')

const uploadRouter = require('./upload.route')
const chatRouter = require('./chat.route')
const contactRouter = require('./contact.route')
const statsRouter = require('./stats.route')

const router = express.Router()

router.use('/upload-pdf', uploadRouter)
router.use('/chat', chatRouter)
router.use('/contact', contactRouter)
router.use('/stats', statsRouter)

module.exports = router
