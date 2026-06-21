import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  //removing strict mode ->cause of doublem useEffect run 
  
    <App />
 
)
