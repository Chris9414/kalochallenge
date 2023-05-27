const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    try {
        const token = req.headers["access-token"];

        if(!token){
            res.status(401).json({
                error: "not token provided",
            });
        };

        const decoded = jwt.verify(token, "kalo_challenge", {
            algorithms: "HS512"
        });

        req.user = decoded;
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authenticate;