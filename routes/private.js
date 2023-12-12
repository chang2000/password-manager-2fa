const express = require('express')

const router = express.Router()
const { userPage, saveUserPassword, getUserPassword, delPassEntry, chat} = require('../controllers/private')
const validate = require('../middleware/validateUser')

router.use(validate)

router.route('/userPage').get(userPage)
router.route('/savePass').put(saveUserPassword)
router.route('/getPass').post(getUserPassword)
router.route('/delPass').post(delPassEntry)
router.route('/chat').post(chat)

module.exports = router
