const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateTokenHandler = asyncHandler(async (req,res,next) => {
     let token; 
     let authHeader = req.headers.authorization || req.headers.authorization;
     if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token , process.env.SECRET_ACCESS_TOKEN , (err , decoded) => {
            if(err) {
                res.status(401);
                throw new Error("User is not Authorized...");
            }
            req.user = decoded.user;
            next();
        });
         
        if(!token ) {
            res.status(401);
            throw new Error("user is not authorized or token is missing..");
        }
     }
});

module.exports = validateTokenHandler; 