import { useState } from "react";

export default function GameArea() {
    const [difficulty, setDifficulty] = useState("easy")

    return(
        <section className="game-area">
        <div className="game-tools">
            <div className="difficulty-mode">
            <button className="selected">Easy</button>
            <button>Medium</button>
            <button>Hard</button>
            </div>
            <div className="hint">Pick a card. Remember it. Don't repeat it.</div>
        </div>

        <CardGrid/>
        </section>
    )
}

function CardGrid() {
    return (
        <div className="card-grid">
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
            <button className="memory-card">
            <img src="./src/assets/dummy.png" alt="dummy" />
            </button>
      </div>
    )
}