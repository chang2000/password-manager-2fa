const crypto = require("node:crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This is the password entry schema
const passEntrySchema = new mongoose.Schema({
  website: { type: String, maxLength: 25, required: true },
  username: { type: String, maxLength: 25 },
  email: { type: String, maxLength: 25 },
  password: { type: String, maxLength: 100, required: true },
});

// This is the user schema
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
});

// This function is used to hash the password
userSchema.pre("save", async function (next) {
  // If the password is not modified, move on
  if (!this.isModified("password")) {
    next();
  }

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// This function is used to check if the password is correct
userSchema.methods.checkPass = async function (givenPassword) {
  // Compare the given password with the stored password
  return await bcrypt.compare(givenPassword, this.password);
};

// This function is used to get the jwt token
userSchema.methods.getJwt = function () {
  // Return the jwt token
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// This function is used to get the reset password token
userSchema.methods.getResetPassToken = function () {
  // Generate the reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash the reset token
  this.resetPassToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Set the reset token expiry
  this.resetPassExpires = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
