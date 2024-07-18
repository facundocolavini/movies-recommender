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
  Recomienda películas basadas en las siguientes descripciones. Genera una tabla HTML con un máximo de 4 películas que podrían interesar al usuario, excluyendo las películas que el usuario ha seleccionado previamente. Cada película debe tener su propio conjunto de datos organizados en filas y columnas, como se muestra en el ejemplo.

  Estas son las películas que te proporcionamos:
  ${prompts.join('\n\n')}
  
  Responde con una tabla HTML organizada de la siguiente manera:

  <html>
  <head>
    <title>Recomendaciones de películas</title>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h1>Recomendaciones de películas</h1>
    <table>
      <tr>
        <th>Título</th>
        <th>Resumen</th>
        <th>Géneros</th>
        <th>Fecha de lanzamiento</th>
        <th>Calificación promedio</th>
      </tr>
      <tr>
        <td>Ejemplo Título 1</td>
        <td>Ejemplo Resumen 1</td>
        <td>Ejemplo Géneros 1</td>
        <td>Ejemplo Fecha 1</td>
        <td>Ejemplo Calificación 1</td>
      </tr>
   
    </table>
  </body>
  </html>
  `;

  // Generación de texto con el modelo de OpenAI
  const { text } = await generateText({
    model: perplexity('llama-3-sonar-large-32k-online'),
    prompt: combinedPrompt,
    maxTokens: 1000,
    temperature: 0.75,
    frequencyPenalty: 1,
  });

  console.log(text);
  return text;
}