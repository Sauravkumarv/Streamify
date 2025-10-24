export async function generateStreamToken(req,res){
  try {
    const token=generateStreamToken(req.user.id);
  res.status(200).json({token});
  } catch (error) {
    console.log("Error in getStreamController:",error.message)
  }
  res.status(500).json({message:"Internal Server Error"})
}