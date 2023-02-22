import { Request, Response } from "express";
import * as userService from "../services/userService";
import { JwtData } from "../types/authType";
import { ImagePayload } from "../types/imageType";
import { EditUserPayload } from "../types/userType";

export async function getInfos(req: Request, res: Response) {
	const { userId } = res.locals as JwtData;

	const userInfos = await userService.getInfos(userId);

	res.status(200).send(userInfos);
}

export async function edit(req: Request, res: Response) {
	const { userId } = res.locals as JwtData;
	const userInfos: EditUserPayload = req.body;
	const image: ImagePayload = {
		name: req.file?.originalname,
		type: req.file?.mimetype,
		data: req.file?.buffer.toString("base64"),
	};

	await userService.edit(userId, userInfos, image);

	res.status(200).send("Usuário modificado com sucesso.");
}
