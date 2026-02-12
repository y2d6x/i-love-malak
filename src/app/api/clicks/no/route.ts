import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST() {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    const { db } = await connectToDatabase();
    await db.collection("no_clicks").insertOne({
      timestamp: new Date(),
      ip,
    });

    return NextResponse.json({ success: true, message: "No click saved!" });
  } catch (error) {
    console.error("Failed to save no click:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save click" },
      { status: 500 }
    );
  }
}
