const path = require('node:path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const jwt = require('jsonwebtoken')

const jwtDecode = token => jwt.verify(token, process.env.JWT_SECRET)

module.exports = jwtDecode
