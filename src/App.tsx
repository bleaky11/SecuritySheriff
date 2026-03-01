import './App.css'
import "./homepage.css"
import wildWest from "./assets/wild-west-town-vector-background-photo-realistic-56781539.png"
import { useState } from 'react';
import SettingsOverlay from './SettingsOverlay';

type difficulty = "easy" | "medium" | "hard";

function App() {
  const [overLay, setOverlay] = useState<boolean>(false);
  function triggerOver(){
    setOverlay(!overLay);
  }
  const [difficultyType, setDifficulty] = useState<difficulty>("easy");

  return (
    <div className='home'>
      <img src={wildWest} className='background'></img>
      <h1 className="header">
        Security Sheriff
      </h1>
      <div className='homeScreen'>
        {overLay && <SettingsOverlay difficultyType={difficultyType} setDifficulty={setDifficulty} setOverlay={triggerOver}></SettingsOverlay>}
        <button onClick={triggerOver}>Start Game</button>
      </div>
    </div>
  )
}

export default App
