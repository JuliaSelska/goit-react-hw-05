import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getTrendingMovies } from '../../movieServise'

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const movies = await getTrendingMovies();
                setMovies(movies);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, []);

    return (
        <div>
            <h1><strong>Wellcome to our website</strong></h1>
            <p><strong>Trending today</strong></p>
            {isLoading && <b>Loading new trends...</b>}
            {error && <b>Whooops there was an error, please reload this page!</b>}
            <ul>{movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}</ul>
        </div>
    );
}