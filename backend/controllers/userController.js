import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../Models/userModel.js';


export const authUser = asyncHandler(async(req,res)=>{
    const { email,password } = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        throw new Error('Username or Password Incorrect');
    }
})

export const getProfile  = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        }) 
     } else {
         throw new Error('No User Found');
     }
})

export const registerUser = asyncHandler(async(req,res)=>{
    const { email,password,name } = req.body;
    const existUser = await User.findOne({email});
    if(!existUser){
        const user = await User.create({email,password,name});
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
    }
    if(existUser){
        throw new Error('User Already Registered');
    }
})

export const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
         user.name = req.body.name || user.name;
         user.email = req.body.email || user.email;
         if(req.body.password){
             user.password = req.body.password;
         }
         const updatedUser = await user.save();
         res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        });
    } else {
        throw new Error('Invalid Credentials');
    }
})