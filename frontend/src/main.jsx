import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom' // esto nos permitira englobar todas las páginas de nuestra aplicacion 
import {AuthProvider} from './context/AuthContext' // Importamos el contexto de autenticación a toda la aplicación 👌

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
