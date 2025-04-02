import { Link, useLocation } from "react-router";
import styles from '../MovieList/MovieList.module.css';

export default function MovieList({ movies = [] }) {
    const locations = useLocation();

    if (!movies || movies.length === 0) {
        return <p>No movies available</p>;
    }

    return (
        <div>
            <ul className={styles.movieList}>
                {movies.map((movie) => (
                    <li key={movie.id} className={styles.movieItem}>
                        <Link to={`/movies/${movie.id}`} state={{ from: locations }} >
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
