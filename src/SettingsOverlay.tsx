import { useState } from "react";
import { Link } from "react-router-dom";


type difficulty = "Easy" | "Medium" | "Hard" | "Very Hard" | "Extreme";
type gameMode = "Script" | "Email";
type language = "SQL" | "Python" | "Java" | "C" | "C++" | "Typescript";

interface input {
    difficultyType: difficulty;
    setDifficulty: (diff: difficulty)=>void;
    setOverlay: ()=>void;
}

export default function SettingsOverlay({difficultyType, setDifficulty, setOverlay}: input) {

    const [gameMode, setGameMode] = useState<gameMode | null>();
    const [chosenLanguage, setLanguage] = useState<language | null>();
    
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

            {gameMode === "Script" && <div>
                <h2>Select a Language type</h2>
                <div className="choosing">
                    <div className={difficultyType==="Easy"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Easy")}>Easy</div>
                    <div className={difficultyType==="Medium"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Medium")}>Medium</div>
                    <div className={difficultyType==="Hard"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Hard")}>Hard</div>
                    <div className={difficultyType==="Very Hard"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Very Hard")}>Very Hard</div>
                    <div className={difficultyType==="Extreme"? 'selected choices' : 'unselected choices'} onClick={()=>setDifficulty("Extreme")}>Extreme</div>
                </div>
            </div>}
           
            <div className="buttonlayout">
                <Link to={"/game"} className="button">Start</Link>
            </div>
        </div>
    )
}