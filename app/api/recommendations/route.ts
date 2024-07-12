// pages/api/recommendations.ts
import { getRecommendations } from '@/app/lib/vercelAI';
import type { NextApiRequest,NextApiResponse } from 'next';
import  { NextResponse } from 'next/server';



export  async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('movieId')
    console.log(id,'aa')

  try {
    const res = await getRecommendations(id ?? '');
    
    return NextResponse.json({ res })
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        error
    })
  }
}