import { prisma } from "../database/postgres";
import { SignUpPayload } from "../types/authType";
import { EditUserPayload } from "../types/userType";

export async function findByEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function findById(userId: string) {
	return prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
}

export async function createOne(user: SignUpPayload) {
	return prisma.user.create({ data: user });
}

export async function updateOne(userId: string, user: EditUserPayload) {
	return prisma.user.update({ where: { id: userId }, data: user });
}
