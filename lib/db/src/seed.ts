/**
 * Seed script for the SpeedUp CMS.
 *
 * Creates the initial super-admin account so you can sign in to /admin.
 * Site content is NOT seeded here — the frontend ships built-in defaults
 * (the content registry), and the `content_blocks` table only stores the
 * fields an admin has actually overridden.
 *
 * Requires DATABASE_URL. Admin credentials come from SEED_ADMIN_* env vars.
 */
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, pool } from "./index";
import { adminUsersTable } from "./schema";

async function main() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@speedup.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "admin12345";
  const displayName = process.env.SEED_ADMIN_NAME ?? "Site Owner";

  const [existing] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email));

  if (existing) {
    console.log(`✓ Super admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(adminUsersTable).values({
    email,
    passwordHash,
    displayName,
    role: "super_admin",
  });

  console.log("✓ Created super admin");
  console.log(`  email:    ${email}`);
  console.log(`  password: ${password}`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
