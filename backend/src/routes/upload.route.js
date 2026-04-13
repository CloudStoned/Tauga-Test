const express = require('express')

const { uploadMiddleware } = require('../middleware/upload.middleware')
const { uploadPdf } = require('../controllers/upload.controller')

const router = express.Router()

router.post('/', uploadMiddleware, uploadPdf)

module.exports = router
