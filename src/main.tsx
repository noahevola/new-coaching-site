// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import TradersOS from './pages/TradersOS.tsx';
import TradersOSPage from './pages/TradersOSPage.tsx';
import DiagnosisPage from './pages/DiagnosisPage.tsx';
import BacktestingPage from './pages/Backtesting.tsx';
import ApplyPage from './pages/ApplyPage.tsx';
import NewsletterPage from './pages/NewsletterPage.tsx';
import OSProgramme from './pages/os-programme.tsx'; // <-- new import
import LockedInPage from './pages/videos/LockedInPage.tsx'; // <-- new import
import OSProgrammeNewsletter from './pages/videos/OSProgramme-Newsletter.tsx'
import Video6Page from './pages/videos/Video6Page.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TradersOSPage />} />
        <Route path="/form" element={<App />} />
        <Route path="/tradersos" element={<TradersOS />} />
        <Route path="/traders-os" element={<TradersOSPage />} />
        <Route path="/free-analysis" element={<DiagnosisPage />} />
        <Route path="/backtesting-method" element={<BacktestingPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/os-programme" element={<OSProgramme />} /> {/* <-- new route */}
        <Route path="/locked-in" element={<LockedInPage />} /> {/* <-- new route */}
        <Route path="/os-programme-newsletter" element={<OSProgrammeNewsletter />} />
        <Route path="/video-6" element={<Video6Page />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
