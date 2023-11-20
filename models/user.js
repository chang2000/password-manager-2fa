const crypto = require('node:crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const passEntrySchema = new mongoose.Schema({
  website: { type: String, maxLength: 25, required: true },
  username: { type: String, maxLength: 25 },
  email: { type: String, maxLength: 25 },
  password: { type: String, maxLength: 100, required: true }
})

const userSchema = new mongoose.Schema({
  fName: { type: String, lowercase: true, maxLength: 20 },
  lName: { type: String, lowercase: true, maxLength: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 35,
  },
  password: {
    type: String,
    required: true,
    select: false,
    maxLength: 50,
  },
  passwordEntries: [passEntrySchema],
  secret: { type: String, maxLength: 100 },
  qrCodeUrl: { type: String, maxLength: 100 },
  resetPassToken: String,
  resetPassExpires: Date,
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.checkPass = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password)
}

userSchema.methods.getJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  })
}

userSchema.methods.getResetPassToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPassToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPassExpires = Date.now() + 10 * (60 * 1000)
  return resetToken
}

const User = mongoose.model('User', userSchema, 'users')

module.exports = User
