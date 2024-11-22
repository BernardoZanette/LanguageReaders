import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Books from './components/Books.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
