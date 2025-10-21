import jwt from "jsonwebtoken";
import USER from "../model/User.js";

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
  res.send("Login Router");
};
export const logout = async (req, res) => {
  res.send("Logout Router");
};
