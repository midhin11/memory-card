import Header from "./Components/Header.jsx"
import Hero from "./Components/Hero.jsx"
import GameArea from "./Components/GameArea.jsx"
import Footer from "./Components/Footer.jsx"
import "./App.css"

export default function GamePage() {
  return(
    <div className="game-page">
      <Header/>
      <Hero/>
      <GameArea/>
      <Footer/>
    </div>
  )
}



