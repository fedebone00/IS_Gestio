import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    if(req.body['jwt']) {
        try {
            let payload = jwt.verify(req.body['jwt'], 'test');
            req.body['role'] = payload.role;
        } catch(error) {
            res.status(400).json({error: error});
            return;
        }
    } else {
        res.status(400).send('Missing jwt');
        return;
    }
    next();
}

const isAuthorized = (req, res, next) => {
    
    next();
}

export {isAuthenticated, isAuthorized};