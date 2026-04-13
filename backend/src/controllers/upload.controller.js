async function uploadPdf(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' })
    }

    // If a downstream service exists, it can refresh chatbot knowledge base.
    // Keep this controller minimal as requested.
    // await uploadPdfText?.(req.file)

    return res.status(200).json({
      message: 'PDF uploaded successfully',
      filename: req.file.filename,
    })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Upload failed' })
  }
}

module.exports = { uploadPdf }
