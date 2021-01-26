import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import users from './data/users.js';
import Order from './Models/orderModel.js';
import Product from './Models/productModel.js';
import User from './Models/userModel.js';
import connectDB from './config/connectDB.js';

dotenv.config();

connectDB();

const destroyData = async () => {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('Data Destroyed !');
        process.exit();
    } catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

const insertData = async () => {
    try{
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(el => {
            return {...el,user:adminUser}
        });
        await Product.insertMany(sampleProducts);
        console.log('Data Inserted Successfully !');
        process.exit();
    } catch(err){
        console.log(`Error:${err.message}`);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
} else {
    insertData();
}