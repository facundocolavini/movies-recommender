'use client'
import React, { useState } from 'react';


const SearchForm: React.FC = () => {
  const [movieId, setMovieId] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Realiza una solicitud a la API de recomendaciones
      const response = await fetch(`/api/recommendations?movieId=${movieId}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const recommendationText = await response.text();
      setRecommendations(recommendationText.split('\n'));
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieId}
          className='text-black'
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Ingresa el ID de una película"
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForm;