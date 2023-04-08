const jwt = require("jsonwebtoken");
const jwtSecret = "f1c92e0813cdec69b1cb05a1b661b2e61c98c68d2dc1619af7cc2b1e0a5cc9d224d730";

exports.adminAuth = (req,res, next) => {
    const token = req.body.jwt;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodeToken) => {
            if(err) {
                return res.tatus(401).json({ message: "Not authorized" })
            } else {
                if(decodeToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next();
                }
            }
        })
    } else {
        return res.status(401).json({ message: "Not authorized, token not available" })
    }
}

exports.userAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, jwtSecret, (err, decodeToken) => {
            if(err) {
                res.status(401).json({ message: "Not authorized"})
            } else {
                if(decodeToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" })
                }
            }
        })
    } else {
        return res.status(401).json({ message: "Not authorized, token not available" })
    }
}
