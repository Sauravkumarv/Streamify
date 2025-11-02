import jwt from "jsonwebtoken";
import USER from "../model/User.js";
import { upsertStreanUser } from "../lib/stream.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const userExists = await USER.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "Email already Exits, Use a different one" });

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await USER.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreanUser({
        id:newUser._id.toString(),
        name:newUser.fullName,
        image:newUser.profilePic || "",
      })
      console.log(`new streamUser created for ${newUser.fullName}`)
    } catch (error) {
      console.log("Error while creating new stream user",error)
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({ message: "user created successfully", user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json("Internal Server Error");
  }
};
export const login = async (req, res) => {
  const {email,password}=req.body;
  try {
    if(!email || !password) return res.status(400).json({message:"All Fields are required"})
    const user=await USER.findOne({email})
  if(!user) return res.status(401).json({message:"Invalid emali or password"})

  const isMatch=await user.comparePassword(password)
  if(!isMatch) return res.status(401).json({message:"Invalid email or password"})

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({success:'true',user})
  } catch (error) {
    console.log("Error in login Controller",error.message)
    return res.status(500).json({message:'Internal Server Error'})
  }
};
export const logout = async (req, res) => {
res.clearCookie('jwt') 
return res.status(200).json({success:true,message:'Logout successful'})
};

export const onBoard=async(req,res)=>{
try {
  const userId=req.user._id;
  const{fullName,bio,nativeLanguage,learningLanguage,location}=req.body;

  if(!fullName || !bio || !nativeLanguage|| !learningLanguage ||!location){
    return res.status(400).json({message:"All fields are required",missingFiels:[!fullName &&
    "fullName",
    !bio && "bio",
    !nativeLanguage && "nativeLanguage",
    !learningLanguage
&& "learningLanguage",
!location && "location",
    ].filter(Boolean),})
      }

      const updateUser=await USER.findByIdAndUpdate(userId,{
        ...req.body,
        isOnboarded:true,
      },{new:true}
      )

      if(!updateUser) return res.status(401).json({message:"User not found"})

      try {
        await upsertStreanUser({
          id:updateUser._id,
          name:updateUser.fullName,
        image:updateUser.profilePic,
        })
        console.log(`new streaUser updated for ${updateUser.fullName}`)

      } catch (error) {
        console.log("Error while updating new stream user",error)
      }

      res.status(200).json({success:true,user:updateUser})

} catch (error) {
  console.log("onboarding error",error)
  res.status(500).json({message:"Internal Server Error"})
}
}
