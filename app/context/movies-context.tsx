'use client';
// src/contexts/SelectedMoviesContext.tsx
import { createContext, useContext, ReactNode } from 'react';
 
import { Movie } from '@/app/lib/types'; // Asegúrate de importar el tipo correcto
import useSelectedMovies from '../hooks/use-selected-movies';

interface SelectedMoviesContextType {
  selectedMovies: Movie[];
  selectMovie: (movie: Movie) => void;
}

const SelectedMoviesContext = createContext<SelectedMoviesContextType | undefined>(undefined);

export const SelectedMoviesProvider = ({ children }: { children: ReactNode }) => {
  const { selectedMovies, selectMovie } = useSelectedMovies();

  return (
    <SelectedMoviesContext.Provider value={{ selectedMovies, selectMovie }}>
      {children}
    </SelectedMoviesContext.Provider>
  );
};

export const useSelectedMoviesContext = () => {
  const context = useContext(SelectedMoviesContext);
  if (context === undefined) {
    throw new Error('useSelectedMoviesContext must be used within a SelectedMoviesProvider');
  }
  return context;
};
