'use client'
import MoviesRecommendationList from '@/components/movie-recommendation-list'
import React from 'react'
import { SelectedMoviesProvider } from '../context/movies-context'

const RecommendationPage = () => {
  return (
    <div>  
      <MoviesRecommendationList/>
    </div>
  )
}

export default RecommendationPage