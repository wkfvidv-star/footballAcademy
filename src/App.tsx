import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { MedicalProvider } from './context/MedicalContext';
import { PhysicalProvider } from './context/PhysicalContext';
import { TechnicalProvider } from './context/TechnicalContext';
import { TacticalProvider } from './context/TacticalContext';
import { MentalProvider } from './context/MentalContext';
import { AICoachProvider } from './context/AICoachContext';
import LoginPage from './auth/login';
import CoachLogin from './auth/coach/CoachLogin';
import CoachSignup from './auth/coach/CoachSignup';
import CoachForgotPassword from './auth/coach/CoachForgotPassword';
import PlayerLogin from './auth/player/PlayerLogin';
import PlayerSignup from './auth/player/PlayerSignup';
import PlayerForgotPassword from './auth/player/PlayerForgotPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CoachLayout from './coach/CoachLayout';
import CoachDashboard from './coach/Dashboard';
import Analytics from './coach/Analytics';
import SquadView from './coach/squad/SquadView';
import PlayerProfile from './coach/player/PlayerProfile';
import PlayerLayout from './player/PlayerLayout';
import PlayerDashboard from './player/Dashboard';
import ProgressView from './player/progress/ProgressView';
import TrainingView from './player/training/TrainingView';
import FeedbackView from './player/feedback/FeedbackView';
import GoalsView from './player/goals/GoalsView';
import InsightsView from './player/insights/InsightsView';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  return (
    <AuthProvider key={i18n.language}>
      <MedicalProvider>
        <PhysicalProvider>
          <TechnicalProvider>
            <TacticalProvider>
              <MentalProvider>
                <AICoachProvider>
                  <BrowserRouter>
                    <Routes>
                      {/* Coach Auth Routes */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/coach/login" element={<CoachLogin />} />
                      <Route path="/coach/signup" element={<CoachSignup />} />
                      <Route path="/coach/forgot-password" element={<CoachForgotPassword />} />

                      {/* Player Auth Routes */}
                      <Route path="/player/login" element={<PlayerLogin />} />
                      <Route path="/player/signup" element={<PlayerSignup />} />
                      <Route path="/player/forgot-password" element={<PlayerForgotPassword />} />

                      {/* Coach Routes */}
                      <Route
                        path="/coach"
                        element={
                          <ProtectedRoute allowedRole="coach">
                            <CoachLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route path="dashboard" element={<CoachDashboard />} />
                        <Route path="squad" element={<SquadView />} />
                        <Route path="evaluations" element={<CoachDashboard />} /> {/* Placeholder/Redirect */}
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="player/:id" element={<PlayerProfile />} />
                        <Route path="*" element={<Navigate to="/coach/dashboard" replace />} />
                      </Route>

                      {/* Player Routes */}
                      <Route
                        path="/player"
                        element={
                          <ProtectedRoute allowedRole="player">
                            <PlayerLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route path="dashboard" element={<PlayerDashboard />} />
                        <Route path="progress" element={<ProgressView />} />
                        <Route path="training" element={<TrainingView />} />
                        <Route path="feedback" element={<FeedbackView />} />
                        <Route path="goals" element={<GoalsView />} />
                        <Route path="insights" element={<InsightsView />} />
                        <Route path="*" element={<Navigate to="/player/dashboard" replace />} />
                      </Route>

                      {/* Default Redirect */}
                      <Route path="/" element={<Navigate to="/login" replace />} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                  </BrowserRouter>
                </AICoachProvider>
              </MentalProvider>
            </TacticalProvider>
          </TechnicalProvider>
        </PhysicalProvider>
      </MedicalProvider>
    </AuthProvider>
  );
}

export default App;
