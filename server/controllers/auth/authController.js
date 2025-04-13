const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
// register

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const checkUser = await userModel.findOne({ email: email });

  if (checkUser) {
    return res.json({ success: false, message: "User already exists" });
  } else {
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new userModel({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "Registration successful",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  }
};

// Login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await userModel.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    const checkPasswordCheck = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordCheck)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        user:checkUser.username
      },
      "CLIENT_SECRET_KEY",
      { expiresIn:"60m" }
    );

    res.cookie("token", token,{httpOnly:true,secure:false}).json({
      success:true,
      message:"Logged in successfully",
      user:{
        email:checkUser.email,
        role:checkUser.role,
        id:checkUser._id,
        user:checkUser.username
      }
    });




  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// logout

const logout= async (req,res)=>{
  res.clearCookie("token").json({
    success:true,
    message:"Logged out successfully"
  })
}

// auth middleware

const authMiddleware=async(req,res,next)=>{
  const token=req.cookies.token;

  if(!token) return res.status(404).json({
    success:false,
    message:"Unauthorised User"
  })
  try{
    const decode=jwt.verify(token,"CLIENT_SECRET_KEY")
    req.user=decode
    next()
  }catch(error){
    res.status(401).json({
      success:false,
      message:"Unauthorised User"
    })

  }
}

module.exports = { registerUser,loginUser,logout,authMiddleware };
