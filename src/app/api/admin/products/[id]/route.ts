import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Delete product error:', error);

    // Check for PostgreSQL foreign key constraint violation (23001 or P2003)
    if (error.code === '23001' || error.code === 'P2003') {
      return NextResponse.json(
        { error: 'This product is linked to existing customer orders and cannot be deleted.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}