const express = require('express')

const router = express.Router()
const { userPage, saveUserPassword, getUserPassword, delPassEntry } = require('../controllers/private')
const validate = require('../middleware/validateUser')

router.use(validate)

router.route('/userPage').get(userPage)
router.route('/savePass').put(saveUserPassword)
router.route('/getPass').post(getUserPassword)
router.route('/delPass').post(delPassEntry)

module.exports = router
