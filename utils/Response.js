// This function is used to send the error response
function errResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, error: message });
}

// This function is used to send the success response
function successResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: true, data: message });
}

module.exports = { errResponse, successResponse };
