import saloon from "./assets/wildwestindoors.jpg"
import alien from "./assets/cowboyalien.png"
import dedge from "./assets/DeadWatson.png"
import sheriff from "./assets/ameeee.jpg"
import cowboi from "./assets/cowboi.png"
import redx from "./assets/redx.png"
import "./App.css"
import "./SecuritySheriff.css"
import { useCallback, useEffect, useState } from "react"
import Verdict from "./verdict"
import type { Email, CharacterProfile, Script } from "./data/models"
import { generate_email, generate_script, generate_townsfolk, initalize_gemini_api } from "./service/gemini"
import type { GameSettings } from "./SettingsOverlay"
import { useLocation } from "react-router-dom"
import { EmailViewer } from "./components/email-components/email-view/email-view"
import { ScriptInterface } from "./components/script-components/script-interface/script-interface"

type outlawType = "Cowboy" | "Alien" | "Bandit" | "Fish";
type decision = "idle" | "deciding" | "pass" | "shoot";

type RoundType = "Email" | "Script";

export interface GameRound {
    type : RoundType;
    script? : Script;
    email? : Email;
    malicious : boolean;
}

export interface GameData {
    settings : GameSettings;
    rounds : GameRound[];
    townsfolk : CharacterProfile[]
}


export default function SecuritySheriff() {

    const [dialogue, setDialogue] = useState<string>("Howdy pardner");
    const [outlawType, setOutlaw] = useState<outlawType>("Alien");
    const [showTrueForm, setForm] = useState<boolean>(false);
    const [alive, setAlive] = useState<boolean>(true);
    const [choice, setChoice] = useState<decision>("idle");
    const [counter, setCounter] = useState<number>(0);//Number of correct decisions made so far
    const [list, setList] = useState<string>("");
    const [listOpen, setOpen] = useState<boolean>(false);
    const [tabOne, setTab] = useState<boolean>(true);


    const [townFolks, setTownFolks] = useState<CharacterProfile[]>([]);

    const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);

    const location = useLocation();
    const { state } : { state : GameSettings} = location;

    const generateNewScript = useCallback(async () : Promise<GameRound | null>  => {
        console.log("Generating Script Data");
        if (state && state.language) {

            const errorAmount = Math.floor(Math.random() * 5);
            console.log("Generating Script With " + errorAmount + " Errors");
            const res = await generate_script(errorAmount, state.difficulty , state.language);
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
    }, [state]);

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



    // const generateRound = useCallback(async () => {

    //     let currentRoundData : GameRound | null = null;

    //     if (state.gameMode === "Script") {
    //         currentRoundData = await generateNewScript();
    //     } else {
    //         currentRoundData = await generateNewEmail();
    //     }

    //     setCurrentRound(currentRoundData);

    //     return currentRoundData;
    // }, [currentRound, generateNewEmail, generateNewScript, state]);

    const generateRound = useCallback(async () => {
    if (state.gameMode === "Script") {
        return await generateNewScript();
    } else {
        return await generateNewEmail();
    }
    }, [generateNewEmail, generateNewScript, state.gameMode]);

    // useEffect(()=> {
    //     console.log("Loading API")
    //     initalize_gemini_api().then((response) => {
    //         console.log("API loaded")
    //         if (response) {
    //             console.log("Generating townsfolk")
    //             generate_townsfolk(10).then((res) => {
    //                 if(response){
    //                     console.log("Townsfolk generated")
    //                     const parsed = JSON.parse(res.response.text())["Townsfolk"]["people"];
    //                     setTownFolks(parsed);
    //                     console.log(parsed);      
                        
    //                     generateRound().then((currentRoundData) => {
    //                         console.log("Round generated")
    //                         console.log(currentRoundData)
    //                         const gameData : GameData = {
    //                             settings : state,
    //                             townsfolk : parsed,
    //                             rounds : [currentRoundData!]
    //                         }

    //                         setGameData(gameData);
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // )}, 
    // [generateRound, state]);

    useEffect(() => {
        async function init() {
            // console.log("Loading API");

            // const response = initalize_gemini_api();
            // console.log(response);
            // if (!response) {
            //     console.error("Failed to initialize Gemini API");
            //     return;
            // }
            // const res = await generate_townsfolk(10);
            // const parsed = JSON.parse(res.response.text())["Townsfolk"]["people"];
            // setTownFolks(parsed);

            // const firstRound = await generateRound();

            // setGameData({
            // settings: state,
            // townsfolk: parsed,
            // rounds: [firstRound!]
            // });

            // console.log("API loaded");

            console.log("Loading API")
            initalize_gemini_api().then((response) => {
                console.log("API loaded")
                if (response) {
                    console.log("Generating townsfolk")
                    generate_townsfolk(10).then((res) => {
                        if(response){
                            console.log("Townsfolk generated")
                            const parsed = JSON.parse(res.response.text())["Townsfolk"]["people"];
                            setTownFolks(parsed);
                            console.log(parsed);      
                            
                            generateRound().then((currentRoundData) => {
                                console.log("Round generated")
                                console.log(currentRoundData)
                                const gameData : GameData = {
                                    settings : state,
                                    townsfolk : parsed,
                                    rounds : [currentRoundData!]
                                }

                                setGameData(gameData);
                                setCurrentRound(currentRoundData);
                            })
                        }
                    })
                }
            })
        }

        init();
    }, []); 


    function verdictButton(){
        if(choice === "idle")
            setChoice("deciding");
        else{
            setChoice("idle");
        }
    }

    function openList(){
        setOpen(!listOpen);
    }

    function TrueForm(){
        if(showTrueForm && outlawType === "Alien"){
            return (
                <img src={alien} alt="alien" className="character" style={{bottom:"20%"}}/>
            )
        }else return (
            <img src={cowboi} alt="cowboy" className="character"/>
        )
    }

    function SheriffList(
        {
            roundData, 
            gameData, 
        } : 
        {
            roundData : GameRound | null, 
            gameData : GameData | null, 
        }
    ){

        const [tab, setTab] = useState(false);

        return(
            <div className="sheriffList">
                <button className={tab? "listTabs selected" : "listTabs"} onClick={()=>{setTab(true)}}>Outlaw Info</button>
                <button className={tab? "listTabs" : "listTabs selected"} onClick={()=>{setTab(false)}}>Town Info</button>
                {tab && <div className="Information">
                    {(roundData === null) && <div> Round Data Loading </div>}
                    {(roundData !== null && roundData.type === "Email") && roundData.email !== undefined && <EmailViewer email={roundData.email}></EmailViewer> }
                    {(roundData !== null && roundData.type === "Script" && roundData.script !== undefined) && 
                        <div>
                            <ScriptInterface script = {roundData.script}></ScriptInterface>
                        </div>
                    }
                </div>}
                {(!tab && gameData !== null) && <div className="Information">
                    {gameData.townsfolk.map((folk, index) => (
                        <div key={index}>
                            <span> {folk.firstName} {folk.lastName} {folk.occupation} {folk.gender} </span>
                        </div>
                    ))}
                </div>}
            </div>
        )
    }

    useEffect(()=>{
        if(choice !== "idle" && choice !== "deciding"){
            setForm(true);
        }
        if(choice === "pass" && outlawType !== "Cowboy"){
            setAlive(false);
        }
    }, [choice, outlawType]);

    console.log(gameData);
    console.log(currentRound)
    return (
        <div className="home">
            <img src={saloon} alt="Saloon" className="background"/>
            {!alive && <img src={dedge} alt="dead" className={alive? "absolute" : "show absolute"}></img>}
            {/* <TrueForm></TrueForm> */}
            {alive && choice === `${"shoot"}` &&<img src={redx} alt="A big red x" className="character"></img>}
            <div className="interface">
                <div className="dialogue">
                    Howdy there stranger
                </div>
                {!listOpen && <img src={sheriff} alt="sheriff" className="sheriff"></img>}
            </div>
            {listOpen  && <SheriffList roundData={currentRound} gameData={gameData}/>}
            <button className="verdict openList" onClick={openList}>Open List</button>
            <button className="verdict" onClick={verdictButton}>verdict</button>
            {choice !== `${"idle"}` && <Verdict setDecision={setChoice}/>}
        </div>
    )
}
