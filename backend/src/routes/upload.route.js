const express = require('express')
const multer = require('multer')

const { uploadPdf } = require('../controllers/upload.controller')

const router = express.Router()

// Lightweight in-memory upload so we can forward the raw PDF bytes to n8n.
const uploadMiddleware = multer({ storage: multer.memoryStorage() }).single('pdf')

router.post('/', uploadMiddleware, uploadPdf)

module.exports = router
