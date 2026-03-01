import "./homepage.css"

type decision = "idle" | "deciding" | "pass" | "shoot";

interface input{
    setDecision: (s:decision)=>void;
}

export default function Verdict({setDecision}: input){

    return(
        <div className="verdictOverlay">
            <button className="verdictButtons" onClick={()=>{setDecision("pass")}}>Pass</button>
            <button className="verdictButtons" onClick={()=>{setDecision("shoot")}}>Shoot</button>
        </div>
    )
}