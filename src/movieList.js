import axios from 'axios';


const API_KEY = '2971dd55bd77c37968063a649a6ff70b';
const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTcxZGQ1NWJkNzdjMzc5NjgwNjNhNjQ5YTZmZjcwYiIsIm5iZiI6MTc0MzI1MDY1MS42NDgsInN1YiI6IjY3ZTdlNGRiODcxNDVkZTMyZDYzODE4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B724VnRIC5OFrDvDrn9_I4rbNfIFm4H1AhoQcbYc8Ug'

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
});

// 1. Найпопулярніші фільми на сьогодні
export const getTrendingMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params: {
                page,
                include_adult: false,
                language: "en-US",
            },
            ...getHeaders(),
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

// 2. Пошук фільму за ключовим словом
export const searchMovie = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            ...getHeaders(),
            params: { query },
        });

        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

// 3. Повна інформація про фільм
export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/movie/${movieId}`,
            getHeaders()
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

// 4. Інформація про акторський склад
export const getMovieCredits = async (movieId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/movie/${movieId}/credits`,
            getHeaders()
        );

        return response.data.cast;
    } catch (error) {
        console.error("Error fetching movie cast:", error);
        throw error;
    }
};

// 5. Огляди фільму
export const getMovieReviews = async (movieId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/movie/${movieId}/reviews`,
            getHeaders()
        );

        return response.data.results;
    } catch (error) {
        console.error("Error fetching movie reviews:", error);
        throw error;
    }
};