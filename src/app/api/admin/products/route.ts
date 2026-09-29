import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, description, price, stock, categoryId, images } = body;

    // Pehle check karein ke category database mein exist karti hai ya nahi
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { error: `Category with ID ${categoryId} does not exist in the database.` },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        images: Array.isArray(images) ? images : [images],
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    // P2002 = Prisma unique constraint violation (duplicate slug)
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Is slug ka product pehle se maujood hai. Slug badal kar dobara try karo." },
        { status: 409 }
      );
    }

    // Asli error sirf server console mein log hoga, client ko internal details nahi jayengi
    console.error("Error creating product details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}