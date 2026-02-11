import { Router } from "express";
import { registerController } from "../api/v1/user/controller/register.controller.js";
import { logInController } from "../api/v1/user/controller/login.controller.js";
import { changePassword } from "../api/v1/user/controller/change-Password.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { findUserController } from "../api/v1/user/controller/find.controller.js";
import { updateOrCreateUserController } from "../api/v1/user/controller/update_or_create.controller.js";
import { updateUserController } from "../api/v1/user/controller/update.controller.js";
import { deleteUserController } from "../api/v1/user/controller/delete.controller.js";
import { logOutController } from "../api/v1/user/controller/log-out.controller.js";
import { allUserController } from "../api/v1/user/controller/list-of-all.controller.js";

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.get("/login", logInController);
userRouter.post("/changePassword", jwtVerify, changePassword);
userRouter.get("/all", jwtVerify, allUserController)
userRouter.get("/logout", jwtVerify, logOutController)
userRouter.patch("/update", jwtVerify, updateUserController);
userRouter.get("/:id", jwtVerify, findUserController)
userRouter.put("/:id", jwtVerify, updateOrCreateUserController);
userRouter.delete("/:id", jwtVerify, deleteUserController);

export { userRouter };
