import { NextResponse } from 'next/server';

const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

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
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error al conectar con el servidor', data: [] },
      { status: 500 }
    );
  }
}
