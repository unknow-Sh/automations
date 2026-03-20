import express from "express";
import { loginUser, refreshAccessToken, registerUser } from "../controller/userController";
import { upload } from "../utils/fileUpload";


const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

export default router;