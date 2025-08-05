import { NextRequest, NextResponse } from 'next/server';
import { notifyAdminOfOrderChange } from '@/app/api/admin-notification-helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, orderData } = body;

    // Validate the request
    if (!type || !orderData) {
      return NextResponse.json(
        { error: 'Missing required fields: type and orderData' },
        { status: 400 }
      );
    }

    // Send the admin notification
    await notifyAdminOfOrderChange(
      orderData.id?.toString() || 'unknown',
      orderData,
      type
    );

    return NextResponse.json(
      { success: true, message: 'Admin notification sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in admin notification API:', error);
    return NextResponse.json(
      { error: 'Failed to send admin notification' },
      { status: 500 }
    );
  }
}
