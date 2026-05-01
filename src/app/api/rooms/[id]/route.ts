import { NextRequest, NextResponse } from 'next/server';
import env from '@/src/environment';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'es';

  try {
    const res = await fetch(`${env.backend.api}/api/public/habitaciones/${id}?locale=${locale}`);
    const data: ApiResponse<RoomItem> = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching room', data: null, timestamp: Date.now() },
      { status: 500 }
    );
  }
}
