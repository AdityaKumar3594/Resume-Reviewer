const jwt=require('jsonwebtoken');
const tokenBlackListModel = require('../models/blacklist.model');


async function authUser(req, res, next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'TOKEN NOT FOUND'});
    } 
    
    const isBlackListed=await tokenBlackListModel.findOne({token});

    if(isBlackListed){
        return res.status(401).json({message: 'TOKEN IS BLACKLISTED'});
    }
    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        req.user=decoded;
        next();

    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
}

module.exports={
    authUser
};