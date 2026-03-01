import { GoogleGenerativeAI } from "@google/generative-ai";
import type { CharacterProfile } from "../data/models";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;
let model = null;

const JSON_MESSAGE_RESPONSE = `
    return message output in JSON format with the following structure:

    {
        "content" : "the content of the message",
        "emotion": "the emotion of the message"
    }
`

const GENERATE_SCRIPT_WITH_ERRORS = `
    generate a programming script of some function or code with an error in of either syntatical, logical, or security errors in them 
    and give a detailed description of the context of the code so the errors make sense. 
    Some comments are okay but not too many.
    Also make sure when noting what lines the error is on it is the actual line where code should be added/replaced not the one below or above
    The script can have a max of 30 ish lines (not including import statements just function body)
`

const GENERATE_SCRIPT_WITHOUT_ERRORS = `
    generate a programming script of some function or code with no errors in them 
    and give a detailed description of the context of the code. 
    Some comments are okay but not too many.
    The script can have a max of 30 ish lines (not including import statements just function body)
`

const JSON_SCRIPT_RESPONSE = `
    return the script output in JSON format with the following structure:
    
    ScriptError {
        line : a number representing the line the error is on,
        description : a detailed description of why this line contains an error,
        fix : a detailed description of how to fix this error,
        errorType : whether the error is of type "syntax", "logic", or "security";
    }

    Script {
        containsError : boolean of whether the script has an error,
        scriptContent : the formatted script function,
        scriptLineLength : the total length of the script,
        errors : an array of ScriptError type describing the errors inside of the script,
        language: the programming language the script is,
        context : detailed context of the script to contextualize what may or may not be in error for the user
    }
`

const GENERATE_MALICIOUS_EMAIL = `
    generate an email that is malicious in nature (phishing email, spam email, scam email, malware/ransomware delivery, etc) 
    but make it disguised. Keep it between 20-40 words. (use context of selected character profile)
`

const GENERATE_EMAIL = `
    generate an email that is of some mundane topic, themed in a wild west fashion (use context of selected character profile)
`

const JSON_EMAIL_RESPONSE = `
    return the email output in JSON format with the following structure:

    EmailSegment {
        Content: the content for this particular section of the email,
        Indicator : boolean of whether this section indicates if this email is malicious or not
    }

    Email {
        malicious : if this email is malicious or not
        subject : the subject of the email
        segments : an array of EmailSegment type which lists all of the segments of the email content
        sender : the email address of who sent the email 
        reciever : the email address of who recieved the email
    }
`

const JSON_TOWNSFOLK_RESPONSE = `
    return the townsfolk data in JSON format with the following structure:

    CharacterProfile {
        firstName : first name of towns folk (wild west theme)
        lastName : last name of towns folk (wild west theme)
        email : email of towns folk which is some combination of the first and last name with some random digits
        gender : gender of towns folk that matches name
        occupation : occupation of towns folk that matches wild west theme
        characterTraits : a list of 3-5 unique character traits as strings
    }


    Townsfolk: {
        folk : list of CharacterProfile type
    }
`

const GENERATE_TOWNSFOLK = `
    generate a list of towns folk that matches the wild west theme, make them a diverse cast of characters
`

export async function initalize_gemini_api(){
    if (!apiKey) {
        throw new Error("Gemini API key is not defined in environment variables.");
    }

    if (!genAI && !model) {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: "gemini-3.1-pro-preview",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const response = await model.generateContent(
            "Output a friendly greeting as if you were a western horse anime girl" + JSON_MESSAGE_RESPONSE
        );

        return response;
    }
}

// make most of these parameters enums
export async function generate_script(errors : numbers, difficulty : string, language : string) {
    if (!apiKey) {
        throw new Error("Gemini API key is not defined in environment variables.");
    }

    if (!genAI || !model) {
        throw new Error("Gemini API is not properly initalized");
    }

    const response = await model.generateContent(
        (errors === 0 ? GENERATE_SCRIPT_WITHOUT_ERRORS : GENERATE_SCRIPT_WITH_ERRORS) 
        + ` it should contain ${errors} errors, be ${difficulty} difficulty and be written in ${language} programming language`
        +  JSON_SCRIPT_RESPONSE
    )

    return response;
}

export async function generate_email(indicators : number, difficulty : string, townsFolk : CharacterProfile[]) {

    if (!apiKey) {
        throw new Error("Gemini API key is not defined in environment variables.");
    }

    if (!genAI || !model) {
        throw new Error("Gemini API is not properly initalized");
    }
    
    console.log("generating email")

    const personObj = townsFolk[Math.random() * townsFolk.length];

    const filtered = townsFolk.filter(p => p.email !== person.email);
    const person2Obj = filtered[Math.random() * filtered.length];

    const person = JSON.stringify(personObj);
    const person2 = JSON.stringify(person2Obj);

    const response = await model.generateContent(
        (indicators === 0 ? GENERATE_EMAIL : GENERATE_MALICIOUS_EMAIL)
        + ` it should contain ${indicators} indicators, be ${difficulty} difficulty to detect. Also use the data of ${person} as the sender and ${person2} to either make the email more believable`
        + JSON_EMAIL_RESPONSE
    )

    console.log("email generated")

    return response;
}

export async function generate_townsfolk(amount : number) {
    if (!apiKey) {
        throw new Error("Gemini API key is not defined in environment variables.");
    }

    if (!genAI || !model) {
        throw new Error("Gemini API is not properly initalized");
    }

    const response = await model.generateContent(
        GENERATE_TOWNSFOLK + `, with a total size of ${amount}` + JSON_TOWNSFOLK_RESPONSE 
    )

    return response;
}