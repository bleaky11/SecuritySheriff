import alien from "./assets/cowboyalien.png"
import './App.css'
import { initalize_gemini_api } from './service/gemini'

function App() {

  function initalize_project() {
    initalize_gemini_api()
      .then((response) => {
      if (response) {
        console.log(response);
        return response;
      }
    }).catch((error) => {
      console.error("Error initializing project:", error);
    });
  };

  return (
    <>
      <div>
        <div /**Background here */>
          <img src={alien} alt='alien cowboy'></img>

          <button onClick={initalize_project}>Initialize Project</button>
        </div>
      </div>
    </>
  )
}

export default App
