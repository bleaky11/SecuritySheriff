import { Link } from "react-router-dom";

type difficulty = "easy" | "medium" | "hard";

interface input {
    difficulty: difficulty;
    setDifficulty: (diff: difficulty)=>void;
    setOverlay: ()=>void;
}

export default function difficultyOverlay({difficulty, setDifficulty, setOverlay}: input) {

    return (
        <div className="overlay">
            <div className="x" onClick={setOverlay}>x</div>
            <h3>Select your difficulty</h3>
            <div className="choosing">
                <div className={difficulty==="easy"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("easy")}>Easy</div>
                <div className={difficulty==="medium"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("medium")}>Medium</div>
                <div className={difficulty==="hard"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("hard")}>Hard</div>
            </div>
            <div className="buttonlayout">
                <Link to={"/game"} className="button" >Start</Link>
            </div>
        </div>
    )
}