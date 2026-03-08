import { Highlight, themes } from "prism-react-renderer";
import { useState, type JSX } from "react";
import type { Script, ScriptError } from "../../../data/models";

import './code-view.css'

export interface CodeViewerProps {
    debug : boolean,
    script : Script,
    setLineInfo : (message : string) => void,
    setErrorInfo : (scriptError : ScriptError) => void,
    generateMessage : (error : boolean) => void
}

export function CodeViewer({script, setLineInfo, setErrorInfo, generateMessage} : CodeViewerProps) {
    const [currentScript, setCurrentScript] = useState<Script>(script);
    const [selectedLine, setSelectedLine] = useState<null | number>(null);

    const checkCodeLine = (line : number) => {

        const isError = currentScript.errors.filter((error) => {
            return error.line === line;
        })

        if (isError.length === 0) {
            setLineInfo(`Line ${line} is not an error`);
            generateMessage(false);
        } else {
            setLineInfo(`Error found on line ${line}`);
            setErrorInfo(isError[0]);
            generateMessage(true);
        }

    }

    return (
        <div
            style=
            {{
                textAlign: 'left',      // Forces text to the left
                margin: 0,               // Removes auto-centering margins
                padding: '1rem',         // Standard spacing
                overflowX: "auto",       // Allows horizontal scrolling for long lines
                display: 'table',        // Ensures clickable lines span the full width
                minWidth: '100%',        // Prevents shrinking if the code is short
            }}
        >
            <Highlight theme={themes.nightOwl} code={currentScript.scriptContent} language={script.language}>

            {({ tokens, getLineProps, getTokenProps }) => (
                <pre>
                {tokens.map((line, i) => {
                    const isSelected = selectedLine === i;
                    const isError = script.errors.filter((error) => {
                        return error.line === i + 1;
                    }).length === 1;

                    return (
                    <div 
                        {...getLineProps({ line, key: i })}
                        className = {`code-line-interactive`}
                        onClick={() => checkCodeLine(i + 1)} // Trigger your game event
                        style={{
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#3e4451' : isError ? `#ff2020ab` : `transparent`,
                        borderLeft: isSelected ? '4px solid #f99' : '4px solid transparent'
                        }}
                    >
                        {/* Line numbering (optional) */}
                        <span style={{ marginRight: '10px', opacity: 0.5 }}>{i + 1}</span>
                        
                        {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                    );
                })}
                </pre>
            )}
            </Highlight>
        </div>
        
    );
}