const jwt = require('jsonwebtoken');

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

async function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}


async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  })
}


module.exports = {
  generateToken,
  verifyToken
}