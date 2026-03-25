import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { signUp } from "../controllers/authController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.patch("/id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;