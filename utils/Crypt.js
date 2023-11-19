const path = require('node:path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const crypto = require('node:crypto')
const { strToHex } = require('./strHex')

const algorithm = 'aes-256-ctr'
const keyHex = process.env.CRYPTO_SECRET_KEY
const ivHex = process.env.CRYPTO_IV_HEX

function encrypt(text, passKey) {
  passKey = passKey.replace(/[^a-zA-Z ]/g, '')
  const key = `${strToHex(passKey)}${keyHex}`.substring(0, 64)
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    Buffer.from(ivHex, 'hex'),
  )
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return encrypted.toString('hex')
}

function decrypt(hex, passKey) {
  passKey = passKey.replace(/[^a-zA-Z ]/g, '')
  const key = `${strToHex(passKey)}${keyHex}`.substring(0, 64)
  const decipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    Buffer.from(ivHex, 'hex'),
  )
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hex, 'hex')),
    decipher.final(),
  ])
  return decrypted.toString()
}

module.exports = { encrypt, decrypt }
