import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Algorithm } from "jsonwebtoken";
import { Context } from "types";
import { config } from "dotenv";
config();

export const PROD_ENV = process.env.NODE_ENV === "production";
export const SERVER_PORT = process.env.SERVER_PORT!;
export const SERVER_URL = process.env.SERVER_URL!;
export const CLIENT_URL1 = process.env.CLIENT_URL1!;
export const CLIENT_URL2 = process.env.CLIENT_URL2!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM! as Algorithm;

export const prisma = new PrismaClient();

export function getContext({ req, res }: { req: Request; res: Response }): Context {
  return { prisma, req, res };
}
