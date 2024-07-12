'use client'
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { StarIcon, CheckCircleIcon } from 'lucide-react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
  onSelect: (movieId: number) => void;
  isSelected: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, isSelected }) => {
  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // Previene el evento del checkbox cuando se hace clic en la tarjeta
    onSelect(movie.id);
  };

  return (
    <Card
      className={`group relative rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300 ease-in-out ${
        isSelected ? 'ring-4 ring-blue-500 shadow-2xl' : 'shadow-lg hover:shadow-2xl'
      }`}
      onClick={handleSelect}
    >
      <div className="relative h-80 overflow-hidden rounded-lg">
        {/* Capa negra con gradiente estilo Netflix */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-75"></div>
        <Image
          src={imageURL}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          priority
          className="transform group-hover:scale-105 transition-transform duration-300"
        />
        {isSelected && (
          <div className="absolute top-4 right-4 text-white">
            <CheckCircleIcon className="h-6 w-6" />
          </div>
        )}
        <label className="absolute bottom-4 left-4 flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only" // Oculta el checkbox pero sigue siendo accesible
            checked={isSelected}
            onChange={() => {}}
            onClick={handleSelect}
          />
          <div className={`p-2 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-white bg-opacity-50'} transition duration-200`}>
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