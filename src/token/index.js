const { generateToken } = require('./generateToken');


async function getAccessTokenForUserId(userId) {
  const token = await generateToken({ userId });
  return token;
}