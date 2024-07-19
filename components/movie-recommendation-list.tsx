'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useSelectedMoviesContext } from '@/app/context/movies-context';
import { Movie } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold my-4">Movie Recommendations</h2>
        {isLoading ? (
            <p>Loading recommendations...</p>
        ) : recommendations?.length === 0 ? (
            <p>No recommendations found</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendations?.map((movie) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`} >
                        <div className="cursor-pointer border rounded-lg overflow-hidden shadow-lg">
                            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={750} layout="responsive" className="object-cover"/>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{movie.title}</h3>
                                <p className="text-sm text-gray-500"> {movie.release_date?.toString()}</p>
                                <p className="text-sm">{movie.overview}</p>
                                <p className="text-sm font-medium">Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
    );
};

export default MoviesRecommendationList;
