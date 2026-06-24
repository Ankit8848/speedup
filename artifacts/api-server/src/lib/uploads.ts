import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

/** Absolute path to the directory where uploaded media is stored. */
export const UPLOAD_ROOT = path.resolve(
  process.cwd(),
  process.env["UPLOAD_DIR"] ?? "uploads",
);

/** Public URL prefix the frontend uses to reference uploaded files. */
export const UPLOAD_URL_PREFIX = "/api/uploads";

fs.mkdirSync(UPLOAD_ROOT, { recursive: true });

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

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_ROOT),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const id = crypto.randomBytes(8).toString("hex");
    cb(null, `${Date.now()}-${id}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (_req, file, cb) => {
    cb(null, ALLOWED.has(file.mimetype));
  },
});

export function publicUrlFor(filename: string): string {
  return `${UPLOAD_URL_PREFIX}/${filename}`;
}
