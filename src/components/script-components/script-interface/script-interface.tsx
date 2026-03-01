import { useState } from "react";
import type { Script } from "../../../data/models";
import { CodeViewer } from "../code-view/code-view";

export interface ScriptInterfaceProps {
    script : Script
}

export function ScriptInterface({script} : ScriptInterfaceProps) {
    
    const [currentScript, setCurrentScript] = useState<Script>(script);
    const [debugMode, setDebugMode] = useState<boolean>(false);
    
    return (
        <div>
            <button onClick={() => setDebugMode(!debugMode)}>Toggle Debug Mode</button>
            <CodeViewer script={currentScript}></CodeViewer>
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



            
        </div>
    );
} 