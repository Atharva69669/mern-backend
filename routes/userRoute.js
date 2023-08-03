import express from "express";
import bcrypt from 'bcrypt'
import userModel from '../models/users.js'
import jwt from 'jsonwebtoken'

const userRouter=express.Router();

 userRouter.post('/register',async(req,res)=>{
   const {username,password}=req.body;
   const user=await userModel.findOne({username});
   if(user){
    res.json({msg:"User already exists"});
   }
   else{
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new userModel({
      username,
      password:hashedPassword
    })
     try{
        await newUser.save();
        res.json({msg:"User saved successfully"})
     }
     catch(error){
         res.status(500).json({error:`${error}`})
 
     }
   }
 })

 userRouter.post('/login',async(req,res)=>{
  const {username,password}=req.body;
  const user=await userModel.findOne({username});
  if(!user){
    res.json({msg:"User doesn't exists"});
  }
  else{
    const validPassword=await  bcrypt.compare(password,user.password);
    if(!validPassword){
      res.json({msg:"Incorrect Password"})
    }
    else{
        const token=jwt.sign({id:user._id},"secret");
        res.json({ token, userID: user._id });
      //  res.json({msg:"User exits .logged in",token:`${token}`})
    }
  }
 })
 export default userRouter;


