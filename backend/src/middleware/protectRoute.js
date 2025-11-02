
import jwt from "jsonwebtoken";
import USER from "../model/User.js";

export const protectRoute=async(req,res,next)=>{
  try {
  const token=req.cookies.jwt;

  if(!token) return res.status(401).json({message:"Unauthorized -No token provided"})
const decoded=jwt.verify(token,process.env.SECRET_KEY)

if(!decoded) return res.status(401).json({message:"Unauthorized - Invalid token"})

const user=await USER.findById(decoded.userId).select("-password");

if(!user) return res.status(401).json({message:'Unauthorized -User not found'})

req.user=user;
next();


  
} catch (error) {
  console.log("Error is protectedRoute middleware",error)
  res.status(500).json({message:"Internal Server Error"});
}

}