const jwtDecode = require('../utils/jwtDecode')
const { errResponse, successResponse } = require('../utils/Response')
const User = require('../models/user')
const { encrypt, decrypt } = require('../utils/Crypt')

async function userPage(req, res) {
  const user = req.user
  responseObject = {
    fName: user.fName,
    lName: user.lName,
    msg: 'User Authorized Successfully',
  }
  successResponse(res, 201, responseObject)
}

async function saveUserPassword(req, res) {
  const { website, username, email, password, passkey } = req.body
  const uid = req.user._id

  try {
    const user = await User.findById(uid)
    if (!user)
      return errResponse(res, 404, 'Not Authorized for following action.')

    if (!passkey)
      return errResponse(res, 400, 'Secret Key is missing.')

    user.passwordEntries.push({
      website,
      username,
      email,
      password: encrypt(password, passkey),
    })
    await user.save()
    return successResponse(res, 200, 'Password Saved Successfully')
  }
  catch (error) {
    console.log(error)
    return res, 401, 'Something went wrong.'
  }
}

async function getUserPassword(req, res) {
  const { passkey } = req.body
  const uid = req.user._id
  try {
    const user = await User.findById(uid)
    if (!user)
      return errResponse(res, 404, 'Not Authorized for following action.')

    if (!passkey)
      return errResponse(res, 400, 'Secret Key is missing.')

    const decPasswordEntries = user.passwordEntries.map((passwdEntry) => {
      return {
        _id: passwdEntry._id,
        website: passwdEntry.website,
        email: passwdEntry.email,
        username: passwdEntry.username,
        password: decrypt(passwdEntry.password, passkey),
      }
    })
    return successResponse(res, 200, decPasswordEntries)
  }
  catch (error) {
    console.log(error)
    return res, 401, 'Something went wrong.'
  }
}

async function delPassEntry(req, res) {
  const uid = req.user._id
  const id = req.body.entryId
  if (!id)
    return errResponse(res, 400, 'No Password Entry was found')

  try {
    await User.findByIdAndUpdate(uid, {
      $pull: { passwordEntries: { _id: id } },
    }).then(() => {
      successResponse(res, 200, 'Deleted Password Entry')
    })
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { userPage, saveUserPassword, getUserPassword, delPassEntry }
