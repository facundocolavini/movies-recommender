import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getMovie } from './tmdb';

// Configuración del cliente de OpenAI
export const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
  baseURL: 'https://api.perplexity.ai/',
});

export async function getRecommendations(movieIds: string[]) {
  const moviesDetails = await Promise.all(movieIds.map(id => getMovie(id)));

  const prompts = moviesDetails.map(dataMovie => {
    const {
      title,
      overview,
      genres,
      release_date,
      vote_average,
    } = dataMovie;
    const genreNames = genres.map(genre => genre.name).join(', ');

    return `
      Título: ${title}
      Resumen: ${overview}
      Géneros: ${genreNames}
      Fecha de lanzamiento: ${release_date}
      Calificación promedio: ${vote_average}
    `;
  });

  const combinedPrompt = `
  - Recomenda películas basadas en 5 peliculas que el usuario seleccionó
  - Tenes que darme solamente nombres de las peliculas segun las siguientes recomendaciones:
  ${prompts.join('\n\n')}
  - Las recomendaciones tienen que tener cohesion con las peliculas seleccionadas
  - Solamente el nombre de la pelicula
  - Hasta 5 recomendaciones
  - Separa cada titulo con un - (guion)
  - Si no tenes recomendaciones, escribí "No tengo recomendaciones"
  - No se pueden repetir nombres de peliculas
  - No mostrar las mismas peliculas que el usuario seleccionó
  `;

  // Generación de texto con el modelo de OpenAI
  const { text } = await generateText({
    model: perplexity('llama-3-8b-instruct'),
    prompt: combinedPrompt,
    maxTokens: 1000,
    temperature: 0.75,
    frequencyPenalty: 1,
  });

  console.log(text);
  return text;
}

