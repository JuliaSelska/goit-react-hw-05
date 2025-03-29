import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getTrendingMovies } from '../../movieServise'

export default function HomePage() {
    const [movies, setMovies] = useState([]); // Створюємо стан для збереження фільмів

    useEffect(() => {
        async function fetchMovies() {
            try {
                const movies = await getTrendingMovies();
                setMovies(movies);
            } catch (error) {
                console.error("Помилка при завантаженні фільмів:", error);
            }
        }

        fetchMovies();
    }, []);

    return (
        <div>
            <h1><strong>Wellcome to our website</strong></h1>
            <p><strong>Trending today</strong></p>
            <ul>{movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.movieTitle}</Link>
                </li>
            ))}</ul>
        </div>
    );
}