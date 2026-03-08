import { useState } from "react";
import type { Script, ScriptError } from "../../../data/models";
import { CodeViewer } from "../code-view/code-view";

export interface ScriptInterfaceProps {
    script : Script,
    setMessage : (x : string) => void

}

export function ScriptInterface({script, setMessage} : ScriptInterfaceProps) {
    
    const [currentScript, setCurrentScript] = useState<Script>(script);
    const [debugMode, setDebugMode] = useState<boolean>(false);
    
    const [lineInfo, setLineInfo] = useState<String>("");
    const [errorInfo, setErrorInfo] = useState<null | ScriptError>(null);

    const generateMessage = (error : boolean) => {
        if (error) {
            setMessage("Oooooo you got my " + errorInfo?.errorType + " error")
        } else {
            setMessage("That isn't an error partner")
        }
    }

    return (
        <div>
            <div style = {{"display" : "flex", "justifyContent" : "center", "columnGap" : "10px"}}>
                <h2> Objective: Check this script and see if anything <b> BUGS </b> you... </h2>
                <button onClick={() => setDebugMode(!debugMode)}>Toggle Debug Mode</button>
            </div>
            <CodeViewer 
                script={currentScript}
                setLineInfo={setLineInfo}
                setErrorInfo={setErrorInfo}
                generateMessage={generateMessage}
                debug = {debugMode} 
            ></CodeViewer>
            {debugMode && 
                <div> 
                    <h2>Debug Information</h2>
                    {
                        currentScript.errors.map((error, index) => (
                            <div key={index}>
                                <p>Error Type: {error.errorType}</p>
                                <p>Error Line: {error.line}</p>
                                <p>Error Description: {error.description}</p>
                            </div>
                        ))
                    }
                </div>
            } 

            <div>   
                {lineInfo !== "" && <h3> {lineInfo} </h3>}

                {errorInfo !== null && 
                    <div>
                        <h3> Error Infomation </h3>
                        <p> Error Type: {errorInfo.errorType} </p>
                        <p> Error Line: {errorInfo.line} </p>
                        <p> Error Description: {errorInfo.description} </p>
                    </div>    
                }       
            </div>
        </div>
    );
} 