const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

var secret = "secret";
var data = {
  id: 10
};

var token = jwt.sign(data, secret);

console.log(token);

var decoded = jwt.verify(token, secret);

console.log("decoded:", decoded);

// var message = "123456";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + secret).toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + secret).toString();

// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//   console.log("Data was changed. Do not trust!");
// }
