import { signUp,login,logout } from '../controller/auth.controller.js';
import express from 'express';

const router=express.Router();

router.post("/signup",signUp)

router.post("/login",login)

router.post("/logout",logout)

export default router;