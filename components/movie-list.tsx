'use client';
import { getMovieList } from '@/app/lib/tmdb';
import React from 'react';

import { useSelectedMoviesContext } from '@/app/context/movies-context';
import useInfiniteScroll from '@/app/hooks/use-infinity-scroll';
import { APIGetMovies, Movie } from '@/app/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import MovieCard from '../components/movie-card';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { TransitionLink } from './transition-links';
import { MoviesDrawer } from './movies-drawer';



const MoviesList = () => {
  const { selectedMovies, selectMovie } = useSelectedMoviesContext();
  console.log(selectedMovies, '/Home');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<APIGetMovies, Error>({
    queryKey: ['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getMovieList(pageParam as number);
      return result;
    },
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  const lastElementRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });


  return (
    <section >
      <MoviesDrawer/>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={page.results[pageIndex].id}>
            {(page.results as Movie[]).map((movie: Movie, movieIndex: number) => {
              return (
                <div ref={lastElementRef} key={movie.id}>
                  <MovieCard
                    movie={movie}
                  />
                </div>
              );
            })}
          </React.Fragment>
        ))}

      </div>
    </section>

  );
};

export default MoviesList;