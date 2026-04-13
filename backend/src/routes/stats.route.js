const express = require('express')

const { getStatsHandler } = require('../controllers/stats.controller')

const router = express.Router()

router.get('/', getStatsHandler)

module.exports = router
