import { Highlight, themes } from "prism-react-renderer";
import { useState, type JSX } from "react";
import type { Script } from "../../../data/models";

import './code-view.css'


export function CodeViewer({script} : {script : Script}) : JSX.Element{

    const [currentScript, setCurrentScript] = useState<Script>(script);

    const [selectedLine, setSelectedLine] = useState<null | number>(null);

    const checkCodeLine = (line : number) => {

        const isError = currentScript.errors.filter((error) => {
            return error.line === line;
        })

        if (isError.length === 0) {
            console.log(`Line${line} is not an error`)
        } else {
            console.log(isError[0]);
        }
    }

    return (
        <div
            style=
            {{
                textAlign: 'left',      // Forces text to the left
                margin: 0,               // Removes auto-centering margins
                padding: '1rem',         // Standard spacing
                overflowX: 'auto',       // Allows horizontal scrolling for long lines
                display: 'table',        // Ensures clickable lines span the full width
                minWidth: '100%',        // Prevents shrinking if the code is short
            }}
        >
            <Highlight theme={themes.nightOwl} code={currentScript.scriptContent} language={script.language}>

            {({ tokens, getLineProps, getTokenProps }) => (
                <pre>
                {tokens.map((line, i) => {
                    const isSelected = selectedLine === i;
                    
                    return (
                    <div 
                        {...getLineProps({ line, key: i })}
                        className = {`code-line-interactive`}
                        onClick={() => checkCodeLine(i + 1)} // Trigger your game event
                        style={{
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#3e4451' : 'transparent',
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