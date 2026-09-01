import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './features/analytics/DashboardPage';
import CandidatesPage from './features/crm/CandidatesPage';
import ClientsPage from './features/crm/ClientsPage';
import CampaignsPage from './features/campaigns/CampaignsPage';
import CallsPage from './features/calls/CallsPage';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import TeamPage from './features/team/TeamPage';
import SettingsPage from './features/settings/SettingsPage';
import CallSimulatorModal from './features/calls/CallSimulatorModal';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <CallSimulatorModal />
    </>
  );
}

export default App;

