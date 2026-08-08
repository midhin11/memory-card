export default function GameTools({difficulty, handleDifficultyChange}) {
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