import saloon from "./assets/wildwestindoors.jpg"
import alien from "./assets/cowboyalien.png"
import dedge from "./assets/DeadWatson.png"
import sheriff from "./assets/ameeee.jpg"
import cowboi from "./assets/cowboi.png"
import redx from "./assets/redx.png"
import "./App.css"
import "./SecuritySheriff.css"
import { useEffect, useState } from "react"
import Verdict from "./verdict"
import type { Email, CharacterProfile, Script } from "./data/models"
import { EmailViewer } from "./components/email-components/email-view/email-view"
import { generate_email, generate_script, generate_townsfolk, initalize_gemini_api } from "./service/gemini"
import { ScriptInterface } from "./components/script-components/script-interface/script-interface"

type outlawType = "Cowboy" | "Alien" | "Bandit" | "Fish";
type decision = "idle" | "deciding" | "pass" | "shoot";

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
    const [emailInfo, setEmail] = useState<Email>();
    const [townFolks, setTownFolks] = useState<CharacterProfile[]>([]);
    const [currentScript, setCurrentScript] = useState<null | Script>(null);

    useEffect(()=> {
        initalize_gemini_api().then((response) => {
            if (response) {
                generate_townsfolk(10).then((res) => {
                    if(response){
                        const parsed = JSON.parse(res.response.text())["Townsfolk"]["people"];
                        setTownFolks(parsed);
                        console.log(parsed);      
                        
                        generate_script(3, "medium", "python").then((res) => {

                            if (res) {
                                const rawJsonString = res.response.text();
                                const parsedScript = JSON.parse(rawJsonString);
                                console.log(parsedScript);
                                setCurrentScript(parsedScript);
                            }
                        });

                        // generate_email(3, "medium", parsed).then((res) => {
                        //     if(res){
                        //         const parsedEmail = JSON.parse(res.response.text());
                        //         setEmail(parsedEmail);
                        //         console.log(parsedEmail);
                        //     }
                        // })
                    }
                }
                )
            }
        }
    )}, 
    []);

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

    function SheriffList(){
        return(
            <div className="sheriffList">
                <button className={tabOne? "listTabs selected" : "listTabs"} onClick={()=>{setTab(true)}}>Outlaw Info</button>
                <button className={tabOne? "listTabs" : "listTabs selected"} onClick={()=>{setTab(false)}}>Town Info</button>
                {tabOne && <div className="Information">
                    {emailInfo !== undefined && <EmailViewer email={emailInfo}></EmailViewer> }
                    {currentScript !== null && 
                        <div>
                            <ScriptInterface script = {currentScript}></ScriptInterface>
                        </div>
                    }
                </div>}
                {!tabOne && <div className="Information">
                    {townFolks.map((folk, index) => (
                        <div key={index}>
                            <span> {folk.firstName} {folk.lastName} {folk.occupation} </span>
                            <p>Sex: {folk.gender}</p>
                            <p>Occupation: {folk.occupation}</p>
                            <div> 
                                <p>Character Traits:</p>
                                <ul>
                                    {folk.characterTraits.map((trait, idx) => (
                                        <li key={idx}>{trait}</li>
                                    ))}
                                </ul>
                            </div>
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

    return (
        <div className="home">
            <img src={saloon} alt="Saloon" className="background"/>
            {!alive && <img src={dedge} alt="dead" className={alive? "absolute" : "show absolute"}></img>}
            <TrueForm></TrueForm>
            {alive && choice === `${"shoot"}` &&<img src={redx} alt="A big red x" className="character"></img>}
            <div className="interface">
                <div className="dialogue">
                    Howdy there stranger
                </div>
                {!listOpen && <img src={sheriff} alt="sheriff" className="sheriff"></img>}
            </div>
            {listOpen && <SheriffList/>}
            <button className="verdict openList" onClick={openList}>Open List</button>
            <button className="verdict" onClick={verdictButton}>verdict</button>
            {choice !== `${"idle"}` && <Verdict setDecision={setChoice}/>}
        </div>
    )
}
