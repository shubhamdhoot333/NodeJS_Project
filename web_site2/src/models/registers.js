const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const { response } = require("express");
const user =new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
                type:String,
                required:true
             },
     email:{
                type:String,
                 required:true,
                unique:true
            },
     gender:{
            type:String,
            required:true
            },
     phone:{
        type:Number,
        required:true
            },
      age:{
        type:Number,
        required:true
      },
      password:{
        type:String,
        required:true
        },
      tokens:[{
        token:{
          type:String,
          required:true
        }
      }]                                   
})
//method of cookies
//generating tokenn
user.methods.generateAuthToken = async function() {
try{
      const token = jwt.sign( { _id:this._id.toString() } , process.env.SECRET_KEY );
       this.tokens =this.tokens.concat({token:token})
      await this.save();
      return token ;
    }
catch(e){
        res.send("the error part"+ e);
        console.log("the error part"+ e);
}

}

//hashing
user.pre("save", async function(next){
// const passwordHash = await bcrypt.hash(password,10);
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,10);
  
    }
        next();
      
      });

//create a collection
const Register = new  mongoose.model("User_detail",user);

module.exports = Register;


/*
in time of update 
userSchema.pre("save", async function(next){
if(this.isModified("password")){
 const passwordHash = await bcrypt.hash(password,10);
this.password = await bcrypt.hash(this.password,10);
next();
} 

}


*/