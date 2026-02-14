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

// Layouts
import CoachLayout from './coach/CoachLayout';
import PlayerLayout from './player/PlayerLayout';

// Player Pages
import PlayerHome from './player/pages/Home';
import PlayerAssessment from './player/pages/Assessment';
import PlayerTraining from './player/pages/Training';
import PlayerNutrition from './player/pages/Nutrition';
import PlayerRecovery from './player/pages/Recovery';
import PlayerInjury from './player/pages/Injury';
import PlayerCulture from './player/pages/Culture';

// Coach Pages
import CoachGeneral from './coach/pages/General';
import CoachManagement from './coach/pages/Management';
import CoachAnalysis from './coach/pages/Analysis';
import CoachPrograms from './coach/pages/Programs';
import CoachInjury from './coach/pages/Injury';
import CoachNutrition from './coach/pages/Nutrition';

import { useTranslation } from 'react-i18next';
import GuidedTour from './components/shared/GuidedTour';

function App() {
  const { i18n } = useTranslation();

  return (
    <AuthProvider key={i18n.language}>
      <GuidedTour />
      <MedicalProvider>
        <PhysicalProvider>
          <TechnicalProvider>
            <TacticalProvider>
              <MentalProvider>
                <AICoachProvider>
                  <BrowserRouter>
                    <Routes>
                      {/* --- AUTH ROUTES --- */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/coach/login" element={<CoachLogin />} />
                      <Route path="/coach/signup" element={<CoachSignup />} />
                      <Route path="/coach/forgot-password" element={<CoachForgotPassword />} />
                      <Route path="/player/login" element={<PlayerLogin />} />
                      <Route path="/player/signup" element={<PlayerSignup />} />
                      <Route path="/player/forgot-password" element={<PlayerForgotPassword />} />

                      {/* --- COACH ROUTES --- */}
                      <Route
                        path="/coach"
                        element={
                          <ProtectedRoute allowedRole="coach">
                            <CoachLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Navigate to="general" replace />} />
                        <Route path="general" element={<CoachGeneral />} />
                        <Route path="management" element={<CoachManagement />} />
                        <Route path="analysis" element={<CoachAnalysis />} />
                        <Route path="programs" element={<CoachPrograms />} />
                        <Route path="injury" element={<CoachInjury />} />
                        <Route path="nutrition" element={<CoachNutrition />} />
                        <Route path="*" element={<Navigate to="general" replace />} />
                      </Route>

                      {/* --- PLAYER ROUTES --- */}
                      <Route
                        path="/player"
                        element={
                          <ProtectedRoute allowedRole="player">
                            <PlayerLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<PlayerHome />} />
                        <Route path="assessment" element={<PlayerAssessment />} />
                        <Route path="training" element={<PlayerTraining />} />
                        <Route path="nutrition" element={<PlayerNutrition />} />
                        <Route path="recovery" element={<PlayerRecovery />} />
                        <Route path="injury" element={<PlayerInjury />} />
                        <Route path="culture" element={<PlayerCulture />} />
                        <Route path="*" element={<Navigate to="home" replace />} />
                      </Route>

                      {/* --- GLOBAL REDIRECTS --- */}
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
