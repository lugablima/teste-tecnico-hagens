import { Image } from "@prisma/client";

export type CreateImage = Omit<Image, "id">;

export interface ImagePayload {
	name?: string;
	type?: string;
	data?: string;
}
