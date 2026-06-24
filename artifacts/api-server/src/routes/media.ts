import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, mediaAssetsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { upload, saveUpload, deleteUpload } from "../lib/uploads";
import { HttpError } from "../lib/http-error";

const router: IRouter = Router();

/** GET /api/media — list uploaded assets, newest first. */
router.get("/", requireAuth, async (_req, res) => {
  const rows = await db
    .select()
    .from(mediaAssetsTable)
    .orderBy(desc(mediaAssetsTable.createdAt));
  res.json(rows);
});

/** POST /api/media — multipart upload of a single file (field name "file"). */
router.post("/", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) throw HttpError.badRequest("No file uploaded (or type not allowed)");

  const stored = await saveUpload(req.file);

  const [asset] = await db
    .insert(mediaAssetsTable)
    .values({
      filename: stored.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      url: stored.url,
      uploadedBy: req.user!.sub,
    })
    .returning();

  res.status(201).json(asset);
});

/** DELETE /api/media/:id — remove DB record and the file on disk. */
router.delete("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) throw HttpError.badRequest("Invalid media id");

  const [asset] = await db
    .select()
    .from(mediaAssetsTable)
    .where(eq(mediaAssetsTable.id, id));
  if (!asset) throw HttpError.notFound("Media not found");

  await db.delete(mediaAssetsTable).where(eq(mediaAssetsTable.id, id));
  await deleteUpload(asset.url, asset.filename).catch(() => {
    /* file already gone — DB record removal is what matters */
  });

  res.json({ ok: true });
});

export default router;
