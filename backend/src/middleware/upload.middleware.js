const multer = require('multer')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDF files are allowed'), false)
  }
  cb(null, true)
}

const uploadMiddleware = multer({
  storage,
  fileFilter,
}).single('pdf')

module.exports = { uploadMiddleware }
