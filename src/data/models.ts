export type ErrorType = "syntax" | "logic" | "security";

export interface ScriptError {
    line : number,
    description : string,
    fix : string,
    errorType : ErrorType
}

export interface Script {
    containsError : boolean,
    scriptContent : string,
    scriptLineLength : number,
    errors : ScriptError[],
    language: string,
    context : string
}

export interface EmailSegment {
    content : string,
    indicator : boolean,
}

export interface Email {
    malicious : boolean,
    subject : string,
    segments: EmailSegment[],
    sender : string, 
    reciever : string
}

export type Gender = "Male" | "Female"

export interface CharacterProfile {
    firstName : string,
    lastName : string,
    email : string,
    gender : Gender,
    occupation : string,
    characterTraits : string[]
}