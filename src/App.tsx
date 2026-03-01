import alien from "./assets/cowboyalien.png"
import './App.css'
import { generate_email, generate_script, generate_townsfolk, initalize_gemini_api } from './service/gemini'
import { useState } from "react";
import {CodeViewer } from "./components/script-components/code-view/code-view";
import type { Email, CharacterProfile, Script } from "./data/models";
import { EmailViewer } from "./components/email-components/email-view/email-view";

function App() {

  const [initalized, setInitialized] = useState<boolean>(false);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [currentEmail, setCurrentEmail] = useState<Email | null>(null);

  const [townsfolk, setTownsFolk] = useState<CharacterProfile[]>([]);

  function create_email() {

    // random towns folk data to use

    generate_email(3, "medium", townsfolk).then((res) => {
      if (res) {
        const emailJsonString = res.response.text();
        console.log(emailJsonString)
        setCurrentEmail(JSON.parse(emailJsonString));
      }
    }).catch((error) => {
      console.error(error);
    })

  }

  function initalize_project() {
    initalize_gemini_api()
      .then((response) => {
      if (response) {
        console.log(response);
        setInitialized(true);
        
        generate_townsfolk(10).then((folkResponse) => {
          const folkJsonText = folkResponse.response.text();
          console.log(folkJsonText)
          setTownsFolk(prev => {
            const townsFolk = JSON.parse(folkJsonText)["Townsfolk"]["folk"]
            return townsFolk;
          })
        })

        // generate_script(0, "extreme", "typescript").then((scriptRes) => {
        //   console.log(scriptRes);
          
        //   const json_text = scriptRes.response.text();
        //   setCurrentScript(JSON.parse(json_text))
        // })

        return response;
      }
    }).catch((error) => {
      console.error("Error initializing project:", error);
    });
  };

  // const townsFolkData = townsfolk.map((person) => {
  //   return (
  //     <div>
  //       <span> {person.firstName} {person.lastName} </span>
  //       <span> {person.email}</span>
  //       <span> {person.occupation} </span>
  //       <span> {person.gender} </span>
  //       <ul>
  //         {
  //           person.characterTraits.map((trait) => <li> {trait} </li>)
  //         }
  //       </ul>
  //     </div>
  //   )
  // });

  return (
    <>
      <div>
        <div /**Background here */>
          <img src={alien} alt='alien cowboy'></img>

          <button onClick={() => initalize_project()}>Initialize Project</button>
          <button onClick={() => create_email()}> Generate Email </button>
          {(initalized && currentScript !== null) && <CodeViewer script={currentScript}/>}
          {(initalized && currentEmail !== null) && <EmailViewer email={currentEmail}/>}

          <span style={{color : "white"}}> 
            {currentScript?.context}
          </span>


        </div>
      </div>
    </>
  )
}

export default App
