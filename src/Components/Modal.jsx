export default function Modal({gameState, setGameState, currScore, setCurrScore}) {
    function handleRestart() {
        setCurrScore(0)
        setGameState('playing')
    }
    
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="result-header">Round complete</div>
                {gameState === "win" ?
                    <div className="result">You remembered them all.</div> :
                    <div className="result">You scored {currScore} points.</div>
                }
                {gameState === "loss" ?
                    <p>The board got the better of you this time.</p> :
                    <p>A flawless run. Your memory is seriously sharp.</p>
                }
                <button className="restart-btn" onClick={handleRestart}>
                    Play Again <span>↗</span>
                </button>
            </div>
        </div>
    )
}