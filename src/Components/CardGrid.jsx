export default function CardGrid({ difficulty, gameCards, handleCardClick, isLoading, error }) {
    let cardClass = "cards-easy"
    if (difficulty === "medium") {cardClass = "cards-medium"}
    if (difficulty === "hard") {cardClass = "cards-hard"}

    let cardstoDisplay  = gameCards.map((card) => (
        <button key={card.id} 
        className="memory-card" 
        onClick={() => handleCardClick(card.id)}>
            <div className="card-art" style={{backgroundColor: card.accent}}>
                <img src={card.image} alt={card.name} />
            </div>
            <div className="card-caption">
                <span>{card.name}</span>
                <span className="arrow">↗</span>
            </div>
        </button>
    ))

    if(isLoading) {
        return <div className="loading">Loading cards...</div>
    }

    if (error) {
        return <div className="error">Failed to load cards.</div>;
    }

    return (
        <div className={`card-grid ${cardClass}`}>
            {cardstoDisplay}
        </div>
    )
}

function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}