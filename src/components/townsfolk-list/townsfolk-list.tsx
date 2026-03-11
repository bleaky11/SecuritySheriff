import type { InterviewSubject } from "../../SecuritySheriff";
import { TownsFolkCard } from "../townsfolk-card/townsfolk-card";

import "./townsfolk-list.css"

export interface TownsFolkListProp {
    townsfolk : InterviewSubject[]
}

export default function TownsFolkList({townsfolk} : TownsFolkListProp) {
    return (
        <div className = "towns-folk-list-container">
            <h1 className = "list-header"> Town Registry </h1>
            <h2> Here is a list of all the townsfolk. This might help you out... </h2>
            <div className = "towns-folk-list">
                {
                    townsfolk.map((subject, index) => {
                        return (
                            <TownsFolkCard subject={subject}/>
                        )
                    }) 
                }


            </div>
        </div>
    )
}