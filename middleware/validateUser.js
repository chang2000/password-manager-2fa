const jwtDecode = require("../utils/jwtDecode");
const { errResponse } = require("../utils/Response");
const User = require("../models/user");

// This function is used to validate the user
async function validate(req, res, next) {
  let token;

  // Check if the token is in the request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // If the token is in the headers, get the token
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    // If no token found, return an error
    return errResponse(res, 400, "Not Authorized to access this route");
  }

  try {
    // Decode the token
    const decoded = jwtDecode(token);

    // Find the user by id
    const user = await User.findById(decoded.id);

    if (!user) {
      // If no user found, return an error
      return errResponse(res, 404, "Unidentified User");
    }

    // Set the user in the request object
    req.user = user;
    next();
  } catch (error) {
    // If some error occured, return an error
    return errResponse(res, 401, "Not Authorized to access this route");
  }
}

module.exports = validate;
