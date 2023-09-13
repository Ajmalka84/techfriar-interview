const jwt = require("jsonwebtoken");

module.exports = {
  verify: (req, res, next) => {
    console.log( "its here")
    const authHeader = req.headers["authorization"]; 
    
    if (authHeader) {
      const token = authHeader.split(" ")[1]; 
      if (token == null) return res.sendStatus(401);
      jwt.verify(token, "secretKey", (error, user) => {
        if (error) {
          console.log(error, "error is here");
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("you are not authenticated");
    }
  }
}

 