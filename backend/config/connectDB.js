import mongoose from 'mongoose';


const connectDB = async () => {
    try{
      const con = await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            useCreateIndex:true,
            useNewUrlParser:true
        });
        console.log(`Database connected succesfully ${con.connection.host}`.cyan.underline)
    } catch(err){
        console.error(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;