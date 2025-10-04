

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Accounts from './pages/Accounts';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/Accounts" 
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/Accounts" replace />} />
          <Route path="*" element={<Navigate to="/Accounts" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
