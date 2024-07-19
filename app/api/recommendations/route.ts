// pages/api/recommendations.ts
import { searchMovieByTitle } from '@/app/lib/tmdb';
import { Movie } from '@/app/lib/types';
import { getRecommendations } from '@/app/lib/vercelAI';
import type { NextApiRequest,NextApiResponse } from 'next';
import  { NextResponse } from 'next/server';



/* export  async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')
    console.log(ids,'aa')
    const arrIds = ids?.split(',')

  try {
    const res = await getRecommendations(arrIds ?? []);
    
    return NextResponse.json({ res })
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        error
    })
  }
} */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')
  console.log(ids,'aa')
  const arrIds = ids?.split(',')
  const recommendedTitles = [
    'Inspector Gadget',
    'Chicken Little',
    'The Incredibles',
    'Spy Kids',
    'Penguins of Madagascar'
  ];

  try {
    //  Obtener recomendaciones de películas
    const res = await getRecommendations(arrIds ?? []);
    // RES DEBERIA SE DE ESTA FORMA SIEMRPRE:
    /* 
    - Descendants
- Descendants 2
- Descendants 3
- ZOMBIES: The Re-Animated Series
- Cinderella
 */ 
    // Transforma res en un array de strings considera el - o el \n como separador
    const recommendations = res.split(/-|\n/).map(title => title.trim()).filter(title => title.length > 0);

    // Buscar detalles de cada película recomendada en TMDb
    const moviesDetailsPromises = recommendations.map(title => searchMovieByTitle(title));
    const moviesDetails = await Promise.all(moviesDetailsPromises);

    // Filtrar cualquier posible valor nulo (en caso de errores)
    const validMoviesDetails = moviesDetails.filter(detail => detail !== null) as Movie[];
    console.log(validMoviesDetails,'validMoviesDetails')
    return NextResponse.json(validMoviesDetails );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}