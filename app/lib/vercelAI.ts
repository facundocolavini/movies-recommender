import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OpenAI } from 'openai';
import { getMovie } from './tmdb';

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

function buildPrompt(prompt: string): [{ role: "user"; content: string }] {
  return [
    {
      role: "user",
      content: prompt,
    },
  ];
}

export const getRecommendations = async (movieId: string) => {
  // Realiza la solicitud a la API de TMDb
  const dataMovie = await  getMovie(movieId)


  // Desestructura la data de la respuesta
  const {
    title,
    overview,
    genres,
    release_date,
    vote_average,
    production_companies,
    spoken_languages
  } = dataMovie;

  // Construye el mensaje para la IA
  const genreNames = genres.map((genre: { name: string }) => genre.name).join(', ');
  const companyNames = production_companies.map((company: { name: string }) => company.name).join(', ');
  const languageNames = spoken_languages.map((lang: { english_name: string }) => lang.english_name).join(', ');
  

  const movieDescription = `
    Title: ${title}
    Overview: ${overview}
    Genres: ${genreNames}
    Release Date: ${release_date}
    Vote Average: ${vote_average}
    Production Companies: ${companyNames}
    Languages: ${languageNames}
  `;
  console.log(dataMovie,'movieDescription')
 /*  // Construye el prompt para la IA
  const query = {
    model: 'llama-3-sonar-large-32k-chat',
    stream: true,
    messages: buildPrompt(`Recomienda películas basadas en la siguiente descripción: ${movieDescription}`),
    max_tokens: 1000,
    temperature: 0.75,
    frequency_penalty: 1,
  } as const;

  // Realiza la solicitud a la API de Perplexity
  const response = await perplexity.chat.completions.create(query);
  const stream = OpenAIStream(response);
  const streamingResponse = new StreamingTextResponse(stream);
  console.log(await streamingResponse.text()) */
  return movieDescription
};