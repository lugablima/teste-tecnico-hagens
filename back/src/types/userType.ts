import { User } from "@prisma/client";

export type GetInfosResponse = Omit<User, "password" | "createdAt" | "updatedAt">;
