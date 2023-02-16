import { User } from "@prisma/client";
import { SignUpPayload } from "./authType";

export type GetInfosResponse = Omit<User, "password" | "createdAt" | "updatedAt">;

export type EditUserPayload = Partial<SignUpPayload>;
