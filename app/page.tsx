
import Head from 'next/head';
import MoviesList from '../components/movie-list';
import { ReactQueryClientProvider } from './context/query-context';
import { SelectedMoviesProvider } from './context/movies-context';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recomendador de Películas</title>
      </Head>
      <main className="container mx-auto p-4">
        <ReactQueryClientProvider>
          <MoviesList />
        </ReactQueryClientProvider>
      </main>
    </div>
  );
}
