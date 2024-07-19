'use client';
import { getMovieList } from '@/app/lib/tmdb';
import React, { useEffect, useRef } from 'react';

import { useSelectedMoviesContext } from '@/app/context/movies-context';
import { APIGetMovies, Movie } from '@/app/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieCard from '../components/movie-card';


const MoviesList = () => {
  const { selectedMovies, selectMovie } = useSelectedMoviesContext();
  console.log(selectedMovies)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<APIGetMovies, Error>({
    queryKey: ['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getMovieList(pageParam as number);
      return result;
    },
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

  const loadMoreMovies = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const loadMoreObserver = () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (lastMovieElementRef.current) {
        observer.current.observe(lastMovieElementRef.current);
      }
    };

    loadMoreObserver();
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data, fetchNextPage, hasNextPage, lastMovieElementRef]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {(page.results as Movie[]).map((movie: Movie, movieIndex: number) => {
              return (
                <div ref={lastMovieElementRef} key={movie.id}>
                  <MovieCard
                    movie={movie}
                    onSelect={() => selectMovie(movie)}
                    isSelected={selectedMovies.some((m: Movie) => m.id === movie.id)}
                  />
                </div>
              );
          })}
        </React.Fragment>
      ))}
      <button
        onClick={loadMoreMovies}
        disabled={!hasNextPage || isFetchingNextPage}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 ${!hasNextPage || isFetchingNextPage ? 'cursor-not-allowed' : ''
          }`}
      >
        {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
      </button>
    </div>
  );
};

export default MoviesList;
