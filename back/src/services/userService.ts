import * as userRepository from "../repositories/userRepository";
import * as errorHandling from "../errors/errorHandlingUtils";
import { excludeTypeProperties } from "../utils/excludeTypeProperties";
import { GetInfosResponse } from "../types/userType";
import { decrypt } from "../utils/cryptographyUtils";
import { User } from "@prisma/client";

function formatPhone(phone: string): string {
	return phone.replace(/^(\d{2})(\d{5})(\d{4})$/g, "($1) $2-$3");
}

function formatUser(user: User): GetInfosResponse {
	const formatedUser = { ...user, phone: decrypt(user.phone) };

	formatedUser.phone = formatPhone(formatedUser.phone);

	return excludeTypeProperties(formatedUser, "password", "createdAt", "updatedAt");
}

export async function getInfos(userId: string): Promise<GetInfosResponse> {
	const user = await userRepository.findById(userId);

	if (!user) {
		throw errorHandling.notFoundError("Usuário não encontrado.");
	}

	return formatUser(user);
}
