import { useState } from "react";
import { Link } from "react-router-dom";
import {useGameStateMachine} from "./States/GameStates";


type difficulty = "Easy" | "Medium" | "Hard" | "Very Hard" | "Extreme";
type gameMode = "Script" | "Email";
type language = "SQL" | "Python" | "Java" | "C" | "C++" | "Typescript";

interface input {
    setOverlay: ()=>void;
}


export default function SettingsOverlay({setOverlay}: input) {

    const [gameMode, setGameMode] = useState<gameMode | null>();
    const [chosenLanguage, setLanguage] = useState<language | null>();

    function DifficultyButtons()
    {
        const game = useGameStateMachine();
        
        {console.log(game.settingsState)}

        return (
             <div> 
                <h2>Select your difficulty</h2>
                <div className="choosing">
                    <div className={"Easy"} onClick={()=>game.selectDifficulty("Easy")}>Easy</div>
                    <div className={"Medium"} onClick={()=>game.selectDifficulty("Medium")}>Medium</div>
                    <div className={"Hard"} onClick={()=>game.selectDifficulty("Hard")}>Hard</div>
                    <div className={"Very Hard" } onClick={()=>game.selectDifficulty("Very Hard")}>Very Hard</div>
                    <div className={"Extreme" } onClick={()=>game.selectDifficulty("Extreme")}>Extreme</div>
                </div>
            </div>

            
        )

    } 

    function LanguageButtons()
    {
        const game = useGameStateMachine();

        return (
             <div> 
                <div className={"SQL"} onClick={()=>game.selectLanguage("SQL")}>SQL</div>
                    <div className={"C"} onClick={()=>game.selectLanguage("C")}>C</div>
                    <div className={"C++"} onClick={()=>game.selectLanguage("C++")}>C++</div>
                    <div className={"Python"} onClick={()=>game.selectLanguage("Python")}>Python</div>
                    <div className={"Java"} onClick={()=>game.selectLanguage("Java")}>Java</div>
                    <div className={"Typescript"} onClick={()=>game.selectLanguage("Typescript")}>Typescript</div>
            </div>
        )

    } 
    
    return (
        <div className="overlay">
            <div className="x" onClick={setOverlay}>x</div>

            <div> 
                <h2>Select Bounty</h2>

                <div className = "choosing"> 
                    <div className = {gameMode==="Script"? "chosen" :"poster"}  onClick={()=>{setGameMode("Script")}}
                    >  
                        <h3> Buggy Script  </h3>
                        <h4> There has been talk of beings going around trying to brainwash the townsfolk with alien scripts. Find them and bring them to justice </h4>
                        <b><span> (Test your debugging skills by seeing if a script has any bugs) </span></b>
                    </div>

                    <div className = {gameMode==="Email"? "chosen" :"poster"} onClick={()=>{setGameMode("Email")}}
                        >  
                        <h3> Fishy Email Bandits  </h3>
                        <h4> There have been a lot of fishy bandits trying to trick the townsfolk with their emails. Find them and bring them to justice</h4 >
                        <b><span> (Test yourself to see if you can determine which emails are malicious or not) </span></b>
                    </div>

                </div>

            </div>

            {<DifficultyButtons/>} 

            {gameMode === "Script" && <div>
                <h2>Select a Language type</h2>
                <div className="choosing">
                   {<LanguageButtons/>}
                </div>
            </div>}
           
            <div className="buttonlayout">
                <Link to={"/game"} className="button">Start</Link>
            </div>
        </div>
    )
}