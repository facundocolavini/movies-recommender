'use client'
import React, { useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { StarIcon, CheckCircleIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useSelectedMoviesContext } from '@/app/context/movies-context';
import { Movie } from '@/app/lib/types';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
/*   onSelect: (movieId: number) => void;
  isSelected: boolean; */
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { selectedMovies, selectMovie } = useSelectedMoviesContext();
  const isSelected =   useMemo(() => selectedMovies.some((m: Movie) => m.id === movie.id), [selectedMovies, movie.id]);
  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    selectMovie(movie as Movie);
  };

  return (
    <Card
      className={`group w-full relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
        isSelected ? 'ring-4 ring-blue-500 shadow-xl' : 'shadow-md hover:shadow-xl'
      }`}
      onClick={handleSelect}
    >
      <div className="relative  h-80 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-75"></div>
        <img
          src={imageURL}
          alt={movie.title}
          className="transform group-hover:scale-110 transition-transform duration-500 object-cover"
        />
        {isSelected && (
          <div className="absolute top-4 right-4 text-white">
            <CheckCircleIcon className="h-6 w-6 animate-pulse" />
          </div>
        )}
        <label className="absolute bottom-4 left-4 flex items-center cursor-pointer">
          <Input
            type="checkbox"
            className="sr-only"
            checked={isSelected}
            onChange={() => {}}
            onClick={handleSelect}
          />
          <div className={`p-2 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-white bg-opacity-50'} transition duration-300`}>
            <CheckCircleIcon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
          </div>
          <span className="ml-2 text-sm text-white">Seleccionar</span>
        </label>
        <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <CardTitle className="text-xl font-semibold text-white">{movie.title}</CardTitle>
          <div className="flex items-center mt-2">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-yellow-400">{movie.vote_average.toFixed(1)}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;