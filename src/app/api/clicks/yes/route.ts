import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST() {
  try {
    const { db } = await connectToDatabase();
    await db.collection("yes_clicks").insertOne({
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, message: "Yes click saved!" });
  } catch (error) {
    console.error("Failed to save yes click:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save click" },
      { status: 500 }
    );
  }
}
