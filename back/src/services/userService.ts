import * as userRepository from "../repositories/userRepository";
import * as errorHandling from "../errors/errorHandlingUtils";
import { excludeTypeProperties } from "../utils/excludeTypeProperties";
import { EditUserPayload, GetInfosResponse } from "../types/userType";
import { decrypt, encrypt } from "../utils/cryptographyUtils";
import { User } from "@prisma/client";
import { generateHashPassword, unformatPhone, validateIfEmailDoesNotExist } from "./authService";

async function validateIfUserExists(userId: string): Promise<User> {
	const user = await userRepository.findById(userId);

	if (!user) {
		throw errorHandling.notFoundError("Usuário não encontrado.");
	}

	return user;
}

function formatPhone(phone: string): string {
	return phone.replace(/^(\d{2})(\d{5})(\d{4})$/g, "($1) $2-$3");
}

function formatUser(user: User): GetInfosResponse {
	const formatedUser = { ...user, phone: decrypt(user.phone) };

	formatedUser.phone = formatPhone(formatedUser.phone);

	return excludeTypeProperties(formatedUser, "password", "createdAt", "updatedAt");
}

async function formatEditUser(user: EditUserPayload): Promise<EditUserPayload> {
	if (user.phone) {
		const unformattedPhone = unformatPhone(user.phone);
		user.phone = encrypt(unformattedPhone);
	}

	if (user.password) {
		user.password = await generateHashPassword(user.password);
	}

	return user;
}

function validateIfEditPayloadIsEmpty(userInfos: EditUserPayload) {
	const arrKeys = Object.keys(userInfos);

	if (!arrKeys.length) {
		throw errorHandling.badRequestError("Payload da request está vazio.");
	}
}

export async function getInfos(userId: string): Promise<GetInfosResponse> {
	const user = await validateIfUserExists(userId);

	return formatUser(user);
}

export async function edit(userId: string, userInfos: EditUserPayload) {
	await validateIfUserExists(userId);

	validateIfEditPayloadIsEmpty(userInfos);

	if (userInfos.email) {
		await validateIfEmailDoesNotExist(userInfos.email);
	}

	const formattedUser = await formatEditUser(userInfos);

	await userRepository.updateOne(userId, formattedUser);
}
