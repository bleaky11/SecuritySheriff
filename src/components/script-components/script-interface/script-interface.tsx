import { useState } from "react";
import type { CharacterProfile, Script, ScriptError } from "../../../data/models";
import { CodeViewer } from "../code-view/code-view";

import './script-interface.css'
import { Group, Panel } from "react-resizable-panels";
import type { GameRound, InterviewSubject } from "../../../SecuritySheriff";
import { ScriptDetailTab } from "./script-details-tab/script-details-tab";
import { OverviewTab } from "../../overview-tab/overview";
import TownsFolkList from "../../townsfolk-list/townsfolk-list";

export interface ScriptInterfaceProps {
    roundInfo : GameRound,
    townsfolk : InterviewSubject[],
    setMessage : (x : string) => void,
    lineClickedEvent  : (scriptError : ScriptError | undefined) => void
}

export function ScriptInterface({roundInfo, townsfolk, setMessage, lineClickedEvent} : ScriptInterfaceProps) {
    
    const [currentScript, setCurrentScript] = useState<Script | undefined>(roundInfo.script);
    const [debugMode, setDebugMode] = useState<boolean>(false);
    
    const [lineInfo, setLineInfo] = useState<string>("");
    const [errorInfo, setErrorInfo] = useState<null | ScriptError>(null);

    const [currentTab, setCurrentTab] = useState<number>(0);

    const TAB_COMPONENTS = [
        <OverviewTab/>,
        <ScriptDetailTab script={currentScript} roundInfo={roundInfo}/>,
        <TownsFolkList townsfolk={townsfolk} />

    ]

    const clickedLine = (error : ScriptError | undefined) => {
        lineClickedEvent(error);
    }

    if (currentScript === undefined) {
        // replace with loading component
        return <div> loading script </div>
    }


    const activeTab = TAB_COMPONENTS[currentTab];

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
                            clickedLine={clickedLine}
                            debug = {debugMode} 
                        ></CodeViewer>
                    </div>
                </Panel>
                <Panel>
                    <div className = "script-interface-details">
                        <div className = "script-interface-details-tabs"> 
                            <button onClick={() => setCurrentTab(0)}> Overview </button>
                            <button onClick={() => setCurrentTab(1)}> Script Details </button>
                            <button onClick={() => setCurrentTab(2)}> Town Registry </button>
                        </div>
                        <div className="script-interface-details-content">
                            {activeTab}
                        </div>

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