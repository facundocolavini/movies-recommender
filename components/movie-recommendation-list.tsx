'use client'
import React, { useEffect, useState } from 'react';
import { useSelectedMoviesContext } from '@/app/context/movies-context';

// Asumiendo que tienes un tipo o interfaz para las recomendaciones
// Si las recomendaciones son del mismo tipo que Movie, puedes reutilizar la interfaz Movie
// De lo contrario, define una interfaz adecuada para tus recomendaciones
import { Movie } from '@/app/lib/types';

const MoviesRecommendationList = () => {
    const { selectedMovies } = useSelectedMoviesContext();
    const [recommendations, setRecommendations] = useState<string>('');

    useEffect(() => {
        if (selectedMovies.length > 0) {
            const ids = selectedMovies.map(movie => movie.id).join(',');
            fetch(`/api/recommendations?ids=${ids}`)
                .then(response => response.json())
                .then(data => {
                  console.log(data,'data')
                    if (!data.error) {
                        // Asegúrate de que la respuesta se ajuste a la estructura esperada
                        // Aquí se asume que data.arrDataMovie es un array de Movie
                        setRecommendations(data.res);
                    } else {
                        console.error(data.error);
                        // Manejar el error adecuadamente en tu aplicación
                    }
                })
                .catch(error => console.error('Error fetching recommendations:', error));
        }
    }, [selectedMovies]); // Dependencia: selectedMovies

    return (
        <div>
            <h2>Movie Recommendations</h2>
            <p>
                {/* Pasa el texto a html */}
                <div dangerouslySetInnerHTML={{ __html: recommendations }} />
            </p>

        </div>
    );
};

export default MoviesRecommendationList;