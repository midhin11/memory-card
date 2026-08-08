import Header from "./Components/Header.jsx"
import Hero from "./Components/Hero.jsx"
import GameArea from "./Components/GameArea.jsx"
import Footer from "./Components/Footer.jsx"
import "./App.css"
import { useState } from "react"

export default function GamePage() {
  const [currScore, setCurrScore] = useState(0)

  return(
    <div className="game-page">
      <Header/>
      <Hero currScore={currScore}/>
      <GameArea currScore={currScore} setCurrScore={setCurrScore}/>
      <Footer/>
    </div>
  )
}