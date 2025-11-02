import  express from 'express';
import "dotenv/config"
import router from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser"
import userRouter from './routes/users.route.js';
import chatRouter from './routes/chat.route.js';
import cors from 'cors'


const port=process.env.PORT|| 5000;

const app=express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}))

app.use(express.json())


app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use("/api/auth",router)
app.use("/api/users",userRouter)
app.use('/api/chat',chatRouter)



app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
  connectDB();
})
