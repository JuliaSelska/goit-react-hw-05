import css from '../MovieInfo/MovieInfo.module.css';

export default function MovieInfo({ movie }) {
    return (
        <div>
            <img src={movie.image}
                alt={movie.movieTitle}
                className={css.movieImage} />
            <div>
                <h2>{movie.movieTitle}</h2>
                <p>User score: </p>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h2>Genres</h2>
                <p>{movie.genres}</p>
            </div>
        </div>

    );
}