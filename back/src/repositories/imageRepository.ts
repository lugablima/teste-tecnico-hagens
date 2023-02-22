import { prisma } from "../database/postgres";
import { CreateImage } from "../types/imageType";

export async function findOneById(id: string) {
	return prisma.image.findUnique({
		where: {
			id,
		},
	});
}

export async function deleteOne(id: string) {
	return prisma.image.delete({
		where: {
			id,
		},
	});
}

export async function createOne(image: CreateImage) {
	return prisma.image.create({
		data: image,
	});
}
