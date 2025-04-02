import { Suspense, useEffect, useState, useRef } from 'react';
import { NavLink, useParams, Outlet, useLocation } from 'react-router';
import { getMovieDetails } from '../../movieList';
import styles from '../MovieDetailPage/MovieDetailPage.module.css';


export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const location = useLocation();
    const backLinkHref = location.state?.from || '/movies';

    useEffect(() => {
        async function fetchMovie() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovie();
    }, [movieId]);

    if (isLoading) return <b className={styles.loading}>Loading movie details...</b>;
    if (error) return <b className={styles.error}>Error loading movie details. Try again!</b>;
    if (!movie) return <p className={styles.error}>Movie details not available.</p>;

    return (
        <div className={styles.container}>
            <NavLink to={backLinkHref} className={styles.goBack}>← Go back</NavLink>

            <div className={styles.movieWrapper}>
                <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.original_title} ({movie.release_date.slice(0, 4)})</h1>
                    <p className={styles.userScore}>User Score: {Math.round(movie.vote_average * 10)}%</p>
                    <h3>Overview:</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres:</h3>
                    <p>{movie.genres.map((g) => g.name).join(", ")}</p>
                </div>
            </div>

            <div>
                <h3 className={styles.moreInfo}>More information</h3>
                <ul>
                    <li>
                        <NavLink to="cast" className={styles.links}>Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to="reviews" className={styles.links}>Reviews</NavLink>
                    </li>
                </ul>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
}