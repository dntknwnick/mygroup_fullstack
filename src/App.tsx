import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { AdminLogin } from './pages/auth/AdminLogin';
import { GroupAdminLogin } from './pages/auth/GroupAdminLogin';
import { GodLogin } from './pages/auth/GodLogin';
import { RegistrationForm } from './pages/auth/RegistrationForm';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Routes */}
        <Route path="/auth/login" element={<AdminLogin />} />
        <Route path="/admin/login/:groupName" element={<GroupAdminLogin />} />
        <Route path="/god-login/:groupName/:subGroup" element={<GodLogin />} />
        <Route path="/client-login/:groupName" element={<GroupAdminLogin />} />
        <Route path="/media-login/:groupName" element={<GroupAdminLogin />} />
        <Route path="/partner/login" element={<AdminLogin />} />
        <Route path="/reporter/login" element={<AdminLogin />} />
        <Route path="/register-form/:groupName" element={<RegistrationForm />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;