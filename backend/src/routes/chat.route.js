import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { generateStreamToken } from "../controller/chat.controller.js";



const chatRouter=express.Router();

chatRouter.post('/token',protectRoute,generateStreamToken);

export default chatRouter;