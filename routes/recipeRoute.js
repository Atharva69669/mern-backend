import RecipeModel from '../models/recipe.js'
import express from 'express'
import userModel from '../models/users.js';


const recipesRouter=express.Router();

recipesRouter.get("/",async(req,res)=>{
    try{
     const response=await RecipeModel.find({});
     res.json(response);
    }
    catch(error){
      res.json(error);
    }
})

recipesRouter.post("/",async(req,res)=>{
    const recipe=new RecipeModel(req.body);
    try{
     const response=recipe.save();
     res.json(response);
    }
    catch(error){
      res.json(error);
    }
})

recipesRouter.put("/",async(req,res)=>{
  try{
    const recipe=await RecipeModel.findById(req.body.recipeID);
    const user=await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({savedRecipes:user.savedRecipes})
  }
  catch(error){
    res.json(error);
  }
})

recipesRouter.get("/savedRecipes/ids/:userID",async(req,res)=>{
  try{
   const user=await userModel.findById(req.params.userID)
   res.json({savedRecipes:user.savedRecipes})
  }
  catch(error){
    res.json(error);
  }
})

recipesRouter.get("/savedRecipes",async(req,res)=>{
  try{
   const user=await userModel.findById(req.body.userID)
    const savedRecipes=await RecipeModel.find({
      _id:{$in:user.savedRecipes},
    })
    res.json({savedRecipes});
  }
  catch(error){
    res.json(error);
  }
})


export default recipesRouter;