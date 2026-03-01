import './App.css'
import "./homepage.css"
import wildWest from "./assets/wild-west-town-vector-background-photo-realistic-56781539.png"
import { useState } from 'react';
import SettingsOverlay from './SettingsOverlay';

function App() {
  const [overLay, setOverlay] = useState<boolean>(false);
  function triggerOver(){
    setOverlay(!overLay);
    console.log("Hello, I am from the triggerOver function!");
  }

  return (
    <div className='home'>
      <img src={wildWest} className='background'></img>
      <h1 className="header">
        Security Sheriff
      </h1>
      <div className='homeScreen'>
        {overLay && <SettingsOverlay setOverlay={triggerOver}></SettingsOverlay>}
        <button onClick={triggerOver}>Start Game</button>
      </div>
    </div>
  )
}

export default App
