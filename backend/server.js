import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/connectDB.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound,errorHandler } from './middlewares/errorHandler.js';



const app = express();
app.use(express.json());

dotenv.config();


connectDB();

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5001;

app.listen(PORT,console.log(`Server Listening on ${PORT} in ${process.env.NODE_ENV} mode.`.yellow.bold));