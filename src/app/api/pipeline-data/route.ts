import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  // Cookie is already checked by middleware, but double-check here
  const authCookie = request.cookies.get('gridline-auth');
  if (!authCookie?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const dataPath = join(process.cwd(), 'data', 'pipeline-data.json');
    const data = readFileSync(dataPath, 'utf-8');

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Data not found' }, { status: 500 });
  }
}
