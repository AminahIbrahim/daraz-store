import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

interface CheckoutBody {
  items: CartItem[];
  userId: string;
  shippingAddress: string;
}

export async function POST(request: Request) {
  try {
    const body: CheckoutBody = await request.json();
    const { items, userId, shippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Re-verify total amount on the backend side
    const totalAmount = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    // Database transaction: Create order and update product stock
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create order record
      const order = await tx.order.create({
        data: {
          user: {
            connect: { id: userId },
          },
          shippingAddress: shippingAddress,
          totalAmount: totalAmount + 5.0, // Subtotal + $5 Shipping Fee
          status: 'PENDING',
          items: {
            create: items.map((item: CartItem) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // 2. Decrement stock for purchased products
      for (const item of items) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });

    return NextResponse.json(
      { success: true, orderId: result.id, message: 'Order placed successfully!' },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Checkout Error:', error);
    return NextResponse.json(
      { error: 'Failed to process order', details: errorMessage },
      { status: 500 }
    );
  }
}