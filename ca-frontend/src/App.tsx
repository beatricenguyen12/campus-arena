import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppLayout } from './components/AppLayout';
import { CampusTalksShell } from './features/campus-talks/CampusTalksShell';
import { SplashScreen } from './features/splashscreen/SplashScreen';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  const handleContactUs = () => {
    const mailto =
      'mailto:ca.campusarena@gmail.com?subject=Campus%20Arena%20Support';
    window.location.href = mailto;
  };

  const handleSplashComplete = () => {
    navigate('/talks');
  };

  return (
    <AppLayout onContactUs={handleContactUs} showHeader={showHeader}>
      <Routes>
        <Route
          path="/"
          element={<SplashScreen onComplete={handleSplashComplete} />}
        />
        <Route path="/talks" element={<CampusTalksShell />} />
        <Route path="/talks/:questionId" element={<CampusTalksShell />} />
        <Route path="*" element={<Navigate to="/talks" replace />} />
      </Routes>
    </AppLayout>
  );
}
