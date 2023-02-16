import joi from "joi";
import * as authType from "../types/authType";

export const phoneRegex = /^\([1-9]{2}\) [1-9]{1}[0-9]{4}\-[0-9]{4}$/;

export const signUp = joi.object<authType.SignUpPayload>({
	name: joi.string().trim().min(2).max(70).required(),
	phone: joi.string().pattern(phoneRegex).required(),
	email: joi.string().email().max(70).required(),
	password: joi.string().trim().min(6).required(),
});

export const signIn = joi.object<authType.SignInPayload>({
	email: joi.string().email().max(70).required(),
	password: joi.string().trim().min(6).required(),
});
