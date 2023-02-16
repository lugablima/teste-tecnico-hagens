import { User } from "@prisma/client";

export type SignUpPayload = Omit<User, "id" | "createdAt" | "updatedAt">;

export type SignInPayload = Omit<SignUpPayload, "name" | "phone">;

export interface JwtData {
	userId: string;
}

export interface ResponseSignIn {
	token: string;
}
