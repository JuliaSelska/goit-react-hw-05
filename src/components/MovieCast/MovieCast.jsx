import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieCredits } from '../../movieList';
import styles from '../MovieCast/MovieCast.module.css';


export default function MovieCast() {
    const { movieId } = useParams();

    const [casts, setCasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getCast() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieCredits(movieId);
                setCasts(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getCast();
    }, [movieId]);

    return (
        <div className={styles.containerCast} >
            {isLoading && <b>Loading...</b>}
            {error && <b>Wooops there was a problem, please reload this page!</b>}
            <ul className={styles.listCast} >
                {casts.map((cast) => (
                    <li key={cast.id} className={styles.itemCast}>
                        <img
                            className={styles.imgCast}
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                            alt={cast.name}

                        />
                        <p className={styles.textCast}>
                            {cast.name}
                        </p>
                        <p className={styles.textCast}>
                            Character: {cast.character}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}