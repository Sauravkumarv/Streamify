import { signUp,login,logout, onBoard } from '../controller/auth.controller.js';
import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.post("/signup",signUp)

router.post("/login",login)

router.post("/logout",logout)

router.post("/onboarding",protectRoute,onBoard)

router.get('/me',protectRoute,(req,res)=>{
  return res.status(200).json({success:true,user:req.user})
})

export default router;