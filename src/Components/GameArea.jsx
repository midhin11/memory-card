import { useState, useEffect } from "react";

let accents = ["#F5B84B", "#F2876D", "#72C5B6", "#8795E8", "#D79ACB", "#E5A85B", "#77B9D7", "#B6C86A"]

export default function GameArea() {
    const [difficulty, setDifficulty] = useState("easy")
    const [cards, setCards] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16")
            const returnedData = await response.json()
            const fetchedCards = await Promise.all(returnedData.results.map(
                async (pokemon, index) => {
                    const detailsResponse = await fetch(pokemon.url)
                    const details = await detailsResponse.json()
                    console.log(details)
                    console.log(details.sprites.other["official-artwork"].front_default);
                    return {
                        id: details.id,
                        name: details.name,
                        image: details.sprites.other["official-artwork"].front_default,
                        accent: accents[index % accents.length]
                    }
                }
            ))
            setCards(fetchedCards);
        }
        fetchData()
    }, [])

    return(
        <section className="game-area">
            <GameTools difficulty={difficulty} setDifficulty={setDifficulty}/>
            <CardGrid difficulty={difficulty} cards={cards}/>
        </section>
    )
}

function GameTools({difficulty, setDifficulty}) {
    return (
        <div className="game-tools">
            <div className="difficulty-mode">
                <button 
                className={`easy-mode ${difficulty === "easy" ? "selected" : ""}`}  
                onClick={() => setDifficulty("easy")}>
                    Easy
                </button> 

                <button 
                className={`medium-mode ${difficulty === "medium" ? "selected" : ""}`}  
                onClick={() => setDifficulty("medium")}>
                    Medium
                </button> 
                
                <button 
                className={`hard-mode ${difficulty === "hard" ? "selected" : ""}`}  
                onClick={() => setDifficulty("hard")}>
                    Hard
                </button> 
            </div>
            <div className="hint">Pick a card. Remember it. Don't repeat it.</div>
        </div>
    )
}

function CardGrid({ difficulty, cards }) {
    let cardClass = "cards-easy"
    if (difficulty === "medium") {cardClass = "cards-medium"}
    if (difficulty === "hard") {cardClass = "cards-hard"}

    let cardCounts = {
        easy: 8,
        medium: 12,
        hard: 16
    }
    let count = cardCounts[difficulty];
    let cardsSliced = cards.slice(0, count)

    let cardstoDisplay  = cardsSliced.map((card) => (
        <button key={card.id} className="memory-card">
            <div className="card-art" style={{backgroundColor: card.accent}}>
                <img src={card.image} alt={card.name} />
            </div>
            <div className="card-caption">
                {card.name}<span>↗</span>
            </div>
        </button>
    ))

    return (
        <div className={`card-grid ${cardClass}`}>
            {cardstoDisplay}
        </div>
    )
}