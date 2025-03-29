import axios from 'axios';


const API_KEY = '2971dd55bd77c37968063a649a6ff70b'; // Ваш справжній API-ключ
const BASE_URL = 'https://api.themoviedb.org/3';


// 1. Найпопулярніші фільми на сьогодні
export async function getTrendingMovies() {
    const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// 2. Пошук фільму за ключовим словом
export async function searchMovie(query) {
    const response = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// 3. Повна інформація про фільм
export async function getMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

// 4. Інформація про акторський склад
export async function getMovieCredits(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    return data.cast;
}

// 5. Огляди фільму
export async function getMovieReviews(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}