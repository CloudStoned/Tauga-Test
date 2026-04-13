const path = require('path')
const multer = require('multer')

const dataDir = path.join(__dirname, '..', 'data')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dataDir)
  },
  filename: (req, file, cb) => {
    cb(null, 'hotel.pdf')
  },
})

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
