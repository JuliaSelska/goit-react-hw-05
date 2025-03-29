import { getMovieReviews } from '..//../movieServise';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


export default function MovieReviews() {

    const { movieId } = useParams();
    const [review, setReview] = useState([]);

    useEffect(() => {
        async function getReview() {
            const data = await getMovieReviews(movieId)
            setReview(data);
        }

        getReview();
    }, [movieId])

    return (
        <div >
            <h2 >Reviews</h2>
            <ul className={styles.list}>
                {review.map((review) => (
                    <li
                        key={review.id}
                        className={
                            review.completed ? styles.completed : styles.pending
                        }
                    >
                        {review.review}
                    </li>
                ))}
            </ul>
        </div>
    );
}