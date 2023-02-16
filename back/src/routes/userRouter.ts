import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const userRouter = Router();

userRouter.use(authenticateToken);
userRouter.get("/users/info", userController.getInfos);

export default userRouter;
