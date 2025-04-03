import { useState } from 'react'
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Navigation from '../Navigation/Navigation';


const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailPage/MovieDetailPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReview/MovieReview'));

export default function App() {
  return (
    <div>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </Suspense>

    </div>
  );
}














