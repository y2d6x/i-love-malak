import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, message: "Answers array is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    await db.collection("quiz_answers").insertOne({
      answers,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, message: "Answers saved!" });
  } catch (error) {
    console.error("Failed to save quiz answers:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save answers" },
      { status: 500 }
    );
  }
}
