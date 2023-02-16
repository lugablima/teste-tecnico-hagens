import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import validateSchema from "../middlewares/schemaValidator";
import { editUser } from "../schemas/userSchema";

const userRouter = Router();

userRouter.use(authenticateToken);
userRouter.get("/users/info", userController.getInfos);
userRouter.patch("/users", validateSchema(editUser), userController.edit);

export default userRouter;
