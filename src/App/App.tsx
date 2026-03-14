import { useState } from 'react'
import css from './App.module.css'
import SearchBar  from '../SearchBar/SearchBar'
import fetchMovie from '../services/movieService'
import { Toaster, toast } from 'react-hot-toast'
import type Movie from '../types/movie'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [selectedMovie, setSelectedMovie] = useState<Movie| null>(null);

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };
    const closeModal = () => {
        setSelectedMovie(null);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsError(false);

        const query = formData.get("query") as string;
        
        if (!query.trim()) {
            toast.error("Please enter your search query.");
            return;
        }

        try {
            setIsLoading(true);
            const data = await fetchMovie(query.trim());
            setMovies(data);
            
            if (data.length === 0) {
                toast.error("No movies found for your request.");
            }
        } catch (error) {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={css.app}>
            <Toaster />
            <SearchBar onSubmit={handleSubmit} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage/>}
            {movies.length !== 0 && <MovieGrid movies={movies} onSelect={openModal}/>}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
        </div>
    )
}
