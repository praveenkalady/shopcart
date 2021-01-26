import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

export const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        if(token){
            try{
                const decoded = await jwt.verify(token,process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password');
                next();
            } catch(error){
                throw new Error('Invalid credentials')
            }
        }
        if(!token){
            throw new Error('Invalid token');
        }
    }
})
