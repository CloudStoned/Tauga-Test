function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not found' })
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err)

  const status = err.statusCode || err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({ error: message })
}

module.exports = { notFoundHandler, errorHandler }
