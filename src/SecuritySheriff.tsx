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
                    This guy is evil
                </div>}
                {!tabOne && <div className="Information">
                    This town is evil
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
