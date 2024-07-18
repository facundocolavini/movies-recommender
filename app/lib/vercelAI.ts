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
      Title: ${title}
      Overview: ${overview}
      Genres: ${genreNames}
      Release Date: ${release_date}
      Vote Average: ${vote_average}
    `;
  });

  const combinedPrompt = `
  Recomienda algunas películas según los títulos que te proporcionamos. Haz un listado de películas sin repetir, que tengan un género en común con las películas que te proporcionamos.

  Estas son las películas que te proporcionamos:
  ${prompts.join('\n\n')}
  
  - El resultado me lo tienes que devolver en HTML para poder mostrarlo en la página web.
  - La tabla debe tener un máximo de 4 películas.
  - La respuesta solo debe ser HTML y no texto.

  Por ejemplo algo así:
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
        <td>Black and Blue</td>
        <td>A rookie cop captures the murder of a young drug dealer on her body cam, leading her to team up with a community member to escape corrupt cops and criminals.</td>
        <td>Action, Revenge</td>
        <td>2019-10-25</td>
        <td>6.4/10</td>
      </tr>
      <tr>
        <td>Argylle</td>
        <td>A reclusive author's fictional espionage novels mirror real-life spy actions, leading her on a thrilling adventure with a cat-allergic spy.</td>
        <td>Action, Spies</td>
        <td>2024-01-31</td>
        <td>6.0/10</td>
      </tr>
      <tr>
        <td>Extraction 2</td>
        <td>Tyler Rake must extract a family from a Georgian gangster's mercy, but the gangster's brother seeks revenge.</td>
        <td>Action, Terrorism</td>
        <td>2023-06-16</td>
        <td>7.0/10</td>
      </tr>
      <tr>
        <td>The Gray Man</td>
        <td>Court Gentry, aka Sierra Six, becomes a target after uncovering dark CIA secrets, leading to a global manhunt.</td>
        <td>Action, Spies</td>
        <td>2022-07-22</td>
        <td>6.5/10</td>
      </tr>
    </table>
  </body>
</html>

  Recuerda que solo debe devolver el HTML en la respuesta.
  `;

  // Generación de texto con el modelo de OpenAI
  const { text } = await generateText({
    model: perplexity('llama-3-sonar-small-32k-online'),
    prompt: combinedPrompt,
    maxTokens: 500, // Reducir la cantidad de tokens
    temperature: 0.7, // Ajustar la temperatura para respuestas más rápidas
    frequencyPenalty: 0.5, // Ajustar frecuencia de penalización
  });

  console.log(text);
  return text;
}
