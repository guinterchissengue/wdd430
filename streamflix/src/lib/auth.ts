import { auth } from "@clerk/nextjs/server";

export async function requireUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  return userId;
}

export async function requireAdmin() {
  const userId = await requireUser();

  const adminIds = (process.env.ADMIN_USER_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!adminIds.includes(userId)) {
    throw new Error("FORBIDDEN");
  }

  return userId;
}
