import mongoose from 'mongoose'
export const connectDB=async()=>{
  try {
    const conn=await mongoose.connect(process.env.MONGO_URL)
    console.log(`mongoDB Connected ${conn.connection.port}`)
  } catch (error) {
    console.log("Error while connecting",error)
    process.exit(1)
  }
}