import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import {
  db,
  adminUsersTable,
  createUserSchema,
  updateUserSchema,
  type PublicUser,
} from "@workspace/db";
import { requireAuth, requireRole } from "../middlewares/auth";
import { hashPassword } from "../lib/auth";
import { HttpError } from "../lib/http-error";

const router: IRouter = Router();

function toPublicUser(row: typeof adminUsersTable.$inferSelect): PublicUser {
  const { passwordHash: _omit, ...rest } = row;
  return rest;
}

// All user-management routes require a signed-in super admin.
router.use(requireAuth, requireRole("super_admin"));

/** GET /api/users — list all admins. */
router.get("/", async (_req, res) => {
  const rows = await db
    .select()
    .from(adminUsersTable)
    .orderBy(desc(adminUsersTable.createdAt));
  res.json(rows.map(toPublicUser));
});

/** POST /api/users — create an admin. */
router.post("/", async (req, res) => {
  const input = createUserSchema.parse(req.body);
  const email = input.email.toLowerCase();

  const [existing] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email));
  if (existing) throw HttpError.conflict("An admin with that email already exists");

  const passwordHash = await hashPassword(input.password);
  const [user] = await db
    .insert(adminUsersTable)
    .values({
      email,
      passwordHash,
      displayName: input.displayName,
      role: input.role,
    })
    .returning();

  res.status(201).json(toPublicUser(user));
});

/** PATCH /api/users/:id — update an admin (email, name, role, active, password). */
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) throw HttpError.badRequest("Invalid user id");

  const input = updateUserSchema.parse(req.body);
  const patch: Partial<typeof adminUsersTable.$inferInsert> = { updatedAt: new Date() };

  if (input.email) patch.email = input.email.toLowerCase();
  if (input.displayName) patch.displayName = input.displayName;
  if (input.role) patch.role = input.role;
  if (typeof input.active === "boolean") patch.active = input.active;
  if (input.password) patch.passwordHash = await hashPassword(input.password);

  const [user] = await db
    .update(adminUsersTable)
    .set(patch)
    .where(eq(adminUsersTable.id, id))
    .returning();

  if (!user) throw HttpError.notFound("User not found");
  res.json(toPublicUser(user));
});

/** DELETE /api/users/:id — remove an admin (cannot delete yourself). */
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) throw HttpError.badRequest("Invalid user id");
  if (id === req.user!.sub) throw HttpError.badRequest("You cannot delete your own account");

  const [user] = await db
    .delete(adminUsersTable)
    .where(eq(adminUsersTable.id, id))
    .returning();

  if (!user) throw HttpError.notFound("User not found");
  res.json({ ok: true });
});

export default router;
