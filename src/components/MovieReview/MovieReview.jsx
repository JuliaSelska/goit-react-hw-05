import { getMovieReviews } from '..//../movieServise';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


export default function MovieReviews() {
    const { movieId } = useParams();

    const [feedbacks, setfeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getFeedbacks() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieReviews(movieId);
                setfeedbacks(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getFeedbacks();
    }, [movieId]);

    return (
        <>
            {isLoading && <b>Loading...</b>}
            {error && <b>Whoops there was a problem, please reloade this page!</b>}
            <div >
                {feedbacks.length ? (
                    feedbacks.map((review) => (
                        <div key={review.id}>
                            <h3 >{review.author}</h3>
                            <p >{review.content}</p>
                        </div>
                    ))
                ) : (
                    <p>There are no avaialble reviews at the moment.</p>
                )}
            </div>
        </>
    );
}