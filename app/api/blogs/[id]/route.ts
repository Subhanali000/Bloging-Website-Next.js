import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 

  const blog = store.get(id);

  if (!blog) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ unwrap

  const data = await req.json();
  store.update(id, data);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ unwrap

  store.delete(id);

  return NextResponse.json({ success: true });
}
