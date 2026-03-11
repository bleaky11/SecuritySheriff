import saloon from "./assets/saloon.jpg"

import fish from "./assets/cowboy-fish.png"
import alien from "./assets/cowboy-alien.png"
import cowboy from "./assets/cowboy-neutral.png"

import "./App.css"
import "./SecuritySheriff.css"
import { useCallback, useEffect, useState } from "react"
import type { Email, CharacterProfile, Script } from "./data/models"
import { generate_email, generate_script, generate_townsfolk, initalize_gemini_api } from "./service/gemini"
import type { GameSettings } from "./SettingsOverlay"
import { useLocation } from "react-router-dom"
import { EmailViewer } from "./components/email-components/email-view/email-view"
import { ScriptInterface } from "./components/script-components/script-interface/script-interface"

// pregenerated data used in debug mode
import {TOWNS_FOLK_MOCK_DATA, SCRIPT_MOCK_DATA} from "./data/mock-data.ts"
import TownsFolkList from "./components/townsfolk-list/townsfolk-list.tsx"

type outlawType = "Cowboy" | "alien" | "bandit" | "fish";
type decision = "idle" | "deciding" | "pass" | "shoot";
type RoundType = "Email" | "Script";

const OUTLAW_IMAGES : Record<string, string> = {
    "alien" : alien,
    "fish" : fish
};

export interface GameRound {
    type : RoundType;
    script? : Script;
    email? : Email;
    subject : InterviewSubject; // this is the person who is appearing infront of us
    malicious : boolean;
}

export interface InterviewSubject {
    profile : CharacterProfile,
    interviewed : boolean,
}

export interface GameData {
    settings : GameSettings;
    rounds : GameRound[];
    townsfolk : InterviewSubject[];
}

export default function SecuritySheriff() {

    const [dialogue, setDialogue] = useState<string>("Howdy pardner");
    const [outlawType, setOutlaw] = useState<outlawType>("fish");
    const [showTrueForm, setForm] = useState<boolean>(false);

    const [round, setRound] = useState<number>(0);

    const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);

    const location = useLocation();
    const { state } : { state : GameSettings} = location;

    const generateNewScript = useCallback(async () : Promise<GameRound | null>  => {
        console.log("Generating Script Data");

        if (state && state.language && gameData) {
            if (state.debug) {
                // load preloaded script from json file
                return SCRIPT_MOCK_DATA[round % SCRIPT_MOCK_DATA.length];    
            }

            // get a random amout of errors
            const errorAmount = Math.floor(Math.random() * 5);
            console.log("Generating Script With " + errorAmount + " Errors");
            
            // choose a random person
            const availableSubjects = gameData.townsfolk.map(p => !p.interviewed); 
            const subject = availableSubjects[Math.floor(Math.random() * (availableSubjects.length - 1))];
            

            const res = await generate_script(errorAmount, subject, state.difficulty , state.language);
            if (res) {
                console.log("generated script")
                const rawJsonString = res.response.text();
                const parsedScript = JSON.parse(rawJsonString);

                const currentRoundData : GameRound = {
                    type : "Script",
                    script : parsedScript,
                    malicious : errorAmount > 0
                }
                return currentRoundData;                
            }
        } 
        
        return null;
    }, [round, state, gameData]);

    const generateNewEmail = useCallback(async () : Promise<GameRound | null> => {
        if (state && state.language && gameData) {
            
            const errorAmount = Math.floor(Math.random() * 5);

            const res = await generate_email(errorAmount, state.difficulty, gameData?.townsfolk)
            if (res) {
                const rawJsonString = res.response.text();
                const parsedEmail = JSON.parse(rawJsonString);

                const currentRoundData : GameRound = {
                    type : "Email",
                    email : parsedEmail,
                    malicious : errorAmount > 0
                }
                
                return currentRoundData;
            }
           
        }
        return null;
    }, [gameData, state]);

    // choose towns folk
    // generate email/script using person's details as base


    const generateRound = useCallback(async () => {
    if (state.gameMode === "Script") {
        return await generateNewScript();
    } else {
        return await generateNewEmail();
    }
    }, [generateNewEmail, generateNewScript, state.gameMode]);

    useEffect(() => {
        async function init() {
            console.log("Loading API")

            // load pre-generated data and skip gemini instance
            if (state.debug) {
                generateRound().then((currentRoundData) => {
                        console.log("Round generated")
                        console.log(JSON.stringify(currentRoundData, null, 2));
                        console.log(currentRoundData)
                        const gameData : GameData = {
                            settings : state,
                            townsfolk : TOWNS_FOLK_MOCK_DATA.map((p) : InterviewSubject => ({profile : p, interviewed : true})),
                            rounds : [currentRoundData!]
                        }

                        setGameData(gameData);
                        setCurrentRound(currentRoundData);
                    })
                return;
            }

            initalize_gemini_api().then((response) => {
                console.log("API loaded")
                if (response) {
                    console.log("Generating townsfolk")

                    generate_townsfolk(5).then((res) => {
                        if(response){
                            console.log("Townsfolk generated")
                            const parsed = JSON.parse(res.response.text())["Townsfolk"]["people"];
                            console.log(JSON.stringify(parsed, null, 2));
                            console.log(parsed);      
                            
                            generateRound().then((currentRoundData) => {
                                console.log("Round generated")
                                
                                const gameData : GameData = {
                                    settings : state,
                                    townsfolk : parsed,
                                    rounds : [currentRoundData!]
                                }

                                const contentData = gameData.settings.gameMode === "Script" ? currentRoundData?.script : currentRoundData?.email;
                                console.log(JSON.stringify(contentData, null, 2));
                                console.log(currentRoundData)

                                setGameData(gameData);
                                setCurrentRound(currentRoundData);
                            })
                        }
                    });
                }
            })
        }
        init();
    }, [generateRound, state]); 

    return (
        <div className="home">
            <img src={saloon} alt="Saloon" className="background"/>
            <img 
                src={showTrueForm ? OUTLAW_IMAGES[outlawType] : cowboy} 
                alt="outlaw" 
                className="character" 
                style={{bottom:"30%"}}
                onClick={() => {
                    if (state.debug) {
                        setForm(prev => !prev)
                    }
                }}    
            />
            
            <div className="interface">
                <div className="dialogue">
                    <p className = "dialogue-text">
                        {dialogue}
                    </p>
                </div>
            </div>
            
            {
                (currentRound && gameData) && 
                <div className = "sheriffList">
                    <div className = "script">
                            <div className = "script-container">
                            <ScriptInterface setMessage={setDialogue} townsfolk={gameData?.townsfolk} roundInfo = {currentRound} ></ScriptInterface>
                        </div>
                    </div>
                </div>   
            }
                    


        </div>
    )
}
