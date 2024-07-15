import { OpenAIStream, StreamingTextResponse} from 'ai';
import { OpenAI } from 'openai';
import { getMovie } from './tmdb';

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

function buildPrompt(prompts: string[]): { role: "user"; content: string; }[] {
  return prompts.map(prompt => ({ role: "user", content: prompt }));
}

export const getRecommendations = async (movieIds: string[]) => {
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

    const genreNames = genres.map((genre: { name: string }) => genre.name).join(', ');
    const companyNames = production_companies.map((company: { name: string }) => company.name).join(', ');
    const languageNames = spoken_languages.map((lang: { english_name: string }) => lang.english_name).join(', ');

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
  Recomienda películas basadas en las siguientes descripciones: 
      Usa este tono según la puntuación de la película:
      1. Muy negativa
      2. Negativa
      3. Neutral
      4. Positiva
      5. Muy positiva

  Recibirás una lista de valoraciones de usuarios en diferentes idiomas pero tu resumen debe estar en español.
   Tu objetivo es resaltar los temas más comunes y las emociones expresadas por los usuarios.
   Si hay varios temas, intenta capturar los más importantes.
  Divídela en 4 párrafos cortos. Máximo 30 palabras en total.
  No vuelvas a repetir la puntuación.
  No hagas referencias a puntuaciones concretas ni a la fecha de la valoración.

  Estas son las recomendaciones de películas que debes tener en cuenta:
  ${prompts.join('\n\n')}`;

  const query = {
    model: 'llama-3-sonar-large-32k-chat',
    stream: true,
    messages: buildPrompt([combinedPrompt]),
    max_tokens: 1000,
    temperature: 0.75,
    frequency_penalty: 1,
  } as const;

  const response = await perplexity.chat.completions.create(query);
  const stream = OpenAIStream(response);
  const streamingResponse = new StreamingTextResponse(stream);
// Corrección: Leer el cuerpo de la respuesta una vez y almacenarlo en una variable.
const recommendationsText = await streamingResponse.text();


let formattedText = recommendationsText;


// Paso 2: Eliminar caracteres especiales innecesarios.
formattedText = formattedText

// Paso 3: Reemplazar secuencias de escape de salto de línea por verdaderos saltos de línea (si es necesario).
// En este caso, el texto ya contiene saltos de línea reales.

// Paso 4: Trim para eliminar espacios extra al principio y al final.
formattedText = formattedText.trim();

console.log(formattedText);

return formattedText;

};