import { Image, User } from "@prisma/client";
import { SignUpPayload } from "./authType";

export type UserModified = Omit<User, "password" | "createdAt" | "updatedAt">;

export type GetInfosResponse = Omit<UserModified, "imageId"> & {
	image?: Image;
};

export type EditUserPayload = Partial<SignUpPayload>;
