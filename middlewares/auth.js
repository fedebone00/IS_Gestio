const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        try {
            let payload = jwt.verify(token, process.env.JWT_SIGN_KEY ? process.env.JWT_SIGN_KEY : '2386TRUFBJCKIOF2398YUVBHWECJNIASCIJjsnvk');
            req.loggedUser = payload;
        } catch(error) {
            res.status(401).json({error: error});
            return;
        }
    } else {
        res.status(401).send('Missing jwt');
        return;
    }
    next();
}

const isAuthorized = (req, res, next) => {
    
    next();
}

module.exports = { isAuthenticated, isAuthorized };