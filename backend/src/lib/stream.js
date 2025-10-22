import { StreamChat } from 'stream-chat';
import "dotenv/config"


const apiKey=process.env.STREAM_API_KEY; 
const apiSecret=process.env.STREAM_SECRET_KEY;

if(!apiKey || !apiSecret) {
 console.error("Stream API key is missing")
}
const streamClient=StreamChat.getInstance(apiKey,apiSecret)

export const upsertStreanUser=async(userData)=>{
  try {
    await streamClient.upsertUsers([userData])
    return userData
  } catch (error) {
    console.error("error Creating upsertStream user",error)
  }
}

export const generateStreamToken=async(userId)=>{};