function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err?.stack || err)

  const message = err?.message || 'Internal Server Error'
  res.status(500).json({ error: message })
}

module.exports = { errorHandler }
