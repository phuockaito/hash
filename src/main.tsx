import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { Analytics } from "@vercel/analytics/react"


ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Analytics />
        <App />
    </>
)
