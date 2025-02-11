import {useState} from "react";

/*function Box({children}) {*/
function Box({element}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {/*{isOpen && children}*/}
            {isOpen && element}
        </div>
    )
}

export default Box;