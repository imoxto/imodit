import { User } from "@prisma/client";
import argon2 from "argon2";
import { CLIENT_URL, JWT_ALGORITHM, JWT_SECRET, NODE_ENV } from "../config";
import { randomBytes } from "crypto";
import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { Context, UserJWTPayload } from "types";

const hashingConfig = {
  // based on OWASP cheat sheet recommendations (as of March, 2022)
  parallelism: 1,
  memoryCost: 64000, // 64 mb
  timeCost: 3, // number of itetations
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: NODE_ENV === "production" ? "strict" : "none",
  domain: new URL(CLIENT_URL as string).hostname as string,
};

const durationInS = 7 * 24 * 60 * 60;

const COOKIE_NAME = "auth.token";

export async function hashPassword(password: string) {
  let salt = randomBytes(16);
  return await argon2.hash(password, {
    ...hashingConfig,
    salt,
  });
}

export async function verifyPasswordWithHash(password: string, hash: string) {
  const success = await argon2.verify(hash, password, hashingConfig);
  if (!success) throw new Error("Incorrect credentials");
}

export function signToken<Payload extends Record<string, any>>(payload: Payload) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: durationInS,
  });
}

export async function addResCookie(res: Response, user: User, remember = true) {
  const { id } = user;
  const token = signToken<UserJWTPayload>({
    userId: id,
  });
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    expires: remember ? new Date(Date.now() + durationInS * 1000) : undefined,
  });
}

export function removeResCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, cookieOptions);
}

export async function authenticate({ req, prisma }: Context) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    throw new Error("Not Authenticated");
  }
  const { userId } = (await jwt.verify(token, JWT_SECRET)) as UserJWTPayload;
  const userFromDb = await prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });
  if (!userFromDb) throw new Error("Not Authenticated");
  req.user = userFromDb;
}
