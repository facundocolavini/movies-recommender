
import Head from 'next/head';
import MoviesList from '../components/movie-list';
import { ReactQueryClientProvider } from './context/query-context';
import { SelectedMoviesProvider } from './context/movies-context';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { TransitionLink } from '@/components/transition-links';
import { ChevronRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>Recomendador de Películas</title>
      </Head>
      <main className="flex flex-col items-center justify-center h-full relative z-10">
        {/* Contenido principal */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">Recomendador de Películas</h1>
          <p className="text-xl mb-6">
            Descubre las mejores películas recomendadas para ti.
          </p>
          <div className="flex space-x-4 justify-center">
          <TransitionLink href="/movies">
            Comencemos <ChevronRight size={24} />
          </TransitionLink>
          </div>
          <p className="mt-6 text-gray-400">
            ~ npx create-movie-app@latest
          </p>
        </div>
      </main>
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
    </div>
  );
}

function Background() {
  return (
    <svg className="w-full h-full animate-grid" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#444" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}