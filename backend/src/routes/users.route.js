import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getFriends, getRecommendedUsers } from '../controller/users.controller.js';

const userRouter=express.Router();
//apply middleware to all routes
userRouter.use(protectRoute)

userRouter.get('/',getRecommendedUsers)
userRouter.get('/friends',getFriends)

export default userRouter;