'use client'
import React, { useEffect, useState } from 'react';
import { useSelectedMoviesContext } from '@/app/context/movies-context';

const MoviesRecommendationList = () => {
    const { selectedMovies } = useSelectedMoviesContext();
    const [recommendations, setRecommendations] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && selectedMovies.length > 0) {
            setIsLoading(true);
            const ids = selectedMovies.map(movie => movie.id).join(',');
            fetch(`/api/recommendations?ids=${ids}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.error) {
                        setRecommendations(data.res);
                    } else {
                        console.error(data.error);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching recommendations:', error);
                    setIsLoading(false);
                });
        }
    }, [isMounted, selectedMovies]);

    // No renderizar el componente de recomendaciones hasta que se haya montado
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <h2>Movie Recommendations</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: recommendations }} />
            )}
        </div>
    );
};

export default MoviesRecommendationList;
