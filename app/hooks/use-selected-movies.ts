// src/hooks/use-selected-movies.tsx
import { useState } from 'react';
import { Movie } from '../lib/types';
import { toast } from "sonner"

const useSelectedMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  // Función para eliminar todas las películas seleccionadas
  const clearSelectedMovies = () => {
    toast("Eliminando todas las películas seleccionadas", {
      description: "Se han eliminado todas las películas seleccionadas",
      },
    )
    setSelectedMovies([]);
  };

  const selectMovie = (movie: Movie) => {
    setSelectedMovies((prevSelectedMovies) => {
      if (prevSelectedMovies.find((m) => m.id === movie.id)) {
        // Si la película ya está seleccionada, la eliminamos
        return prevSelectedMovies.filter((m) => m.id !== movie.id);
      } else {
        // Si no está seleccionada y ya hay 5 películas seleccionadas, reemplazamos la más antigua
        if (prevSelectedMovies.length === 5) {
          return [...prevSelectedMovies.slice(1), movie];
        }
        // Si no hay 5 películas seleccionadas, simplemente agregamos la nueva
        return [...prevSelectedMovies, movie];
      }
    });
  };
  
  return { selectedMovies, selectMovie,clearSelectedMovies };
};

export default useSelectedMovies;
