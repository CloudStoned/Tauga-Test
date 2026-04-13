const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')

function extractPdfText() {
  try {
    const pdfPath = path.join(__dirname, '..', 'data', 'hotel.pdf')

    if (!fs.existsSync(pdfPath)) return null

    const buffer = fs.readFileSync(pdfPath)

    return pdfParse(buffer).then((data) => data.text)
  } catch {
    return Promise.resolve(null)
  }
}

module.exports = { extractPdfText }
