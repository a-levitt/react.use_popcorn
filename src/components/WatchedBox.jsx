import {useState} from "react";
import {tempWatchedData} from "../MoviesData.js";
import WatchedSummary from "./WatchedSummary.jsx";
import WatchedList from "./WatchedList.jsx";

function WatchedBox() {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummary watched={watched} />
                    <WatchedList watched={watched} />
                </>
            )}
        </div>
    )
}

export default WatchedBox;