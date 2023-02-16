import joi from "joi";
import { EditUserPayload } from "../types/userType";
import { phoneRegex } from "./authSchema";

export const editUser = joi.object<EditUserPayload>({
	name: joi.string().trim().min(2).max(70),
	phone: joi.string().pattern(phoneRegex),
	email: joi.string().email().max(70),
	password: joi.string().trim().min(6),
});
