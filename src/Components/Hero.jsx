export default function Hero({difficulty, currScore, bestScore}) {
  let best = bestScore.easy;
  if (difficulty === "medium") {best = bestScore.medium}
  if (difficulty === "hard") {best = bestScore.hard}

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
          <strong>{currScore}</strong>
        </div>
        <div className="score-seperator"></div>
        <div className='score-item'>
          <div>Best Score</div>
          <strong>{best}</strong>
        </div>
      </div>
    </section>
  )
}