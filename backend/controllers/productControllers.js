import asyncHandler from 'express-async-handler';
import Product from '../Models/productModel.js';

export const getAllProducts = asyncHandler(async(req,res)=> {
    const products = await Product.find({});
    if(products){
    res.status(200).json(products);
    } else {
        res.status(404)
        throw new Error('Products not found');
    }
})

export const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
    res.status(200).json(product);
    } else{
        res.status(404)
        throw new Error('Product not found');
    }
})