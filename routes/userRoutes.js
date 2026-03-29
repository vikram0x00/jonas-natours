import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser, updateMe, deleteMe } from "../controllers/userController.js";
import { protect, signUp, login, forgotPassword, resetPassword, updatePassword } from "../controllers/authController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);
userRouter.patch("/updatePassword", protect, updatePassword);
userRouter.patch("/updateMe", protect, updateMe);
userRouter.delete("/deleteMe", protect, deleteMe);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.patch("/id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;