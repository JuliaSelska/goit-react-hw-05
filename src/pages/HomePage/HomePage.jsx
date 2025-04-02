import { useState, useEffect } from "react";
import { getTrendingMovies } from '../../movieList'
import MovieList from "../../components/MovieList/MovieList";
import styles from '../HomePage/HomePage.module.css'

export default function HomePage() {
    const [movies, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getTrendingMovies();
                setMovie(data.results);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}><strong>Wellcome to our website</strong></h1>
            <p className={styles.subtitle}><strong>Trending today</strong></p>
            {isLoading && <b className={styles.loading}>Loading new trends...</b>}
            {error && <b className={styles.error}>Whooops there was an error, please reload this page!</b>}
            <MovieList movies={movies} />
        </div>
    );
}