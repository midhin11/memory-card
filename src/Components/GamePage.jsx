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

function Footer() {
  
}

function GameArea() {

}

function Header() {
  return (
    <header>
      <div className='brand'>
        <span className='brand-logo'>✦</span>
        memory<span className='brand-dot'>.</span>match
        </div>
      <div className='label'><span className='status'></span>New round ready</div>
    </header>
  )
}

function Hero() {
  return(
    <section className="hero">
      <div className='hero-text'>
        <p className='recall'>a little game of recall</p>
        <h1>Keep your<br/><span>head in the game.</span></h1>
        <p className='intro'>Choose a card, watch the board shift, and see how far your memory can take you.</p>
      </div>
      <div className='score-card'>
        <div className='score-item'>
          <div>Current Score</div>
          <strong>00</strong>
        </div>
        <div className="score-seperator"></div>
        <div className='score-item'>
          <div>Best Score</div>
          <strong>00</strong>
        </div>
      </div>
    </section>
  )
}