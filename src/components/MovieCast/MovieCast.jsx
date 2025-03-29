import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieCredits } from '..//../movieServise'


export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        async function getCast() {
            const data = await getMovieCredits(movieId);
            setCast(data);
        }

        getCast();
    }, [movieId]);

    return (
        <div>
            <h3>Cast</h3>
            {cast.length > 0 &&
                cast.map((cast) => (
                    <div key={movieId.id}>
                        <img src={avatar} alt={description} />
                        <h3>{firstName}</h3>
                        <p>Character: {character}</p>
                    </div>
                ))}

        </div>
    );
}