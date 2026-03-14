import axios from "axios"
import type Movie from '../types/movie'
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse{
    results: Movie[];
}

export default async function fetchMovie(query: string): Promise<Movie[]> {
    const {data} = await axios.get<MoviesHttpResponse>(`https://api.themoviedb.org/3/search/movie`,
        {
            params: {
                query: query,
            },
            headers: {
                Authorization: `Bearer ${myKey}`,
            }
        }
    )
    return data.results;
}