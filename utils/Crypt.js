const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const crypto = require("node:crypto");
const { strToHex } = require("./strHex");

const algorithm = "aes-256-ctr";
const keyHex = process.env.CRYPTO_SECRET_KEY;
const ivHex = process.env.CRYPTO_IV_HEX;

// Encrypts the text
function encrypt(text, passKey) {
  // Remove all the special characters from the passKey
  passKey = passKey.replace(/[^a-zA-Z ]/g, "");
  // Create the key
  const key = `${strToHex(passKey)}${keyHex}`.substring(0, 64);
  // Create the cipher
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(ivHex, "hex")
  );
  // Encrypt the text
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  // Return the encrypted text
  return encrypted.toString("hex");
}

// Decrypts the text
function decrypt(hex, passKey) {
  // Remove all the special characters from the passKey
  passKey = passKey.replace(/[^a-zA-Z ]/g, "");
  // Create the key
  const key = `${strToHex(passKey)}${keyHex}`.substring(0, 64);
  // Create the decipher
  const decipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(ivHex, "hex")
  );
  // Decrypt the text
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hex, "hex")),
    decipher.final(),
  ]);
  // Return the decrypted text
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
