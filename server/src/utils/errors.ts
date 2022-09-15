export function notAuthenticatedErr(msg?: string) {
  return { error: { type: "auth", message: msg ?? "Not Authenticated" } };
}

export function notAuthorizedErr(msg?: string) {
  return { error: { type: "auth", message: msg ?? "Not Authorized" } };
}

export function notFoundErr(msg?: string) {
  return { error: { type: "internal", message: msg ?? "Not Found" } };
}

export function alreadyExistsErr(target?: string) {
  return { error: { type: "internal", message: `${target ?? "Entity"} already exists` } };
}

export function formErr(msg?: string, fields?: string[]) {
  return { error: { type: "form", message: msg ?? "Not Found", fields: fields ?? [] } };
}
