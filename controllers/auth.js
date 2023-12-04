// const crypto = require('node:crypto')
const { response } = require("express");
const User = require("../models/user");
const { successResponse, errResponse } = require("../utils/Response");
const speakeasy = require("speakeasy");

// This function is used to test the route
async function test(req, res) {
  return successResponse(res, 200, "test");
}

// This function is used to register the user
async function register(req, res) {
  // Get the first name, last name, email and password from the request body
  const { fName, lName, email, password } = req.body;

  // Generate a secret with the name and issuer
  const temp_secret = speakeasy.generateSecret({
    name: "PasswordManager2FA",
    issuer: "Grp8",
  });

  try {
    // Create a new user
    await User.create({
      fName,
      lName,
      email,
      password,
      secret: temp_secret.base32,
      qrCodeUrl: temp_secret.otpauth_url,
      twoFACompleted: false,
    }).then(() => {
      // If the user is created successfully
      // Send the user a token
      return res.json({
        success: true,
        data: "User Created Successfully. Scan QR Code to verify.",
        email: email,
        // secret: temp_secret.base32,
        qrCodeUrl: temp_secret.otpauth_url,
        twoFACompleted: false,
      });
    });
  } catch (err) {
    if (err.code == 11000) {
      // If the key is duplicate
      return errResponse(res, 400, "Please try again, Email Already exists.");
    } else {
      // If some other error
      console.log(err);
      return errResponse(res, 500, err);
    }
  }
}

// This function is used to login the user
async function login(req, res) {
  // Get the email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user by email and also get the password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // If no user found, return an error
      return errResponse(res, 401, "Invalid Credentials");
    }

    // Check if the password matches
    const isMatch = await user.checkPass(password);

    if (!isMatch) {
      // If not match, return an error
      return errResponse(res, 401, "Invalid Credentials");
    }
    
    if (!user.twoFACompleted) {
      // Return 202 
      message = {
        success: true,
        data: "2FA registration not completed",
        email: email,
        qrCodeUrl: user.qrCodeUrl,
      }
      return successResponse(res, 202, message);
    }

    // If 2fa complete
    message = {
      success: true,
      data: "2FA registration completed",
      email: email,
    }
    return successResponse(res, 200, message);

    // returns authToken as response
    // return sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    errResponse(res, 500, err);
  }
}

// This function is used to verify the token
async function verify(req, res) {
  // Get the token from the request body
  const { email, token } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    const tokenUser = await User.findOne({ email }).select("+password");

    // Get the secret from the user
    const secret = user.secret;

    // Verify the token
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });

    if (verified) {
      // If the token is verified successfully
      // Update the user to verified
      user.secret = user.secret;
      user.twoFACompleted = true;
      await user.save();
      return sendToken(tokenUser, 200, res);
      // return successResponse(res, 200, "Token Verified");
    } else {
      // If the token is not verified
      // Return an error
      return errResponse(res, 400, "Invalid Token");
    }
  } catch (err) {
    console.log(err);
    errResponse(res, 500, err);
  }
}

// This function is used to send the token to the user
function sendToken(user, statusCode, res) {
  // Create token
  const token = user.getJwt();
  // Send the token as response
  res.status(statusCode).json({
    success: true,
    token,
  });
}

module.exports = { test, register, login, verify };
