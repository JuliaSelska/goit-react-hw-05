import { useState } from 'react'
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Navigation from '../Navigation/Navigation';
// import HomePage from '../../pages/HomePage/HomePage';
// import MovieSearch from '../../pages/MovieSearch/MovieSearch';
// import MovieDetailsPage from '../../pages/MovieDetailPage/MovieDetailPage';
// import MovieReviews from '../MovieReview/MovieReview';
// import MovieCast from '../MovieCast/MovieCast';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailPage/MovieDetailPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReview/MovieReview'));

export default function App() {
  return (
    <div>
      <AppHeader />
      {/* <Navigation /> */}
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














