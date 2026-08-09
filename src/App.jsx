import Header from "./Components/Header.jsx"
import Hero from "./Components/Hero.jsx"
import GameArea from "./Components/GameArea.jsx"
import Footer from "./Components/Footer.jsx"
import Modal from "./Components/Modal.jsx"
import "./App.css"
import { useState } from "react"

export default function App() {
  const [gameState, setGameState] = useState("playing")
  const [difficulty, setDifficulty] = useState("easy")
  const [currScore, setCurrScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("bestscore")
    return saved ? JSON.parse(saved) : {easy:0, medium:0, hard:0}
  })

  return(
    <div className="game-page">
      <Header/> 
      <Hero 
        difficulty={difficulty} 
        currScore={currScore} 
        bestScore={bestScore}
      />
      <GameArea 
        difficulty={difficulty} setDifficulty={setDifficulty}
        currScore={currScore} setCurrScore={setCurrScore}
        bestScore={bestScore} setBestScore={setBestScore}
        setGameState={setGameState}
      />
      <Footer/>
      {gameState !== "playing" && 
        <Modal 
          gameState={gameState} setGameState={setGameState}
          currScore={currScore} 
          setCurrScore={setCurrScore}
        />
      }
    </div>
  )
}