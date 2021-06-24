require("dotenv").config();
const express = require("express");
const app = express();
const path =require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const auth =require("./middleware/auth");
const port = process.env.PORT || 3000
require("./db/conn");
const Register = require("./models/registers");
const cookieParser = require("cookie-parser");
const { json } = require("express");
const { log } = require("console");

//built in middleware
const staticPath =path.join(__dirname,"../public");
const templatePath =path.join(__dirname,"../templates/views");
const partialsPath =path.join(__dirname,"../templates/partials");
// to set the view enginee
app.set('view engine','hbs');
app.set("views",templatePath);
//register the hbs
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));
app.use(cookieParser());
//it through get the data from form and convert to json formate 
app.use(express.json());
//it means it not show undefind data it show properly data 
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res) => {
   res.render("index");
});


app.get("/secret",auth,(req,res) => {
    //console.log("this is token " + req.cookies.jwt);
    res.render("secret");
 });
//about page 
app.get("/login",function(req,res){
    res.render("login");
});
//about page 
app.get("/logout", auth, async (req,res) => {
    try{
        res.clearCookie("jwt");
        console.log("logout successfully")
       await req.user.save();
       res.render("login");
    }
    catch(error){
        res.status(500).send(error);
    }

});
//post method to use login page 
app.post("/login", async (req,res) => {
    try{
    
      const email = req.body.email;
      const password =req.body.password;
      const result1 = await Register.findOne({email:email})
      //here we check that our password is match or not 
    
      const isMatch = await bcrypt.compare(password,result1.password);
        //generate auth2token 
      const token = await result1.generateAuthToken(); 
      //cookies set
    
      res.cookie("jwt" , token , {
        expires:new Date(Date.now() + 300000),
        httpOnly:true
    
    });
      
      if(isMatch)
       {
              res.status(201).render("index");       
        }
        else{
            res.send("password are not match");
        } 
        }
    catch(e){
        res.status(400).send(e);

    }
});


app.get("/register",function(req,res){
    res.render("register");
});
//post method to call
app.post("/register", async (req,res) => { 
    try{
      
        password=req.body.password;
        const user = new Register({
            age:req.body.age,
            firstname:req.body.firstname,
            email:req.body.email,
            phone:req.body.phone,
            lastname:req.body.lastname,
            gender: req.body.gender,
            password:req.body.password,
            cpassword:req.body.cpassword
         })
         //hashing  and connecpt of middleware


         //middleware work 
         const token = await  user.generateAuthToken();
    
        
         //cookies set
        res.cookie("jwt", token , {
            expires:new Date(Date.now() + 300000),
            httpOnly:true
            });
          
  
            const result = await user.save();
            res.status(201).render("index");
        
    }
    catch(e){
    res.status(400).send(e);
    }
});
app.get("*",function(req,res){
    res.render("error");
});
app.listen(port, (req,res ) =>{
    console.log(`post number ${port}`);
});