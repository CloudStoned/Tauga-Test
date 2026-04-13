const { callUploadFileWebhook } = require('../services/n8nService')

async function uploadPdf(req, res) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ error: 'No PDF file uploaded' })
    }

    const result = await callUploadFileWebhook(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    )

    return res.status(200).json({
      message: 'Upload forwarded to n8n webhook',
      n8nResult: result,
      filename: req.file.originalname || 'uploaded.pdf',
    })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Upload failed' })
  }
}

module.exports = { uploadPdf }
