import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GuestOnlyRoute from './components/GuestOnlyRoute';
import RedirectHome from './pages/RedirectHome';
import LoginPage from './pages/LoginPage'
import LobbyPage from './pages/LobbyPage'
import RoomPage from './pages/RoomPage'
import { AuthProvider } from './auth/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RedirectHome />} />
                    <Route 
                        path="/login" 
                        element={
                            <GuestOnlyRoute>
                                <LoginPage />
                            </GuestOnlyRoute>
                        } 
                    />
                    <Route path="/lobby" element={<LobbyPage />} />
                    <Route path="/room/:roomId" element={<RoomPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
)
