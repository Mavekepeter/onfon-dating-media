import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import OnfonContextProvider from './context/OnfonContext.jsx'
createRoot(document.getElementById('root')).render(
   < OnfonContextProvider>
  <BrowserRouter>
      <App />
  </BrowserRouter>
     </OnfonContextProvider>

)
