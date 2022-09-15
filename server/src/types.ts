import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

export type UserJWTPayload = {
  userId: number;
};

export type Context<Params = any, ReqBody = any, ResBody = any> = {
  prisma: PrismaClient;
  req: Request<Params, any, ReqBody> & { user?: User | null };
  res: Response<ResBody>;
};

export const ErrorType = {
  internal: "internal",
  auth: "auth",
  form: "form",
} as const;
