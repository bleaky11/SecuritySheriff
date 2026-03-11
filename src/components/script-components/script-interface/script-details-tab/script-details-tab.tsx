import type { Script } from "../../../../data/models";
import type { GameRound } from "../../../../SecuritySheriff";

export interface ScriptDetailTabProps {
    script : Script | undefined,
    roundInfo : GameRound | undefined, 
}


export function ScriptDetailTab({script, roundInfo} : ScriptDetailTabProps) {

    if (script === undefined) {
        return <div> Script Loading </div>
    }

    return (
        <div>
            <div className = "script-interface-details"> 
                <h2>Script Details</h2>
                <div className = "script-interface-details-container">
                    <div>
                        <p> {script.context} </p>
                    </div>
                </div>
            </div>
        </div>
    )


}