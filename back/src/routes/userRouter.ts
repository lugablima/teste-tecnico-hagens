import { Router } from "express";
import multer from "multer";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import validateSchema from "../middlewares/schemaValidator";
import { editUser } from "../schemas/userSchema";

const upload = multer();
const userRouter = Router();

userRouter.use(authenticateToken);
userRouter.get("/users/info", userController.getInfos);
userRouter.patch("/users", upload.single("image"), validateSchema(editUser), userController.edit);

export default userRouter;
