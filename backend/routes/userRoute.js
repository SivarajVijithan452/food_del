import express from 'express';
import { loginUser, registerUser, updatePassword, deleteAccount } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/update-password", updatePassword);
userRouter.post("/delete-account", deleteAccount);

export default userRouter;