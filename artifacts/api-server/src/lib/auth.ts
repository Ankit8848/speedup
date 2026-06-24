import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { AdminRole, PublicUser } from "@workspace/db";

const JWT_SECRET = process.env["JWT_SECRET"] ?? "dev-speedup-cms-secret-change-me";
const TOKEN_TTL = "7d";

export const AUTH_COOKIE = "speedup_admin";

export interface AuthTokenPayload {
  sub: number;
  email: string;
  role: AdminRole;
  name: string;
}

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signToken(user: PublicUser): string {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.displayName,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function verifyToken(token: string): AuthTokenPayload {
  return jwt.verify(token, JWT_SECRET) as unknown as AuthTokenPayload;
}
