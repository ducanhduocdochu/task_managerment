"use strict";

const JWT = require("jsonwebtoken");

const createTokenPair = async (payload) => {
  const accessToken = await JWT.sign(payload, process.env.KEYSECRET, {
    expiresIn: "2 days",
  });
  const refreshToken = await JWT.sign(payload, process.env.KEYSECRET, {
    expiresIn: "7 days",
  });

  return { accessToken, refreshToken };
};
// const verifyJWT = async (token) => {
//   JWT.verify(token, process.env.KEYSECRET, (err, decode) => {
//     if (err) {
//       return null;
//     } else {
//       console.log(decode);
//       return decode;
//     }
//   });
// };

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.KEYSECRET, (err, decode) => {
      if (err) {
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });
};

module.exports = {
  createTokenPair,
  verifyJWT,
};
