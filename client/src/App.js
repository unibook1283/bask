import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MapPage from './components/MapPage/MapPage'
import FavoritePage from './components/FavoritePage'
import Test from './components/Test'
import NavBar from './components/NavBar/NavBar'
import AdminPage from './components/AdminPage/AdminPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/map/:address" element={<MapPage />} />
            <Route path="/map/:address/:id" element={<MapPage />} />
            <Route path="/profile" element={<FavoritePage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  )
}

export default App