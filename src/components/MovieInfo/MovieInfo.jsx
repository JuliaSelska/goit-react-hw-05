import css from '../MovieInfo/MovieInfo.module.css';

export default function MovieInfo({ movie }) {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";  // Базовий URL для зображень
    return (
        <div>
            <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500"}
                alt={movie.title}
                className={css.movieImage}
            />
            <div>
                <h2>{movie.title}</h2>
                <p><strong>User score:</strong> {movie.vote_average * 10}%</p> {/* Відображення рейтингу */}
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h2>Genres</h2>
                <p>{movie.genres.map(genre => genre.name).join(', ')}</p> {/* Перетворення масиву жанрів у текст */}
            </div>
        </div>
    );
}