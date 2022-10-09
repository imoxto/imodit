import { Response } from "express";

export function notAuthenticatedErr(res: Response, msg?: string) {
  res.status(401);
  return { error: { type: "auth", message: msg ?? "Not Authenticated" } };
}

export function notAuthorizedErr(res: Response, msg?: string) {
  res.status(403);
  return { error: { type: "auth", message: msg ?? "Not Authorized" } };
}

export function notFoundErr(res: Response, msg?: string) {
  res.status(404);
  return { error: { type: "internal", message: msg ?? "Not Found" } };
}

export function alreadyExistsErr(res: Response, target?: string) {
  res.status(404);
  return { error: { type: "internal", message: `${target ?? "Entity"} already exists` } };
}

export function formErr(res: Response, msg?: string, fields?: Record<string, string>) {
  res.status(400);
  return { error: { type: "form", message: msg ?? "Not Found", fields: fields ?? {} } };
}

export function internalErr(res: Response, message?: string) {
  res.status(500);
  return { error: { type: "internal", message: message ?? "Something went wrong, please try again!" } };
}
