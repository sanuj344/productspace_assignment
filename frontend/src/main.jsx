import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '10px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          },
          success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
