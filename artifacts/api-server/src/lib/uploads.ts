import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";
import { put, del } from "@vercel/blob";

/**
 * Upload storage. On Vercel the filesystem is read-only, so when a Vercel Blob
 * token is present we stream uploads to Blob; otherwise (local dev) we write to
 * a directory on disk served by Express. Files are buffered in memory by multer
 * either way so the route can choose the destination.
 */

const BLOB_TOKEN = process.env["BLOB_READ_WRITE_TOKEN"];
const useBlob = Boolean(BLOB_TOKEN);

/** Absolute path to the local upload directory (disk mode only). */
export const UPLOAD_ROOT = path.resolve(
  process.cwd(),
  process.env["UPLOAD_DIR"] ?? "uploads",
);

/** Public URL prefix for disk-served files. */
export const UPLOAD_URL_PREFIX = "/api/uploads";

// Only create the local dir when actually using disk — Vercel's FS is read-only.
if (!useBlob) {
  try {
    fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
  } catch {
    /* ignore — disk uploads simply won't be available */
  }
}

const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
  "video/mp4",
  "video/webm",
]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (_req, file, cb) => {
    cb(null, ALLOWED.has(file.mimetype));
  },
});

export interface StoredFile {
  filename: string;
  url: string;
}

/** Persist an uploaded file to Blob (prod) or disk (dev) and return its URL. */
export async function saveUpload(file: Express.Multer.File): Promise<StoredFile> {
  const ext = path.extname(file.originalname).toLowerCase();
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;

  if (useBlob) {
    const blob = await put(filename, file.buffer, {
      access: "public",
      contentType: file.mimetype,
      token: BLOB_TOKEN,
    });
    return { filename, url: blob.url };
  }

  await fsp.writeFile(path.join(UPLOAD_ROOT, filename), file.buffer);
  return { filename, url: `${UPLOAD_URL_PREFIX}/${filename}` };
}

/** Remove a previously stored file given its public URL. */
export async function deleteUpload(url: string, filename: string): Promise<void> {
  if (useBlob || /^https?:\/\//.test(url)) {
    await del(url, { token: BLOB_TOKEN });
    return;
  }
  await fsp.rm(path.join(UPLOAD_ROOT, filename), { force: true });
}
