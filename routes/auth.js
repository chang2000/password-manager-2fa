const express = require('express')

const router = express.Router()
// const { route } = require('express/lib/application')
const { test, login, register, verify } = require('../controllers/auth')

router.route('/test').get(test)
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/verify').post(verify)

module.exports = router
