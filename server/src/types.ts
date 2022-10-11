import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response } from "express";

export type UserJWTPayload = {
  userId: string;
  userType: UserType;
  accessToken?: string;
};

export type Context<Params = any, ReqBody = any, ResBody = any> = {
  prisma: PrismaClient;
  req: Request<Params, any, ReqBody>;
  res: Response<ResBody>;
};

export const ErrorType = {
  internal: "internal",
  auth: "auth",
  form: "form",
} as const;
