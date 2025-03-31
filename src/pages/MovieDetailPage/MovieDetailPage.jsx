import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router';
import { getMovieDetails } from '../../movieServise';
import MovieInfo from '../../components/MovieInfo/MovieInfo';



export default function MovieDetailPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);  // Використовуємо null, бо це об'єкт
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMovie() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieDetails(movieId); // Виправлено movieId замість userId
                setMovie(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getMovie();
    }, [movieId]);

    return (
        <div>
            {isLoading && <b>Loading...</b>}
            {error && <b>Error loading movie details</b>}
            {movie && <MovieInfo movie={movie} />}  {/* Виправлено movie замість movies */}

            <ul>
                <li>
                    <NavLink to="cast">Cast</NavLink>
                </li>
                <li>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}