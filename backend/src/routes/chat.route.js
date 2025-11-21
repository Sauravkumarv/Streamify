import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {  getStreamToken } from "../controller/chat.controller.js";



const chatRouter=express.Router();

chatRouter.get('/token',protectRoute,getStreamToken);

export default chatRouter;