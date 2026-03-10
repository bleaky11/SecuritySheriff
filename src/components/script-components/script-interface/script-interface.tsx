import { useState } from "react";
import type { Script, ScriptError } from "../../../data/models";
import { CodeViewer } from "../code-view/code-view";

import './script-interface.css'
import { Group, Panel } from "react-resizable-panels";

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
        <div className = "script-interface-container">
            <div style = {{"display" : "flex", "justifyContent" : "center", "columnGap" : "10px"}}>
                <span className = "script-header"> Objective: Check this script and see if anything <b> BUGS </b> you... </span>
                {/* <button onClick={() => setDebugMode(!debugMode)}>Toggle Debug Mode</button> */}
            </div>


            <Group orientation="vertical">
                <Panel 
                    className="script-interface-code-panel"
                    style={{
                        "overflowX" : "hidden",
                        "overflowY" : "hidden"
                    }}    
                >
                    <div className = "script-interface-code-view">
                        <CodeViewer 
                            script={currentScript}
                            setLineInfo={setLineInfo}
                            setErrorInfo={setErrorInfo}
                            generateMessage={generateMessage}
                            debug = {debugMode} 
                        ></CodeViewer>
                    </div>
                </Panel>
                <Panel>
                    <div className = "script-interface-details"> 
                        <h2>Script Details</h2>
                        <p> {currentScript.context} </p>
                    </div>
                </Panel>
            </Group>
            
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