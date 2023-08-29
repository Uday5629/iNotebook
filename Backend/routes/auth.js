const express=require('express');
const User=require('../models/User')
const router=express.Router();
const { validationResult, ValidationChain } = require('express-validator');
const { body } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// sequential processing, stops running validations chain if the previous one fails.
/////Template Function to check Validation//////////////////

const validate = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };
  
  const JWT_SECRET='MYSECRETCODE';
////////   Route:1 ,Checking if already Exists Then creating user  //////////////////////////// 

  /////////////////////////////validating ///////////////////////////////
router.post('/createuser',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid Password atleast 6 characters').isLength({ min: 6 })
  ],async (req,res)=>{

    //////////////////////////Handling errors//////////////////////////////////////
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    ////////////////////////////Finding & Creating User///////////////////////////////////

    let user=await User.findOne({email:req.body.email});
    console.log(user);
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    const salt=await bcrypt.genSalt(10);
    secPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data={
        user:{
          id:user.id
        }
      }

      const authtoken=jwt.sign(data,JWT_SECRET);
      // console.log(jwtData);
      res.json(authtoken);
      }
      catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      }}
)

/////////////////// Route : 2 ,Authenticate a user////////////////////////////
router.post('/login',[
  body('email','Enter a valid Email').isEmail(),
  body('password','Enter a valid password').exists()
],async (req,res)=>{

  //////////////////////////Handling errors//////////////////////////////////////

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Sorry, No such user exists"});
    }
    const passwordCompare=bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error:'Please try to log in using correct credentials '});
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json(authtoken);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});
////////////   Route: 3 /////////////////////////////
router.post('/getuser',fetchuser, async(req,res)=>{

  try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password") 
    res.send(user);
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }

})

module.exports=router;