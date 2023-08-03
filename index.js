import express from 'express';
import cors from 'cors';
import mongoose  from 'mongoose';
import userRouter from './routes/userRoute.js';
import recipesRouter from './routes/recipeRoute.js'
const app=express();
app.use(cors());
app.use(express.json())
app.use('/auth',userRouter);
app.use('/recipes',recipesRouter);
const url="mongodb+srv://atharvabilonikar:wMYY4D3R8Ko9fR6X@test.3e97kk1.mongodb.net/recipes?retryWrites=true&w=majority"

const connection=async()=>{
    try{
      await mongoose.connect(url,{
        useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log("Database connected")
    }
    catch(error){
      console.log("Error while connecting to database");
    }
}

connection();
app.listen(5000,()=>{
   console.log("Server started at 5000");
})