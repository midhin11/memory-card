import { useState, useEffect } from "react";

let accents = ["#F5B84B", "#F2876D", "#72C5B6", "#8795E8", "#D79ACB", "#E5A85B", "#77B9D7", "#B6C86A"]
let cardCounts = {easy: 8, medium: 12, hard:16}

export default function GameArea({difficulty, setDifficulty, currScore, setCurrScore, bestScore, setBestScore, setGameState}) {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [cards, setCards] = useState([])
    const [gameCards, setGameCards] = useState([])
    const [clicked, setClicked] = useState([])

    function handleDifficultyChange(newDifficulty) {
        setDifficulty(newDifficulty)
        
        const count = cardCounts[newDifficulty]
        setGameCards(cards.slice(0, count))

        setClicked([])
        setCurrScore(0)
    }

    function handleCardClick(id) {
        setGameCards(shuffle(gameCards))
        if (clicked.includes(id)){
            setClicked([])
            setGameState("loss")
            return
        } 
  
        setClicked([...clicked, id])
        setCurrScore(currScore + 1)
        
        const nextScore = currScore + 1
        if (nextScore >= bestScore[difficulty]){
            setBestScore({
                ...bestScore,
                [difficulty]: nextScore
            })
        }  

        const nextClicked = [...clicked, id]
        if (nextClicked.length === cardCounts[difficulty]){
            setGameState("win")
            setClicked([])
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16")
                const returnedData = await response.json()
                const fetchedCards = await Promise.all(returnedData.results.map(
                    async (pokemon, index) => {
                        const detailsResponse = await fetch(pokemon.url)
                        const details = await detailsResponse.json()
                        return {
                            id: details.id,
                            name: details.name,
                            image: details.sprites.other["official-artwork"].front_default,
                            accent: accents[index % accents.length]
                        }
                    }
                ))
                setCards(fetchedCards);
                setGameCards(fetchedCards.slice(0, cardCounts[difficulty]))
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
     
    return(
        <section className="game-area">
            <GameTools difficulty={difficulty} handleDifficultyChange={handleDifficultyChange}/>
            <CardGrid 
                difficulty={difficulty} 
                cards={cards} 
                gameCards={gameCards} setGameCards={setGameCards} handleCardClick={handleCardClick} 
                isLoading={isLoading} error={error}/>
        </section>
    )
}


function GameTools({difficulty, handleDifficultyChange}) {
    return (
        <div className="game-tools">
            <div className="difficulty-mode">
                <button 
                className={`easy-mode ${difficulty === "easy" ? "selected" : ""}`}  
                onClick={() => handleDifficultyChange("easy")}>
                    Easy<span>8</span>
                </button> 

                <button 
                className={`medium-mode ${difficulty === "medium" ? "selected" : ""}`}  
                onClick={() => handleDifficultyChange("medium")}>
                    Medium<span>12</span>
                </button> 
                
                <button 
                className={`hard-mode ${difficulty === "hard" ? "selected" : ""}`}  
                onClick={() => handleDifficultyChange("hard")}>
                    Hard<span>16</span>
                </button> 
            </div>
            <div className="hint">Pick a card. Remember it. Don't repeat it.</div>
        </div>
    )
}

function CardGrid({ difficulty, gameCards, handleCardClick, isLoading, error }) {
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