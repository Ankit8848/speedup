import { pgTable, pgEnum, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const adminRoleEnum = pgEnum("admin_role", ["super_admin", "editor"]);

export const adminUsersTable = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  role: adminRoleEnum("role").notNull().default("editor"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// API never accepts a raw hash; password is provided separately and hashed server-side.
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(1),
  role: z.enum(["super_admin", "editor"]).default("editor"),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  displayName: z.string().min(1).optional(),
  role: z.enum(["super_admin", "editor"]).optional(),
  active: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type AdminRole = (typeof adminRoleEnum.enumValues)[number];
export type AdminUser = typeof adminUsersTable.$inferSelect;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// Shape returned to clients — never expose the password hash.
export type PublicUser = Omit<AdminUser, "passwordHash">;
