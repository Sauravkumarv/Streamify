import USER from "../model/User.js";
import FriendRequest from "../model/friendRequest.js";

export const getRecommendedUsers=async(req,res)=>{
const currentUserId=req.user.id;
const currentUser=req.user;

try {
  const recommendationUsers=await USER.find({
    $and:[
      {_id:{$ne:currentUserId}},
      {$id:{$nin:currentUser.friends}},
      {isOnboarded:true},
    ]
  })
  res.status(200).json(recommendationUsers)
} catch (error) {
  console.error("Error in getRecommandation controller",error.message);
  res.status(500).json({message:"Internal server Error"})
}



}
export const getFriends=async(req,res)=>{
try {
  const user=await USER.findById(req.user.id)
  .select("friends")
  .populate("friends","fullName profilePic nativeLanguage learningLanguage");

  res.status(200).json(user.friends)
} catch (error) {
  console.error("Error in getMyFriends controller",error.message)
  res.status(500).json({message:"Internal Server Error"})
}
}

export const sendFriendRequest=async(req,res)=>{
  try {
    const myId=req.user.id;
    const {id:recipientsId}=req.params;

    //prevent sending request to yourself
    if(myId===recipientsId){
      return res.status(400).json({message:"You can't send friend request to yourself"})
    }
      const recipients=await USER.findById(recipientsId);

      if(!recipients){
        return res.status(404).json({message:"Recipients Not Found"})

      }
//check if user is already exists
      if(recipients.friends.includes(myId)){
        return res.status(400).json({message:"you are already friend request with this user"})

      }
   //check if a req already exits

   const existingRequest=await FriendRequest.findOne({
    $or:[
      {sender:myId,recipients:recipientsId},
      {sender:recipientsId,recipients:myId}
    ],
   })
   if(existingRequest){
    return res.status(400).json({message:"A friend request already exists between you and this user"})
   }
const friendRequest=await FriendRequest.create({
  sender:myId,
  recipients:recipientsId,
})
res.status(201).json(friendRequest)
  } catch (error) {
    console.error("Error in sendingFriendRequest controller",error.message);
  res.status(500).json({message:"Internal server Error"})
  }
}