import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

/**
 * Uploaded media files. The binary lives on disk under the API server's
 * upload directory; `url` is the path the frontend uses to reference it.
 */
export const mediaAssetsTable = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull().unique(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  url: text("url").notNull(),
  uploadedBy: integer("uploaded_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MediaAsset = typeof mediaAssetsTable.$inferSelect;
