let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let Token = req.headers['token-key'];
  

  jwt.verify(Token, "SecretKey122354235234", function (err, decoded) { 
    if (err) {
      res.status(401).json({status: "unauthorized"})
    }
    else {
      let email = decoded['data']['email'];
      req.headers.email = email;
      next();
    }
  })
}