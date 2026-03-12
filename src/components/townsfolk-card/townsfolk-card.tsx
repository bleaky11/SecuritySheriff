import type { CharacterProfile } from "../../data/models";

import cowboy from "../../assets/cowboy.png"

import "./townsfolk-card.css"
import type { InterviewSubject } from "../../SecuritySheriff";
import { useState } from "react";

export interface TownsFolkCardProp {
    subject : InterviewSubject 
}

export function TownsFolkCard({subject} : TownsFolkCardProp) {

    const [townsFolk] = useState<CharacterProfile>(subject.profile)

    const scriptTendencies = Object.entries(subject.profile.scriptTendencies)
        .map(([key, value]) => {
            return (
                <span> {key} : {value} </span>
            )
        });

    return (
        <div className = "tonwsfolk-card">
            <div className = "townsfolk-card-general-info">
                <img src={cowboy} alt="dead" className={"townsfolk-image"}/>
                <div className="townsfolk-card-info"> 
                    <span> <b className="label"> Name : </b> {townsFolk.firstName} {townsFolk.lastName} </span>
                <span> <b className="label"> Job : </b> {townsFolk.occupation} </span>
                <span> <b className="label"> Email : </b> {townsFolk.email} </span>
                <span> <b className="label"> Character Traits : </b> {
                    townsFolk.characterTraits.length > 2 ? 
                        townsFolk.characterTraits.slice(0, townsFolk.characterTraits.length - 1).join(",") + ", &" + townsFolk.characterTraits[townsFolk.characterTraits.length - 1] :
                        townsFolk.characterTraits[0] + " & " + townsFolk.characterTraits[1]
                    }
                </span>
                </div>
            </div>
            <div className={"townsfolk-card-info"}> 
                <span> Script Tendencies: </span>
                {scriptTendencies}
            </div>
        </div>
    )
}