import bcrypt from "bcrypt";
import * as authType from "../types/authType";
import * as userRepository from "../repositories/userRepository";
import * as errorHandlingUtils from "../errors/errorHandlingUtils";
import jwt from "jsonwebtoken";
import { encrypt } from "../utils/cryptographyUtils";

async function validateIfEmailDoesNotExist(email: string): Promise<void> {
	const emailAlreadyExists = await userRepository.findByEmail(email);

	if (emailAlreadyExists) {
		throw errorHandlingUtils.conflictError("Email já cadastrado.");
	}
}

function unformatPhone(phone: string): string {
	const regexUnformatPhone = /[\(\)\-\s]/g;

	return phone.replace(regexUnformatPhone, "");
}

async function generateHashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
}

async function validateCredentials({ email, password }: authType.SignInPayload) {
	const user = await userRepository.findByEmail(email);
	const hashedPassword = user?.password;

	if (!user || !bcrypt.compareSync(password, hashedPassword as string)) {
		throw errorHandlingUtils.unauthorizedError("E-mail e/ou senha inválido(s).");
	}

	return user;
}

function generateJwtToken(userId: string): string {
	const data: authType.JwtData = { userId };
	const secretKey = process.env.JWT_SECRET as jwt.Secret;

	const token = jwt.sign(data, secretKey, { expiresIn: "7d" });

	return token;
}

export async function signUp(userInfo: authType.SignUpPayload): Promise<void> {
	await validateIfEmailDoesNotExist(userInfo.email);

	const hashedPassword = await generateHashPassword(userInfo.password);
	const unformatedPhone = unformatPhone(userInfo.phone);

	await userRepository.createOne({ ...userInfo, password: hashedPassword, phone: encrypt(unformatedPhone) });
}

export async function signIn(userInfo: authType.SignInPayload): Promise<authType.ResponseSignIn> {
	const { id: userId } = await validateCredentials(userInfo);

	const responseSignIn: authType.ResponseSignIn = {
		token: generateJwtToken(userId),
	};

	return responseSignIn;
}
