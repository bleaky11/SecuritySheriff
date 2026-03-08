import type { CharacterProfile } from "../../data/models";

import cowboy from "../../assets/cowboy.png"

import "./townsfolk-card.css"

export interface TownsFolkCardProp {
    townsFolk : CharacterProfile 
}

export function TownsFolkCard({townsFolk} : TownsFolkCardProp) {

    return (
        <div className = "tonwsfolk-card">
            <img src={cowboy} alt="dead" className={"townsfolk-image"}/>            
            <div className={"townsfolk-card-info"}> 
                <span> <b className="label"> Name : </b> {townsFolk.firstName} {townsFolk.lastName} </span>
                <span> <b className="label"> Job : </b> {townsFolk.occupation} </span>
                <span> <b className="label"> Email : </b> {townsFolk.email} </span>
                <span> <b className="label"> Character Traits : </b> {
                    townsFolk.characterTraits.length > 2 ? 
                        townsFolk.characterTraits.slice(1).join(",") + ", &" + townsFolk.characterTraits[townsFolk.characterTraits.length - 1] :
                        townsFolk.characterTraits[0] + " & " + townsFolk.characterTraits[1]
                    }
                </span>
            </div>
        </div>
    )
}