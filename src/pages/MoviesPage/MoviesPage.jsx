import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router';
import { searchMovie } from '../../movieList';
import MovieList from '../../components/MovieList/MovieList';
import styles from '../../pages/MoviesPage/MoviesPage.module.css'

export default function MovieSearch() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    const [debounceQuery] = useDebounce(query, 300);

    const changeSearchMovie = (event) => {
        const nextParams = new URLSearchParams(searchParams);
        if (event.target.value !== '') {
            nextParams.set('query', event.target.value.trim());
        } else {
            nextParams.delete('query');
        }
        setSearchParams(nextParams);
    };


    useEffect(() => {
        if (!debounceQuery) return;
        async function getMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await searchMovie(debounceQuery);
                setMovies(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getMovies();
    }, [debounceQuery]);

    return (
        <>
            <input type="text" value={query} onChange={changeSearchMovie} className={styles.searchInput} />
            {isLoading && <b>Loading movies...</b>}
            {error && <b>Whooops there was an error, please reload this page!</b>}
            {movies.length > 0 ? <MovieList movies={movies} /> : <p><strong>No movies found yet</strong></p>}
        </>
    );
}
