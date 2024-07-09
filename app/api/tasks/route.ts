import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

// READ
export async function GET() {
  const tasks = await prisma.task.findMany();

  if (tasks.length === 0) {
    return NextResponse.json({ error: "No tasks found" }, { status: 404 });
  }

  return NextResponse.json(tasks);
}
