
import Head from 'next/head';
import SearchForm from '../components/search-form';
import { ReactQueryClientProvider } from './context/query-context';
import MoviesList from '@/components/movie-list';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recomendador de Películas</title>
      </Head>
      <main className="container mx-auto p-4">
        <ReactQueryClientProvider>
          <h1 className="text-3xl font-bold">Recomendador de Películas</h1>
          <p>Seleccione
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
              una película
            </a> y obtenga recomendaciones de películas similares.

          </p>
          <SearchForm />
          <MoviesList />
        </ReactQueryClientProvider>
      </main>
    </div>
  );
}
