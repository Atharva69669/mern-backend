import moongoose from "mongoose";

const userSchema = new moongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes:[{
    type:moongoose.Schema.Types.ObjectId,
    ref:"Recipes"
  }]
});


const userModel=moongoose.model('users',userSchema);
export default userModel;