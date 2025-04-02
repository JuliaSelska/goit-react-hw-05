import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMoviesList } from '../../movieList'; // Функція для отримання списку фільмів
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const location = useLocation();

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMoviesList(); // Отримання списку фільмів
                setMovies(data.results);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

    if (isLoading) return <b className={styles.loading}>Loading movies...</b>;
    if (error) return <b className={styles.error}>Error loading movies. Try again!</b>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Movies</h1>
            <ul className={styles.list}>
                {movies.map(movie => (
                    <li key={movie.id} className={styles.item}>
                        <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
