import  express from 'express';
import "dotenv/config"
import router from './routes/auth.route.js';
import { connectDB } from './lib/db.js';



const port=process.env.PORT|| 5000;

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/auth",router)




app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
  connectDB();
})
