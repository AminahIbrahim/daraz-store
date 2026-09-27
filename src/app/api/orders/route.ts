import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

interface OrderItemInput {
  id: string;
  quantity: number;
  price: number;
}

// GET: Fetch order history for the logged-in user
export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id || "guest-user-id";

    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    const session = await auth();

    const userId = session?.user?.id || "guest-user-id";

    const { items, totalAmount, shippingAddress, paymentMethod, phone, fullName, city } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    // 1. Create an Address record first to obtain a valid addressId
    const addressRecord = await prisma.address.create({
      data: {
        userId: userId,
        fullName: fullName || session?.user?.name || "Customer",
        phone: phone || "03000000000",
        street: shippingAddress || "Default Address",
        city: city || "Karachi",
        postalCode: "75500",
        country: "Pakistan",
      },
    });

    // 2. Create the Order linked with the valid addressId
    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount: Number(totalAmount),
        status: "PENDING",
        paymentMethod: paymentMethod || "COD",
        addressId: addressRecord.id,
        items: {
          create: items.map((item: OrderItemInput) => ({
            productId: item.id,
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: unknown) {
    console.error("Order creation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to place order: " + errorMessage },
      { status: 500 }
    );
  }
}