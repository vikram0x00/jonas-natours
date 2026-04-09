import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser, updateMe, getMe, deleteMe } from "../controllers/userController.js";
import { signUp, login, forgotPassword, resetPassword, updatePassword, protect, restrictTo } from "../controllers/authController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);

// The Router and the Routes run in sequence
// The above routes wont be mandated to use protect() but the ones below would be
userRouter.use(protect);

userRouter.get("/me", getMe);
userRouter.patch("/updatePassword", updatePassword);
userRouter.patch("/updateMe", updateMe);
userRouter.delete("/deleteMe", deleteMe);

// This effectively works as userRouter.use(protect, restrictTo(roles));
// The Middleware stack adds up as we put functions/handlers into it in sequence
userRouter.use(restrictTo("admin"));

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.patch("/id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;