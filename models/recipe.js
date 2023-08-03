import moongoose from "mongoose";

const RecipeSchema = new moongoose.Schema({
  name:{
    type:String,
    required:true
  },
  Cuisine:{
    type:String,
    required:true
  },
  ingredients:[{type:String,required:true}],
  instructions:{type:String,required:true},
  imageUrl:{type:String,required:true},
  cookingTime:{type:Number,required:true},
userOwner:{type:moongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true 
},
});


const RecipeModel=moongoose.model('Recipes',RecipeSchema);
export default RecipeModel;