import { useState } from "react";
import type {Email, EmailSegment } from "../../../data/models";

export function EmailViewer({email} : {email : Email}) {

    const [currentEmail, setCurrentEmail] = useState<Email>(email);

    const isIndicator = (segement : EmailSegment) => {
        console.log(segement.indicator ? "Is indicator" : "Is not indicator")
        return segement.indicator;
    }

    return (
        <div> 
            <h3> From: {currentEmail.sender} </h3>
            <h3> To: {currentEmail.reciever} </h3>
            <h3> Subject: {currentEmail.subject} </h3>
            {
                currentEmail.segments.map((segment) => {
                    return (<span onClick={() => isIndicator(segment)} > {segment.content} </span>)
                })
            }
        </div>
    )




}