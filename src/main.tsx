import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import  store from '../src/States/GameStore.tsx';
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SecuritySheriff from './SecuritySheriff.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<App/>}/>
              <Route path='/game' element={<SecuritySheriff/>}/>
            </Routes>
          </Router>
        </Provider>
  </StrictMode>

)
