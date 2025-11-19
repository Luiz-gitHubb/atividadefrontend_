import path from "path";

import { PrismaClient } from "@/generated/prisma/client";

const dbUrl = process.env.DATABASE_URL;

if (dbUrl?.startsWith("file:./")) {
	const relativePath = dbUrl.replace("file:./", "");
	const absolutePath = path.resolve(process.cwd(), relativePath);
	process.env.DATABASE_URL = `file:${absolutePath}`;
}

if (process.env.NODE_ENV === "development") {
	console.log("[prisma] using", process.env.DATABASE_URL);
}

export const prisma = new PrismaClient();
