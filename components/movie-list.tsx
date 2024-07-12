'use client';
import React, { useState, useRef, useEffect } from 'react';
import { getMovieList } from '@/app/lib/tmdb';

import { APIGetMovies, Result } from '@/app/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieCard from  '../components/movie-card'


const MoviesList = () => {
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<APIGetMovies, Error>({
    queryKey: ['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getMovieList(pageParam);
      return result;
    },
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (movieId: number) => {
    setSelectedMovies((prevSelectedMovies) => {
      if (prevSelectedMovies.includes(movieId)) {
        return prevSelectedMovies.filter((id) => id !== movieId);
      } else if (prevSelectedMovies.length < 5) {
        return [...prevSelectedMovies, movieId];
      }
      return prevSelectedMovies;
    });
  };

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
          {(page.results as Result[]).map((movie: Result, movieIndex: number) => {
            if (data.pages.length === pageIndex + 1 && page.results.length === movieIndex + 1) {
              return (
                <div ref={lastMovieElementRef} key={movie.id}>
                  <MovieCard
                    movie={movie}
                    onSelect={() => handleSelect(movie.id)}
                    isSelected={selectedMovies.includes(movie.id)}
                  />
                </div>
              );
            } else {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={() => handleSelect(movie.id)}
                  isSelected={selectedMovies.includes(movie.id)}
                />
              );
            }
          })}
        </React.Fragment>
      ))}
      <button
        onClick={loadMoreMovies}
        disabled={!hasNextPage || isFetchingNextPage}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 ${
          !hasNextPage || isFetchingNextPage ? 'cursor-not-allowed' : ''
        }`}
      >
        {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
      </button>
    </div>
  );
};

export default MoviesList;
