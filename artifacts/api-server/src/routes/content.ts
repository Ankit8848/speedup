import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  db,
  contentBlocksTable,
  upsertContentSchema,
} from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

/**
 * GET /api/content — public. Returns all content blocks as a single
 * { key: data } map so the site can hydrate in one request.
 */
router.get("/", async (_req, res) => {
  const rows = await db.select().from(contentBlocksTable);
  const map: Record<string, unknown> = {};
  for (const row of rows) map[row.key] = row.data;
  res.json(map);
});

/** GET /api/content/:key — public, single block. */
router.get("/:key", async (req, res) => {
  const [row] = await db
    .select()
    .from(contentBlocksTable)
    .where(eq(contentBlocksTable.key, req.params.key));
  res.json(row?.data ?? null);
});

/** PUT /api/content/:key — auth required. Upserts a block's data. */
router.put("/:key", requireAuth, async (req, res) => {
  const { data } = upsertContentSchema.parse(req.body);
  const key = String(req.params.key);

  const [saved] = await db
    .insert(contentBlocksTable)
    .values({ key, data, updatedBy: req.user!.sub, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: contentBlocksTable.key,
      set: { data, updatedBy: req.user!.sub, updatedAt: new Date() },
    })
    .returning();

  res.json({ key: saved.key, data: saved.data });
});

export default router;
