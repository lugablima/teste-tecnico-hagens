import { Request, Response } from "express";
import * as userService from "../services/userService";
import { JwtData } from "../types/authType";

export async function getInfos(req: Request, res: Response) {
	const { userId } = res.locals as JwtData;

	const userInfos = await userService.getInfos(userId);

	res.status(200).send(userInfos);
}
