import { GoogleGenerativeAI } from "@google/generative-ai";

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

export async function initalize_gemini_api(){
    if (!apiKey) {
        throw new Error("Gemini API key is not defined in environment variables.");
    }

    if (!genAI && !model) {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
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