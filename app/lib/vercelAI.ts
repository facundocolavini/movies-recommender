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
      production_companies,
      spoken_languages,
    } = dataMovie;
    console.log(dataMovie);
    const genreNames = genres.map(genre => genre.name).join(', ');
    const companyNames = production_companies.map(company => company.name).join(', ');
    const languageNames = spoken_languages.map(lang => lang.english_name).join(', ');

    return `
      Title: ${title}
      Overview: ${overview}
      Genres: ${genreNames}
      Release Date: ${release_date}
      Vote Average: ${vote_average}
      Production Companies: ${companyNames}
      Languages: ${languageNames}
    `;
  });

  const combinedPrompt = `
  Recomienda algunas películas según los titulos que te proporcionamos.Y hace un listado de peliculas sin repetir, que tengan un genero en comun con las peliculas que te proporcionamos.
 
 
  Estas son las peliculas que te proporcionamos:
  ${prompts.join('\n\n')}
  
  - El resultado me lo tenes que devolver en html para poder mostrarlo en la pagina web.
  Por ejemplo algo asi:
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
    <p>Basadas en las películas "Boneyard" y "Monkey Man", que son de acción y thriller, se recomiendan las siguientes películas:</p>
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
      <tr>
        <td>Red Notice</td>
        <td>An FBI profiler and two rival criminals team up to stop a daring heist.</td>
        <td>Action, Treasure hunt</td>
        <td>2021-11-12</td>
        <td>6.3/10</td>
      </tr>
    </table>
  </body>
</html>

  Recorda que solo debe devolver el html en la respuesta
  `
  
  
  ;

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