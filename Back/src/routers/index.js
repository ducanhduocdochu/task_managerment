'use strict'

const express = require('express')
const router = express.Router()

// middleware

router.use('/v1/api', require('./access'))
router.use('/v1/api', require('./board'))
router.use('/v1/api', require('./column'))
router.use('/v1/api', require('./task'))

module.exports = router