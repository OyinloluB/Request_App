const jwt = require('jsonwebtoken');

require('dotenv/config');

module.export = function(req, res, next) {
    
    // Get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token) {
        return res.status(401).json({msg: 'Authorization denied'})
    }
    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.merchandiser = decoded.merchandiser;
        req.distributor = decoded.distributor;
        next;
    }
    catch(err){
    res.status(401).json({ msg: 'Token is valid'})

    }
}