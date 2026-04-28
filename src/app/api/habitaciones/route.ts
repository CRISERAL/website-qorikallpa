import { NextResponse } from 'next/server';

const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND || process.env.API_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!API_BACKEND) {
    console.error('API_BACKEND no configurado');
    return NextResponse.json(
      { success: false, message: 'API_BACKEND no configurado en el servidor', data: [] },
      { status: 500 }
    );
  }

  const params = new URLSearchParams();
  if (searchParams.get('tipo')) params.append('tipo', searchParams.get('tipo')!);
  if (searchParams.get('fecha_inicio'))
    params.append('fecha_inicio', searchParams.get('fecha_inicio')!);
  if (searchParams.get('fecha_fin')) params.append('fecha_fin', searchParams.get('fecha_fin')!);
  if (searchParams.get('orden_precio'))
    params.append('orden_precio', searchParams.get('orden_precio')!);
  if (searchParams.get('locale')) params.append('locale', searchParams.get('locale')!);

  const query = params.toString();
  const url = `${API_BACKEND}/api/public/habitaciones${query ? `?${query}` : ''}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching:', err.message);
    return NextResponse.json(
      { success: false, message: `Error: ${err.message}`, data: [] },
      { status: 500 }
    );
  }
}
