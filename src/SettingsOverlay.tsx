import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


type Difficulty = "Easy" | "Medium" | "Hard" | "Very Hard" | "Extreme";
type GameMode = "Script" | "Email";
type Language = "SQL" | "Python" | "Java" | "C" | "C++" | "Typescript";


export interface GameSettings {
    gameMode : GameMode,
    difficulty : Difficulty,
    language? : Language
}

interface input {
    setOverlay: ()=>void;
}

export default function SettingsOverlay({setOverlay}: input) {

    const [chosenGameMode, setGameMode] = useState<GameMode | undefined>(undefined);
    const [chosenLanguage, setLanguage] = useState<Language | undefined>(undefined);
    const [difficultyType, setDifficulty] = useState<Difficulty | undefined>(undefined);
    
    const nav = useNavigate();

    const loadGameSettings = () => {
        if (chosenGameMode !== undefined && difficultyType !== undefined) {
            const gameSettings : GameSettings = {
                gameMode : chosenGameMode,
                difficulty : difficultyType,
                language : chosenLanguage
            }

            // pass game settings when navigating to game page
            nav("/game", {state : gameSettings})
        }   
    }

    return (
        <div className="overlay">
            <div className="x" onClick={setOverlay}>x</div>

            <div> 
                <h2>Select Bounty</h2>

                <div className = "choosing"> 
                    <div className = {chosenGameMode==="Script"? "chosen" :"poster"}  onClick={()=>{setGameMode("Script")}}
                    >  
                        <h3> Buggy Script  </h3>
                        <h4> There has been talk of beings going around trying to brainwash the townsfolk with alien scripts. Find them and bring them to justice </h4>
                        <b><span> (Test your debugging skills by seeing if a script has any bugs) </span></b>
                    </div>

                    <div className = {chosenGameMode==="Email"? "chosen" :"poster"} onClick={()=>{setGameMode("Email")}}
                        >  
                        <h3> Fishy Email Bandits  </h3>
                        <h4> There have been a lot of fishy bandits trying to trick the townsfolk with their emails. Find them and bring them to justice</h4 >
                        <b><span> (Test yourself to see if you can determine which emails are malicious or not) </span></b>
                    </div>

                </div>

            </div>

            <div> 
                <h2>Select your difficulty</h2>
                <div className="choosing">
                    <div className={difficultyType==="Easy"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Easy")}>Easy</div>
                    <div className={difficultyType==="Medium"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Medium")}>Medium</div>
                    <div className={difficultyType==="Hard"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Hard")}>Hard</div>
                    <div className={difficultyType==="Very Hard"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Very Hard")}>Very Hard</div>
                    <div className={difficultyType==="Extreme"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Extreme")}>Extreme</div>
                </div>
            </div>

            {chosenGameMode === "Script" && <div>
                <h2>Select a Language type</h2>
                <div className="choosing">
                    <div className={chosenLanguage==="SQL"? 'selected choices' : 'unselected choices'} onClick={()=>setLanguage("SQL")}>SQL</div>
                    <div className={chosenLanguage==="C"? 'selected choices' : 'unselected choices'} onClick={()=>setLanguage("C")}>C</div>
                    <div className={chosenLanguage==="C++"? 'selected choices' : 'unselected choices'} onClick={()=>setLanguage("C++")}>C++</div>
                    <div className={chosenLanguage==="Python"? 'selected choices' : 'unselected choices'} onClick={()=>setLanguage("Python")}>Python</div>
                    <div className={chosenLanguage==="Java"? 'selected choices' : 'unselected choices'} onClick={()=>setLanguage("Java")}>Java</div>
                    <div className={chosenLanguage==="Typescript"? 'selected choices' : 'unselected choices'} onClick={()=>setLanguage("Typescript")}>Typescript</div>
                </div>
            </div>}
           
            <div className="buttonlayout">
                <button className="button" onClick={() => loadGameSettings()}> Start </button> 
            </div>
        </div>
    )
}