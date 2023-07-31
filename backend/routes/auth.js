const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); // Encrypting pass
const jwt = require('jsonwebtoken'); // token
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser")

const JWT_SIGN = "signatureforthejwttoken";

const { body, validationResult } = require("express-validator");

//ROUTE 1 :- Create a user using POST "api/auth/createUser" .Doesn't require auth. No login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    // if there are errors, return bad request and error
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check whether user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      //Error message for email already exists
      if (user) {
        return res.status(404).json({ success, error: "Email already exists" });
      }

      //Genrate salt
      const salt = await bcrypt.genSaltSync(10);
      const encryptPass = await bcrypt.hash(req.body.password ,salt)
      //create user if no error 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptPass,
      });

      const data = {
        user :{
          id : user.id
        }
      }

      // token generation
      const authToken = jwt.sign(data, JWT_SIGN);
      success=true
      res.json({success,authToken})
    } 

    //catch error
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal error occurred")
    }
}
);

//ROUTE 2 :-login  a user using POST "api/auth/login" .Doesn't require auth. No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password").exists(),
  ],

  async (req, res) => {
    // if there are errors, return bad request and error
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether user with this email exists already
    const {email, password} = req.body;
    try {
      let user = await User.findOne({ email });
      //Error message for email already exists
      if (!user) {
        return res.status(404).json({ success, error: "Incorrect email or password" });
      }

      //Password check
      const passCompare = await bcrypt.compare(password, user.password);
      if(!passCompare)
      {
        return res.status(404).json({success, error: "Incorrect email or password" });
      }

      const data = {
        user :{
          id : user.id
        }
      }

      // token generation
      const authToken = jwt.sign(data, JWT_SIGN);
      success=true
      res.json({success,authToken})
    } 

    //catch error
    catch (error) {
        console.log(error.message)
        res.status(500).send("Error occured")
    }
}
);

//ROUTE 3 :-Get user detail who just loggedin using POST "api/auth/getuser" login required
router.post("/getuser",fetchuser, async(req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Error occured")
}
    
})

module.exports = router;
