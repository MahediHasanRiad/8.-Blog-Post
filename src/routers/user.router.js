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

userRouter.route("/register").post(registerController);
userRouter.route("/login").get(logInController);
userRouter.route("/changePassword").post(jwtVerify, changePassword);
userRouter.route("/:id").get(jwtVerify, findUserController);
userRouter.route("/:id").put(jwtVerify, updateOrCreateUserController);
userRouter.route("/update").patch(jwtVerify, updateUserController);
userRouter.route("/:id").delete(jwtVerify, deleteUserController);
userRouter.route("/logout").get(jwtVerify, logOutController);
userRouter.route("/all").get(jwtVerify, allUserController);

export { userRouter };
