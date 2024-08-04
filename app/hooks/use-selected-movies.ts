// src/hooks/use-selected-movies.tsx
import { useState } from 'react';
import { Movie } from '../lib/types';


const useSelectedMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  // Función para eliminar todas las películas seleccionadas
  const clearSelectedMovies = () => {
    setSelectedMovies([]);
  };

  const selectMovie = (movie: Movie) => {
    setSelectedMovies((prevSelectedMovies) => {
      if (prevSelectedMovies.find((m) => m.id === movie.id)) {
        return prevSelectedMovies.filter((m) => m.id !== movie.id);
      } else if (prevSelectedMovies.length < 5) {
        return [...prevSelectedMovies, movie];
      }
      return prevSelectedMovies;
    });
  };

  return { selectedMovies, selectMovie,clearSelectedMovies };
};

export default useSelectedMovies;
