//Import Strictmode from react
import { StrictMode } from 'react'

//Import createroot from React DOM
import { createRoot } from 'react-dom/client'

//Import BrowserRouter for client-side routing
import { BrowserRouter } from 'react-router-dom'

//Import global CSS files
import './index.css'
import './App.css'

//Import the root app component
import App from './App.jsx'

//Create a react root and render the application inside the HTML element with id="root"
createRoot(document.getElementById('root')).render(
  
  //Wraps the entire application to help catch common issues
  <StrictMode>
    {/*BrowserRouter wraps App to enable react router navigation*/}
    <BrowserRouter>
      {/*Controls routing and state*/}
       <App />
    </BrowserRouter>
  </StrictMode>,
)
