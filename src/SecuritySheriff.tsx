import saloon from "./assets/saloon.jpg"

import fish from "./assets/cowboy-fish.png"
import alien from "./assets/cowboy-alien.png"
import cowboy from "./assets/cowboy-neutral.png"

import "./App.css"
import "./SecuritySheriff.css"
import { useCallback, useEffect, useState } from "react"
import { type Email, type CharacterProfile, type Script, generateTendencies, type ScriptError } from "./data/models"
import { generate_email, generate_script, generate_townsfolk, initalize_gemini_api } from "./service/gemini"
import type { GameSettings } from "./SettingsOverlay"
import { useLocation } from "react-router-dom"
import { ScriptInterface } from "./components/script-components/script-interface/script-interface"

import useSound from "use-sound";
import bogos from "../src/assets/sounds/bogos-binted.mp3"
import cave from "../src/assets/sounds/Cave.ogg"
import diddy from "../src/assets/sounds/diddy.mp3"
import boom from "../src/assets/sounds/boom.mp3"

// pregenerated data used in debug mode
import {TOWNS_FOLK_MOCK_DATA, SCRIPT_MOCK_DATA} from "./data/mock-data.ts"

type outlawType = "Cowboy" | "alien" | "bandit" | "fish";
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
    const [outlawType, setOutlaw] = useState<outlawType>("alien");
    const [showTrueForm, setForm] = useState<boolean>(false);

    const [round, setRound] = useState<number>(0);

    const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);

    const [playBogos] = useSound(bogos, { volume: 0.5 });
    const [playCave] = useSound(cave, { volume: 0.7 });
    const [playDiddy] = useSound(diddy, { volume: 1 });
    const [playBoom] = useSound(boom, { volume: 1 });

    // store the found errors within this set
    // the errors will be converted to strings which will then allow comparison by value
    const [foundErrors, setFoundErrors] = useState<Set<String>>(new Set());

    const location = useLocation();
    const { state } : { state : GameSettings} = location;

    const generateNewScript = useCallback(async (townsfolk: InterviewSubject[]) : Promise<GameRound | null>  => {
        console.log("Generating Script Data");

        if (state && state.language) {
            if (state.debug) {  
                
                const availableSubjects = townsfolk.filter(p => !p.interviewed); 
                const subject = availableSubjects[Math.floor(Math.random() * (availableSubjects.length - 1))];
                console.log("Chosen Subject: " + JSON.stringify(subject));
                
                const currentRoundData : GameRound = {
                    "type" : "Script",
                    "script" : SCRIPT_MOCK_DATA[round % SCRIPT_MOCK_DATA.length],
                    "malicious" : SCRIPT_MOCK_DATA[round % SCRIPT_MOCK_DATA.length].containsError,
                    "subject" : {
                        "profile" : {
                            "firstName": "Abilene",
                            "lastName": "Miller",
                            "email": "abby.miller45@dustymail.com",
                            "gender": "Female",
                            "occupation": "Saloon Owner",
                            "introduction": "Thirsty? Grab a stool at the Birdcage, but keep your hands where I can see 'em if you're looking for more than a drink.",
                            "characterTraits": [
                                "Resilient",
                                "Shrewd",
                                "Charismatic",
                                "Protective"
                            ],
                            "scriptTendencies" : generateTendencies()
                        },
                        "interviewed" : false
                    },
                }

                // load preloaded script from json file
                return currentRoundData
            }

            // get a random amout of errors
            const errorAmount = Math.floor(Math.random() * 5);
            console.log("Generating Script With " + errorAmount + " Errors");
            
            // choose a random person
            const availableSubjects = townsfolk.filter(p => !p.interviewed); 
            const subject = availableSubjects[Math.floor(Math.random() * (availableSubjects.length - 1))];
            console.log("Chosen Subject: " + JSON.stringify(subject));

            const res = await generate_script(errorAmount, subject, state.difficulty , state.language);
            if (res) {
                console.log("generated script")
                const rawJsonString = res.response.text();
                const parsedScript = JSON.parse(rawJsonString);

                const currentRoundData : GameRound = {
                    type : "Script",
                    script : parsedScript,
                    malicious : errorAmount > 0,
                    subject : subject
                }
                return currentRoundData;                
            }
        } 
        
        return null;
    }, [round, state]);

    const generateNewEmail = useCallback(async () : Promise<GameRound | null> => {
        if (state && state.language && gameData) {
            
            const errorAmount = Math.floor(Math.random() * 4) + 1;

            const res = await generate_email(errorAmount, state.difficulty, gameData?.townsfolk)
            if (res) {
                const rawJsonString = res.response.text();
                const parsedEmail = JSON.parse(rawJsonString);

                const person = JSON.stringify(personObj);
                const person2 = JSON.stringify(person2Obj);

                const currentRoundData : GameRound = {
                    type : "Email",
                    email : parsedEmail,
                    malicious : errorAmount > 0,
                    subject : {
                        "profile" : { 
                            "characterTraits" : [],
                            'email' : "",
                            'firstName' : "",
                            'gender' : "Female",
                            'lastName' : "",
                            'occupation' : "",
                            'introduction' : "",
                            'scriptTendencies' : generateTendencies(),
                        },
                        "interviewed" : false
                    }
                }
                
                return currentRoundData;
            }
           
        }
        return null;
    }, [gameData, state]);

    // choose towns folk
    // generate email/script using person's details as base


    const generateRound = useCallback(async (townsfolk: InterviewSubject[]) => {
    if (state.gameMode === "Script") {
        return await generateNewScript(townsfolk);
    } else {
        return await generateNewEmail();
    }
    }, [generateNewEmail, generateNewScript, state.gameMode]);

    useEffect(() => {
        async function init() {
            console.log("Loading API")

            // load pre-generated data and skip gemini instance
            if (state.debug) {
                const townsfolkData = TOWNS_FOLK_MOCK_DATA.map((p) : InterviewSubject => ({profile : p, interviewed : true}))
                generateRound(townsfolkData).then((currentRoundData) => {
                        console.log("Round generated")
                        console.log(JSON.stringify(currentRoundData, null, 2));
                        console.log(currentRoundData)
                        const gameData : GameData = {
                            settings : state,
                            townsfolk : townsfolkData,
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
                            console.log(res.response.text());
                            const parsed = JSON.parse(res.response.text())["people"];
                            console.log(JSON.stringify(parsed, null, 2));
                            console.log(parsed);      
                            
                            const townsfolk = parsed.map((person : CharacterProfile) => {
                                return {
                                    profile : {...person, scriptTendencies : generateTendencies()},
                                    interviewed : false
                                }
                            });

                            generateRound(townsfolk).then((currentRoundData) => {
                                console.log("Round generated")
                                
                                const gameData : GameData = {
                                    settings : state,
                                    townsfolk : townsfolk,
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
    }, [state]); 

    const lineClickedEvent = (scriptError : ScriptError | undefined) => {
        if (scriptError === undefined) {
            setDialogue("Diddy blud you trippin");
            playDiddy();
            return;
        }

        // stringify error to compare by value and check if it has already been found
        const errorString = JSON.stringify(scriptError);
        if (foundErrors.has(errorString)) {
            return
        }

        setFoundErrors(prev => {
            const newSet = new Set(prev);
            newSet.add(errorString);

            if (newSet.size === currentRound?.script?.errors.length) {
                setForm(true);
                playBogos();
                playCave();
                setDialogue("Bogos Binted ");
                return new Set(); // reset found errors for next round
            } else {
                playBoom();
                setDialogue("Ummmm that was an oopsie I swear");
            }
            return newSet;
        })
    }

    return (
        <div className="home">
            <img src={saloon} alt="Saloon" className="background"/>
            <img 
                src={cowboy} 
                alt="outlaw" 
                style={{bottom:"30%"}}
                onClick={() => {
                    if (state.debug) {
                        setForm(prev => !prev)
                    }
                }}   
                className={`${showTrueForm? "disappear": "character"}`} 
            />
            
            <img 
                hidden={!showTrueForm}
                src={OUTLAW_IMAGES[outlawType]} 
                alt="outlaw" 
                className={`${!showTrueForm? "disappear": "character"}`} 
                style={{bottom:"30%"}}
                onClick={() => {
                    if (state.debug) {
                        setForm(prev => !prev)
                    }
                }}    
            />

            <div className="interface">
                <div className = "interface-header"> 
                    {(currentRound && currentRound?.subject && currentRound?.subject.profile) && <span className = "interface-header-name"> {currentRound?.subject.profile.firstName} {currentRound?.subject.profile.lastName}  </span>}
                </div>
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
                            <ScriptInterface 
                                setMessage={setDialogue} 
                                townsfolk={gameData?.townsfolk} 
                                roundInfo = {currentRound} 
                                lineClickedEvent={lineClickedEvent}
                            ></ScriptInterface>
                        </div>
                    </div>
                </div>   
            }
                    


        </div>
    )
}
