'use client'
import { useSelectedMoviesContext } from '@/app/context/movies-context';
import { Movie } from '@/app/lib/types';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import CardRecommended from './card-recommended';
import Spinner from './spinner/spinner';
import { TransitionLink } from './transition-links';
import { Button } from './ui/button';

const MoviesRecommendationList = () => {
    const { selectedMovies } = useSelectedMoviesContext();
    console.log(selectedMovies, '/recommedation')
    const [recommendations, setRecommendations] = useState<Movie[]>();

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let isMounted = true; // Se establece a true cuando el componente se monta

        const fetchRecommendations = async () => {
        

            setIsLoading(true);
            try {
                const ids = selectedMovies.map(movie => movie.id).join(',');
                const res = await fetch(`/api/recommendations?ids=${ids}`);
                const data = await res.json()
                console.log(data)
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

    }, [selectedMovies]);


    return (
        <div className="container mx-auto px-4">

            {isLoading ? (
                <div className="h-screen flex justify-center items-center">
                    <Spinner />
                </div>
            ) : recommendations?.length === 0 ? (
                <p className="text-white">No recommendations found</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold my-4 text-white">Movie Recommendations</h2>
                    <TransitionLink href="/movies" >
                        <Button variant={'secondary'}>
                            <ChevronLeft size={24} className='mr-2' />
                            Volver
                        </Button>
                    </TransitionLink>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-20">
                        {recommendations?.map((movie) => (
                            movie.poster_path && movie.title && movie.release_date && movie.overview && movie.vote_average && movie.vote_count ?
                                (
                                    <CardRecommended key={movie.id} movie={movie} />
                                ) : null
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MoviesRecommendationList;