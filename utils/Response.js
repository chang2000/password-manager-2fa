function errResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, error: message })
}

function successResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: true, data: message })
}

module.exports = { errResponse, successResponse }
