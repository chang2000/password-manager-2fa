const jwtDecode = require('../utils/jwtDecode')
const { errResponse } = require('../utils/Response')
const User = require('../models/user')

async function validate(req, res, next) {
  let token

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1]

  if (!token)
    return errResponse(res, 400, 'Not Authorized to access this route')

  try {
    const decoded = jwtDecode(token)
    const user = await User.findById(decoded.id)

    if (!user)
      return errResponse(res, 404, 'Unidentified User')

    req.user = user
    next()
  }
  catch (error) {
    return errResponse(res, 401, 'Not Authorized to access this route')
  }
}

module.exports = validate
