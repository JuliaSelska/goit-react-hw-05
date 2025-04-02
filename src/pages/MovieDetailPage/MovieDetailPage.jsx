import { Suspense, useEffect, useState, useRef } from 'react';
import { NavLink, useParams, Outlet, useLocation } from 'react-router';
import { getMovieDetails } from '../../movieServise';
import styles from '../MovieDetailPage/MovieDetailPage.module.css';


export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const locations = useLocation();
    const backLinkHref = locations.state?.from || '/movies';

    useEffect(() => {
        async function getMovies() {
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
        getMovies();
    }, [movieId]);

    if (isLoading) return <b className={styles.loading}>Is loading, please wait...</b>;
    if (error) return <b className={styles.error}>Woops, there was a problem, please reload this page!</b>;
    if (!movie) return <p className={styles.error}>Movie details not available.</p>;

    return (
        <div className={styles.container}>
            <NavLink to={backLinkHref} className={styles.goBack}> ← Go back </NavLink>

            <div className={styles.movieWrapper} >
                <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.original_title} ({movie.release_date.slice(0, 4)})</h1>

                    <div >
                        <p className={styles.userScore}>User Score: {Math.round(movie.vote_average * 10)}%</p>
                    </div>

                    <div >
                        <h3>Overview:</h3>
                        <p>{movie.overview}</p>
                    </div>

                    <div >
                        <h3>Genres:</h3>
                        <p>{movie.genres.map((g) => g.name).join(" ")}</p>
                    </div>
                </div>
            </div>


            <div>
                <h3 className={styles.moreInfo}>More information</h3>
                <ul>
                    <li>
                        <NavLink to={`/movies/${movie.id}/cast`} state={locations} className={styles.links}>
                            Cast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/movies/${movie.id}/reviews`} state={locations} className={styles.links}>
                            Reviews
                        </NavLink>
                    </li>
                </ul>
            </div>

            <Suspense >
                <Outlet />
            </Suspense>
        </div>
    );
}