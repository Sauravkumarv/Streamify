import { signUp,login,logout, onBoard } from '../controller/auth.controller.js';
import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.post("/signup",signUp)

router.post("/login",login)

router.post("/logout",logout)

router.post("/onboarding",protectRoute,onBoard)

export default router;