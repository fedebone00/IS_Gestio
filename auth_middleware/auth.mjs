const isAuthenticated = (req, res, next) => {
    next();
}

const isAuthorized = (req, res, next) => {
    next();
}

export {isAuthenticated, isAuthorized};