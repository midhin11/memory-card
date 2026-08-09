import { useState, useEffect } from "react";
import GameTools from "./GameTools.jsx";
import CardGrid from "./CardGrid.jsx";

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
        localStorage.setItem("bestscore", JSON.stringify(bestScore));
    }, [bestScore])

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
                gameCards={gameCards} setGameCards={setGameCards} 
                handleCardClick={handleCardClick} 
                isLoading={isLoading} error={error}/>
        </section>
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