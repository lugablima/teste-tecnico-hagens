import { User } from "@prisma/client";

export type SignUpPayload = Omit<User, "id" | "createdAt" | "updatedAt">;

export type SignInPayload = Omit<SignUpPayload, "name">;

export interface JwtData {
	userId: number;
}

export interface ResponseSignIn {
	name: string;
	token: string;
	isAdmin: boolean;
}
