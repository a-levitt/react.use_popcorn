import {useEffect, useState} from "react";
import {KEY} from "../secured/APIKey.js";

function useMovies(query, callback) {
    const [movies, setMovies] = useState([])/*(tempMovieData)*/;
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(function ()  {
        callback?.();

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setErr("");
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    {signal: controller.signal});

                if (!res.ok) throw new Error(res.statusText);

                const data = await res.json();

                if (data.Response === "False") throw new Error("Movie not found");

                setMovies(data.Search);
                setErr("");
            } catch (error) {
                console.log(error.message);

                if (error.name !== "AbortError") {
                    setErr(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setErr("");
            return
        }

        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query]);

    return {movies, isLoading, err};
}

export { useMovies };
