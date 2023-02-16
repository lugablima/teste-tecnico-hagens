import { prisma } from "../database/postgres";
import { SignUpPayload } from "../types/authType";

export async function findByEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function createOne(user: SignUpPayload) {
	return prisma.user.create({ data: user });
}