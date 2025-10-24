import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { acceptFriendRequest, getFriendRequest, getFriends, getOutgoiningFriendReqs, getRecommendedUsers, sendFriendRequest } from '../controller/users.controller.js';

const userRouter=express.Router();
//apply middleware to all routes
userRouter.use(protectRoute)

userRouter.get('/',getRecommendedUsers)
userRouter.get('/friends',getFriends)

userRouter.post('/friend-request/:id',sendFriendRequest)
userRouter.put('/friend-request/:id/accept',acceptFriendRequest)

userRouter.get('/friend-requests',getFriendRequest)
userRouter.get('/otgoining-friend-requests',getOutgoiningFriendReqs)


export default userRouter;