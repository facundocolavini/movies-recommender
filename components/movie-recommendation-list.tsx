'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useSelectedMoviesContext } from '@/app/context/movies-context';
import { Movie } from '@/app/lib/types';
import Image from 'next/image';

const MoviesRecommendationList = () => {
    const { selectedMovies } =  useSelectedMoviesContext();
    console.log(selectedMovies,'/recommedation')
    const [recommendations, setRecommendations] = useState<Movie[]>();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true; // Se establece a true cuando el componente se monta
    
        const fetchRecommendations = async () => {
            if (!isMounted) return; 
    
            setIsLoading(true);
            try {
                const ids = selectedMovies.map(movie => movie.id).join(',');
                const res = await fetch(`/api/recommendations?ids=${ids}`);
                const data = await res.json()
   
                if (!data.error) {
                    setRecommendations(data);
                } else {
                    console.error('Error fetching recommendations:', data.error);
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
    
        fetchRecommendations();
    
        return () => {
            isMounted = false;
        };
    
    }, [selectedMovies]);


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
        <>
            {recommendations?.map((movie) => (
                <div key={movie.id} style={{ marginBottom: '20px' }}>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={500} />
                    <p>Release Date: {movie.release_date?.toString()}</p>
                    <p>Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
                </div>
            ))}
        </>
            )}
    </div>
    );
};

export default MoviesRecommendationList;
