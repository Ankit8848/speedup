import { pgTable, serial, text, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

/**
 * A content block is one editable section of the site (e.g. "home.hero",
 * "global.navbar"). `data` holds the section's content object, whose shape is
 * described by the shared content registry. Storing JSON keeps the schema
 * stable while the editable surface evolves.
 */
export const contentBlocksTable = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  data: jsonb("data").notNull(),
  updatedBy: integer("updated_by"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const upsertContentSchema = z.object({
  data: z.unknown(),
});

export type ContentBlock = typeof contentBlocksTable.$inferSelect;
export type UpsertContent = z.infer<typeof upsertContentSchema>;
