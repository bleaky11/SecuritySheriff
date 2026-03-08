import type { CharacterProfile } from "../../data/models";
import { TownsFolkCard } from "../townsfolk-card/townsfolk-card";

import "./townsfolk-list.css"

export interface TownsFolkListProp {
    townsfolk : CharacterProfile[]
}

export default function TownsFolkList({townsfolk} : TownsFolkListProp) {
    return (
        <div className = "towns-folk-list">
            {
                townsfolk.map((person, index) => {
                    return (
                        <TownsFolkCard townsFolk={person}/>
                    )
                }) 
            }


        </div>
    )
}