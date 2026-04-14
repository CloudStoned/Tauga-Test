const { callUploadFileWebhook } = require('../services/n8nService')
const { showActiveFileName } = require('../services/statsService')

async function uploadPdf(req, res) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ error: 'No PDF file uploaded' })
    }

    const filename = req.file.originalname || 'uploaded.pdf'

    const result = await callUploadFileWebhook(
      req.file.buffer,
      filename,
      req.file.mimetype
    )

    showActiveFileName(filename)

    return res.status(200).json({
      message: 'Upload forwarded to n8n webhook',
      n8nResult: result,
      filename,
    })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Upload failed' })
  }
}

module.exports = { uploadPdf }
