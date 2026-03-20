import { AsyncHandler } from "../middleware/AsyncHandler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import bcrypt from "bcrypt";

export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password,role} = req.body;

  const file = req.file;

  if (!name || !email || !password || !file) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    avatar: file.path,
    role: role || "user", 
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  return res.json(
    new ApiResponse(201, "User registered successfully", { accessToken }),
  );
});

export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  return res.json(new ApiResponse(200, "Login successful", { accessToken }));
});


export const refreshAccessToken = AsyncHandler(async(req,res)=>{
    const token = req.cookies.refreshToken;

    if(!token){
        throw new ApiError(401,"No refresh token provided");
    }

    const decode = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decode.userId);

    if(!user || user.refreshToken !== token){
        throw new ApiError(401,"Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user._id);

    return res.json(new ApiResponse(200,"Access token refreshed",{accessToken: newAccessToken}));
   
})