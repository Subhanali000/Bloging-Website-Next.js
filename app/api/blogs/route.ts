import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  return NextResponse.json(store.getAll());
}

export async function POST(req: Request) {
  try {
    const { title, author, content } = await req.json();

    if (!title || !author || !content) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const blog = {
      id: crypto.randomUUID(),
      title,
      author,
      content,
      createdAt: new Date().toISOString(),
    };

    store.create(blog);

    console.log("✅ Blog saved:", blog); // Debug log

    return NextResponse.json(blog);
  } catch (err) {
    console.error("❌ POST error:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
