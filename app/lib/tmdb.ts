import { APIGetMovie, APIGetMovies } from "./types";

// services/tmdb.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';



export const getMovie = async (movieId: string) => {
  const dataMovies = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const res: APIGetMovie = await dataMovies.json();

  return res
};

export async function getMovieList(page: number) {
  // El array de ids 

  const movieURL = `https://api.themoviedb.org/3/movie/popular?page=${page}`;

  const response = await fetch(movieURL,
    {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie list');
  }
  const data: APIGetMovies = await response.json();

  return data

}

// Función auxiliar para buscar películas en TMDb por título 
export async function searchMovieByTitle(title: string) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      // Retorna el primer resultado de la búsqueda
      return data.results[0];
    } else {
      // No se encontró la película en TMDb
      return { title, notFound: true };
    }
  } catch (error) {
    console.error('Error al buscar película:', error);
    return null;
  }
}