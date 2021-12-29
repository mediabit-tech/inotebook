var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Vincaprin';

// Function for fetch the data for middleware
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to request object 
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate a valid token" });
    }
    try {
        // Just verify the jwt and fetch the data form db and next() to onther middleware function
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate a valid token" });
    }
}

module.exports = fetchuser;