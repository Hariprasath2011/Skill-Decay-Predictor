import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import Dashboard from './pages/Dashboard';
import AddSkill from './pages/AddSkill';
import Notifications from './pages/Notifications';
import Assessment from './pages/Assessment';
import Admin from './pages/Admin';
import SkillDetails from './pages/SkillDetails';
import AssessmentHistory from './pages/AssessmentHistory';
import AssessmentResult from './pages/AssessmentResult';
import Leaderboard from './pages/Leaderboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/add-skill" element={<AddSkill />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/assessment/:userSkillId" element={<Assessment />} />
              <Route path="/assessment/result/:id" element={<AssessmentResult />} />
              <Route path="/skill/:userSkillId" element={<SkillDetails />} />
              <Route path="/history" element={<AssessmentHistory />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/" element={<Dashboard />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
