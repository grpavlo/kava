import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Barista from './pages/Barista.jsx';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/barista"
          element={user?.role === 'barista' ? <Barista /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
