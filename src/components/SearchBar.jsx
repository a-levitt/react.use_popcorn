import {useEffect, useRef} from "react";

function SearchBar({query, setQuery}) {
    const inputEl = useRef(null);

    useEffect(() => {
        function callback(event) {
            if(document.activeElement === inputEl.current) return;

            if(event.code === "Enter") {
                inputEl.current.focus();
                setQuery("");
            }
        }

        document.addEventListener("keydown", callback);
        return () => document.addEventListener("keydown", callback);
    }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default SearchBar;
