'use client'
import React, { useEffect, useState } from 'react';
import { useSelectedMoviesContext } from '@/app/context/movies-context';
import { Movie } from '@/app/lib/types';
import Image from 'next/image';

const MoviesRecommendationList = () => {
    const { selectedMovies } = useSelectedMoviesContext();
    const [recommendations, setRecommendations] = useState<Movie[]>();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true; // Se establece a true cuando el componente se monta
    
        const fetchRecommendations = async () => {
            if (!isMounted) return; // Salir temprano si el componente ya no está montado
    
            setIsLoading(true);
            try {
                const ids = selectedMovies.map(movie => movie.id).join(',');
                const res = await fetch(`/api/recommendations?ids=${ids}`);
                const data = await res.json();
                console.log(data);
                if (!data.error) {
                    // Asegúrate de que este es el camino correcto a tus datos
                    setRecommendations(data); // Cambiado de data.res a data
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
    
        fetchRecommendations();
    
        // Función de limpieza para manejar el desmontaje del componente
        return () => {
            isMounted = false;
        };
    
    }, [selectedMovies]); // Removido recommendations de las dependencias
   /*  useEffect(() => {
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
    }, [isMounted, selectedMovies]); */

    // No renderizar el componente de recomendaciones hasta que se haya montado



        console.log(recommendations,'recomendaciones')
    return (
        <div>
        <h2>Movie Recommendations</h2> 
        { 
            isLoading ? (
                <p>Loading recommendations...</p>
            ) : (
                recommendations?.length === 0 ? (
                    <p>No recommendations found</p>
                ) :
        <div>
            {recommendations?.map((movie) => (
                <div key={movie.id} style={{ marginBottom: '20px' }}>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={500} />
                    <p>Release Date: {movie.release_date?.toString()}</p>
                    <p>Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
                </div>
            ))}
        </div>
            )}
    </div>
    );
};

export default MoviesRecommendationList;
