const jwt = require("jsonwebtoken");

const checkJwt = (req, res, next) => {
  const header = req.get("Authorization");
  let signToken;

  if (header) {
    signToken = header.split(" ")[1];
  }
  if (signToken) {
    try {
      const decoded = jwt.verify(signToken, process.env.JWTSECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
};

module.exports = {
  checkJwt,
};
