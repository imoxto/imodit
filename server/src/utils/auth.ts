import { User } from "@prisma/client";
import argon2 from "argon2";
import { JWT_ALGORITHM, JWT_SECRET, PROD_ENV } from "../config";
import { randomBytes } from "crypto";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Context, UserJWTPayload } from "../types";
import { getTwitterUser } from "../oauth";

const hashingConfig = {
  // based on OWASP cheat sheet recommendations (as of March, 2022)
  parallelism: 1,
  memoryCost: 64000, // 64 mb
  timeCost: 3, // number of itetations
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: PROD_ENV ? "strict" : "none",
  // domain: new URL(CLIENT_URL as string).hostname as string,
};

const durationInS = 7 * 24 * 60 * 60;

const COOKIE_NAME = "imodit.auth";

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

export function addResCookie({
  res,
  user,
  remember = true,
  accessToken,
  duration,
}: {
  res: Response;
  user: User;
  remember?: boolean;
  accessToken?: string;
  duration?: number;
}) {
  const { id, type } = user;
  const token = signToken<UserJWTPayload>({
    userId: id,
    userType: type,
    accessToken,
  });
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    expires: remember ? new Date(Date.now() + (duration ?? durationInS) * 1000) : undefined,
  });
}

export function removeResCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, cookieOptions);
}

export function getJwtPayloadFromReq(req: Request) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    throw new Error("Not Authenticated");
  }
  return jwt.verify(token, JWT_SECRET) as Promise<UserJWTPayload>;
}

export async function checkUser(user: User | null, accessToken: string | undefined) {
  if (!user) throw new Error("Not Authenticated");
  if (user.type === "twitter") {
    if (!accessToken) {
      throw new Error("Not Authenticated");
    }
    const twUser = await getTwitterUser(accessToken);
    if (twUser?.id !== user.id) {
      throw new Error("Not Authenticated");
    }
  }
  return user;
}

export async function authenticate({ req, prisma }: Context) {
  const { userId, userType, accessToken } = await getJwtPayloadFromReq(req);
  const userFromDb = await prisma.user.findUnique({
    where: { id_type: { id: userId, type: userType } },
  });
  return await checkUser(userFromDb, accessToken);
}

export async function authenticateWithPost({ req, prisma }: Context, postId: string) {
  const { userId, accessToken } = await getJwtPayloadFromReq(req);
  const postFromDb = await prisma.post.findFirst({
    where: { id: postId, authorId: userId },
    include: { author: true },
  });
  if (!postFromDb) throw new Error("Not Authenticated");
  await checkUser(postFromDb.author, accessToken);
  return postFromDb;
}

export async function authenticateWithComment({ req, prisma }: Context, commentId: string) {
  const { userId, accessToken } = await getJwtPayloadFromReq(req);
  const commentFromDb = await prisma.comment.findFirst({
    where: { id: commentId, authorId: userId },
    include: { author: true },
  });
  if (!commentFromDb) throw new Error("Not Authenticated");
  await checkUser(commentFromDb.author, accessToken);
  return commentFromDb;
}
