// const crypto = require('node:crypto')
const User = require('../models/user')
const { successResponse, errResponse } = require('../utils/Response')
const speakeasy = require('speakeasy')

// function to handle post rqst for registering a user

async function test(req, res) {
  return successResponse(res, 200, 'test')
}

async function register(req, res) {
  const { fName, lName, email, password } = req.body
  const temp_secret = speakeasy.generateSecret()

  try {
    // creating a user in db
    await User.create({
      fName,
      lName,
      email,
      password,
      secret: temp_secret.base32,
      qrCodeUrl: temp_secret.otpauth_url,
    }).then(() => {
      return res.json({
        email: email,
        secret: temp_secret.base32,
        qrCodeUrl: temp_secret.otpauth_url,})
    })

    // handles error
  } catch (err) {
    // 11000 is error code for duplicate key in mongoDB
    if (err.code == 11000)
      return errResponse(res, 400, 'Please try again, Email Already exists.')
    else
      return errResponse(res, 500, err)
  }
}

async function login(req, res) {
  const { email, password } = req.body

  try {
    // .select("+password") also returns the password
    const user = await User.findOne({ email }).select('+password')

    if (!user)
      return errResponse(res, 401, 'Invalid Credentials')
    
    // checkPass is a mongoose method declared in users file of userSchema
    const isMatch = await user.checkPass(password)

    if (!isMatch)
      return errResponse(res, 401, 'Invalid Credentials')
  
    // returns authToken as response
    return sendToken(user, 200, res)
  } catch (err) {
    console.log(err)
    // errResponse(res, 500, err);
  }
}

async function verify(req, res) {
  const { email, token } = req.body

  try {
    const user = await User.findOne({ email })

    const secret = user.secret

    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    })

    if (verified) { 
      user.secret = user.secret
      await user.save()
      return successResponse(res, 200, 'Token Verified')
    } else {
      return errResponse(res, 400, 'Invalid Token')
    }
  } catch (err) {
    console.log(err)
    errResponse(res, 500, err);
  }
}

function sendToken(user, statusCode, res) {
  const token = user.getJwt()
  res.status(statusCode).json({
    success: true,
    token,
  })
}

module.exports = { test, register, login, verify }
