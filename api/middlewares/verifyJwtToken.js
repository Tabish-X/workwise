const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../constant/constant");

const verifyJwtToken = async (req, res, next) => {
  let token = req.headers.cookie;
  if(!token){
    return res.status(401).json({message: "invalid token or expired"})
  }
  token = token.split("=")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "invalid token or expired" });
    }
    req.userId = data.userId;
    next();
  });
};

module.exports = { verifyJwtToken };
