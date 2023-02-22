import * as userRepository from "../repositories/userRepository";
import * as imageRepository from "../repositories/imageRepository";
import * as errorHandling from "../errors/errorHandlingUtils";
import { excludeTypeProperties } from "../utils/excludeTypeProperties";
import { EditUserPayload, GetInfosResponse, UserModified } from "../types/userType";
import { decrypt, encrypt } from "../utils/cryptographyUtils";
import { Image, User } from "@prisma/client";
import { generateHashPassword, unformatPhone, validateIfEmailDoesNotExist } from "./authService";
import { CreateImage, ImagePayload } from "../types/imageType";
import { clearUndefinedProperties } from "../utils/clearUndefinedProperties";

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

async function addImageProperty(user: UserModified): Promise<GetInfosResponse> {
	const { id, name, type, data } = (await imageRepository.findOneById(user.imageId as string)) as Image;

	const decryptedImage: Image = { id, name: decrypt(name), type, data: decrypt(data) };

	const newUser = excludeTypeProperties(user, "imageId") as GetInfosResponse;
	newUser.image = decryptedImage;

	return newUser;
}

async function formatUser(user: User): Promise<GetInfosResponse> {
	const formatedUser = { ...user, phone: decrypt(user.phone) };

	formatedUser.phone = formatPhone(formatedUser.phone);

	const newUser = excludeTypeProperties(formatedUser, "password", "createdAt", "updatedAt");

	if (!newUser.imageId) {
		return excludeTypeProperties(newUser, "imageId") as GetInfosResponse;
	}

	return await addImageProperty(newUser);
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

async function deletePreviousImage(imageId: string | null) {
	if (!imageId) return;

	await imageRepository.deleteOne(imageId);
}

async function createImage({ name, type, data }: CreateImage) {
	return await imageRepository.createOne({ name: encrypt(name), type, data: encrypt(data) });
}

function validateIfEditPayloadIsEmpty(userInfos: EditUserPayload, image: ImagePayload) {
	const arrKeysUser = Object.keys(userInfos);

	const cleanImage = clearUndefinedProperties<ImagePayload>(image);
	const arrKeysImage = Object.keys(cleanImage);

	if (!arrKeysUser.length && !arrKeysImage.length) {
		throw errorHandling.badRequestError("Payload da request está vazio.");
	}
}

export async function getInfos(userId: string): Promise<GetInfosResponse> {
	const user = await validateIfUserExists(userId);

	return formatUser(user);
}

export async function edit(userId: string, userInfos: EditUserPayload, image: ImagePayload) {
	const storedUser = await validateIfUserExists(userId);

	validateIfEditPayloadIsEmpty(userInfos, image);

	if (userInfos.email) {
		await validateIfEmailDoesNotExist(userInfos.email);
	}

	if (image.name && image.type && image.data) {
		await deletePreviousImage(storedUser.imageId);
		const { id: imageId } = await createImage(image as CreateImage);
		userInfos.imageId = imageId;
	}

	const formattedUser = await formatEditUser(userInfos);

	await userRepository.updateOne(userId, formattedUser);
}
