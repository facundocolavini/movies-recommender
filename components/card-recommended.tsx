import { Movie } from '@/app/lib/types'
import Image from 'next/image'

interface CardRecommendedProps {
  movie: Movie
}

const CardRecommended = ({ movie }: CardRecommendedProps) => {
  return (
    <div key={movie.id} className="cursor-pointer border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gray-800 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={750}  className="object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
        <p className="text-sm text-gray-400">{movie.release_date?.toString()}</p>
        <p className="text-sm text-gray-300">{movie.overview}</p>
        <p className="text-sm font-medium text-white">Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
      </div>
    </div>
  )
}

export default CardRecommended