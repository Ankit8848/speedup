import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, adminUsersTable, loginSchema, type PublicUser } from "@workspace/db";
import {
  AUTH_COOKIE,
  signToken,
  verifyPassword,
} from "../lib/auth";
import { requireAuth } from "../middlewares/auth";
import { HttpError } from "../lib/http-error";

const router: IRouter = Router();

function toPublicUser(row: typeof adminUsersTable.$inferSelect): PublicUser {
  const { passwordHash: _omit, ...rest } = row;
  return rest;
}

/** POST /api/auth/login — exchange credentials for a session token. */
router.post("/login", async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email.toLowerCase()));

  if (!user || !user.active) throw HttpError.unauthorized("Invalid credentials");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw HttpError.unauthorized("Invalid credentials");

  const publicUser = toPublicUser(user);
  const token = signToken(publicUser);

  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ token, user: publicUser });
});

/** POST /api/auth/logout — clear the session cookie. */
router.post("/logout", (_req, res) => {
  res.clearCookie(AUTH_COOKIE);
  res.json({ ok: true });
});

/** GET /api/auth/me — current session's user. */
router.get("/me", requireAuth, async (req, res) => {
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, req.user!.sub));

  if (!user || !user.active) throw HttpError.unauthorized("Session no longer valid");
  res.json(toPublicUser(user));
});

export default router;
