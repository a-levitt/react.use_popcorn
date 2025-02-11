function StarRating({maxRating = 5}) {
    return (
        <div className="rating">
            <div>
                {Array.from({length: maxRating}, (_, i) => (
                    <span key={i}>⭐{i+1}</span>
                ))}
            </div>
            <p>
                rt
            </p>
        </div>
    )
}

export default StarRating;