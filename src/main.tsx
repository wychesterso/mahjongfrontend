import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {/* <Route path="/lobby" element={<LobbyPage />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
